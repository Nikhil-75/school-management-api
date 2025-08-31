const express = require("express");
const { signup, login } = require("../controllers/authController");
const { createSchool } = require("../controllers/schoolController");
const { createClass } = require("../controllers/classController");
const {
  createStudent,
  assignStudentToClass,
  getStudents,
  getClassStudents,
  getClassmates,
} = require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/schools", authMiddleware, upload.single("photo"), createSchool);
router.post("/classes", authMiddleware, createClass);

router.post("/students", authMiddleware, createStudent);
router.post("/students/assign", authMiddleware, assignStudentToClass);
router.get("/students", authMiddleware, getStudents);
router.get("/students/class/:classId", authMiddleware, getClassStudents);
router.get("/students/classmates/:studentId", authMiddleware, getClassmates);

module.exports = router;
