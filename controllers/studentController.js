const {
  createStudentService,
  assignStudentToClassService,
  getStudentsService,
  getClassStudentsService,
  getClassmatesService,
} = require("../services/studentService");

const { successResponse, errorResponse } = require("../helper/responseHelper");
const { validateStudent } = require("../helper/validationHelper");

const createStudent = async (req, res) => {
  try {
    const errors = validateStudent(req.body);
    if (errors) return errorResponse(res, errors);

    const student = await createStudentService(req.body);
    return successResponse(res, "Student created successfully", student);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

const assignStudentToClass = async (req, res) => {
  try {
    const { studentId, classId } = req.body;
    if (!studentId || !classId) return errorResponse(res, "StudentId and ClassId are required");

    const updatedStudent = await assignStudentToClassService({ studentId, classId });
    return successResponse(res, "Student assigned to class successfully", updatedStudent);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await getStudentsService();
    return successResponse(res, "All students fetched", students);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

const getClassStudents = async (req, res) => {
  try {
    const { classId } = req.params;
    if (!classId) return errorResponse(res, "Class ID is required");

    const students = await getClassStudentsService(classId);
    return successResponse(res, "Students of this class fetched", students);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

const getClassmates = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) return errorResponse(res, "Student ID is required");

    const classmates = await getClassmatesService(studentId);
    return successResponse(res, "Classmates fetched", classmates);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

module.exports = {
  createStudent,
  assignStudentToClass,
  getStudents,
  getClassStudents,
  getClassmates,
};
