const successResponse = (res, message, data = {}) => {
  return res.status(200).json({ status: true, message, data });
};

const errorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ status: false, message });
};

module.exports = { successResponse, errorResponse };
