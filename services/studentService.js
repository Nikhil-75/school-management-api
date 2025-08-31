const Student = require("../models/index").Student;
const Class = require("../models/index").Class;

const createStudentService = async ({ name, rollNumber, school, classId }) => {
  const newStudent = new Student({
    name,
    rollNumber,
    school,
    class: classId || null,
  });
  await newStudent.save();
  return newStudent;
};

const assignStudentToClassService = async ({ studentId, classId }) => {
  const student = await Student.findById(studentId);
  if (!student) throw new Error("Student not found");

  const classData = await Class.findById(classId);
  if (!classData) throw new Error("Class not found");

  student.class = classId;
  await student.save();
  return student;
};

const getStudentsService = async () => {
  return await Student.find().populate("school").populate("class");
};

const getClassStudentsService = async (classId) => {
  return await Student.find({ class: classId }).populate("school").populate("class");
};

const getClassmatesService = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student || !student.class) throw new Error("Student not assigned to any class");

  return await Student.find({ class: student.class, _id: { $ne: studentId } })
    .populate("school")
    .populate("class");
};

module.exports = {
  createStudentService,
  assignStudentToClassService,
  getStudentsService,
  getClassStudentsService,
  getClassmatesService,
};
