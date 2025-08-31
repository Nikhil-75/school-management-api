const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: null }
  },
  { timestamps: true }
);

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

const User = mongoose.model("User", userSchema);
const School = mongoose.model("School", schoolSchema);
const Class = mongoose.model("Class", classSchema);
const Student = mongoose.model("Student", studentSchema);

module.exports = { User, School, Class, Student };
