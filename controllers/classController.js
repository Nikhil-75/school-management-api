const { createClassService } = require("../services/classService");
const { successResponse, errorResponse } = require("../helper/responseHelper");
const { validateClass } = require("../helper/validationHelper");

const createClass = async (req, res) => {
  try {
    const errors = validateClass(req.body);
    if (errors) return errorResponse(res, errors);

    const newClass = await createClassService({ name: req.body.name, createdBy: req.user.id });
    return successResponse(res, "Class created successfully", newClass);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

module.exports = { createClass };
