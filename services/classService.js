const Class = require("../models/index").Class;

const createClassService = async ({ name, createdBy }) => {
  const existingClass = await Class.findOne({ name, createdBy });
  if (existingClass) {
    throw new Error("Class with this name already exists");
  }

  const newClass = new Class({
    name,
    createdBy
  });

  await newClass.save();
  return newClass;
};

module.exports = { createClassService };
