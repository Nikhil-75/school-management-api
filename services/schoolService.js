const School = require("../models/index").School;

const createSchoolService = async ({ name, photo }) => {
  const school = new School({ name, photo });
  await school.save();
  return school;
};

module.exports = { createSchoolService };
