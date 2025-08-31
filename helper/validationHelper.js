const validateSignup = ({ name, email, password }) => {
  const errors = [];
  if (!name) errors.push("Name is required");
  else if (name.trim().length < 3) errors.push("Name must be at least 3 characters long");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) errors.push("Email is required");
  else if (!emailRegex.test(email)) errors.push("Invalid email address");

  if (!password) errors.push("Password is required");
  else if (password.length < 6 || password.length > 12) errors.push("Password must be between 6 and 12 characters");

  return errors.length > 0 ? errors : null;
};

const validateLogin = ({ email, password }) => {
  const errors = [];
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  return errors.length > 0 ? errors : null;
};

const validateSchool = ({ name, photo }) => {
  const errors = [];

  if (!name) {
    errors.push("School name is required");
  } else if (name.trim().length < 3) {
    errors.push("School name must be at least 3 characters long");
  }
  
  if (photo && typeof photo !== "string") {
    errors.push("Photo must be a string");
  }

  return errors.length > 0 ? errors : null;
};


const validateClass = ({ name }) => {
  const errors = [];
  if (!name) errors.push("Class name is required");
  else if (name.trim().length < 2) errors.push("Class name must be at least 2 characters long");
  return errors.length > 0 ? errors : null;
};

const validateStudent = ({ name, rollNumber, school }) => {
  const errors = [];
  if (!name) errors.push("Student name is required");
  else if (name.trim().length < 3) errors.push("Student name must be at least 3 characters long");

  if (!rollNumber) errors.push("Roll number is required");
  else if (rollNumber.trim().length < 1) errors.push("Roll number must be at least 2 characters long");

  if (!school) errors.push("School ID is required");

  return errors.length > 0 ? errors : null;
};



module.exports = { validateSignup, validateLogin, validateSchool, validateClass, validateStudent };
