const { createSchoolService } = require("../services/schoolService");
const { successResponse, errorResponse } = require("../helper/responseHelper");
const { validateSchool } = require("../helper/validationHelper");

const createSchool = async (req, res) => {
  try {
    const errors = validateSchool(req.body);
    if (errors) return errorResponse(res, errors);

    const photo = req.file ? req.file.filename : null;

    const school = await createSchoolService({
      name: req.body.name,
      photo,
    });

    // 👇 API response me photo ko full URL bana do
    const responseData = {
      ...school._doc,
      photo: school.photo ? `${req.protocol}://${req.get("host")}/uploads/${school.photo}` : null,
    };

    return successResponse(res, "School created successfully", responseData);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

module.exports = { createSchool };
