const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (!courses || courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" });
  }

  let totalAmount = 0;

  for (const courseId of Object.values(courses)) {
    try {
      // Find the course by its ID
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ success: false, message: "Could not find the Course" });
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({ success: false, message: "Student is already Enrolled" });
      }

      // Add the course price to the total amount
      totalAmount += course.price;
    } catch (error) {
      console.log(`Error processing course ${courseId}:`, error);
      return res.status(500).json({ success: false, message: "Error processing courses" });
    }
  }

  const options = {
    amount: totalAmount * 100, // convert to paise
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options);
    res.json({ success: true, data: paymentResponse });
  } catch (error) {
    console.log("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};

// Verify the payment
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
  const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
    return res.status(400).json({ success: false, message: "Missing required payment details" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res);
    return res.status(200).json({ success: true, message: "Payment Verified" });
  } else {
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({ success: false, message: "Missing email details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
    res.status(200).json({ success: true, message: "Payment success email sent" });
  } catch (error) {
    console.log("Error sending payment success email:", error);
    res.status(500).json({ success: false, message: "Could not send email" });
  }
};

// Enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({ success: false, message: "Missing course or user ID" });
  }

  try {
    for (const courseId of Object.values(courses)) {
      // Enroll student in the course
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(404).json({ success: false, message: "Course not found" });
      }

      // Track course progress
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      // Update student’s courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        { $push: { courses: courseId, courseProgress: courseProgress._id } },
        { new: true }
      );

      // Send enrollment confirmation email
      await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled in ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
      );

      console.log(`Email sent successfully to ${enrolledStudent.email}`);
    }
    res.status(200).json({ success: true, message: "All students enrolled and notified" });
  } catch (error) {
    console.log("Error enrolling student:", error);
    res.status(500).json({ success: false, error: "Error enrolling student" });
  }
};
