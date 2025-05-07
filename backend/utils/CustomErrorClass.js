class CustomError extends Error {
  constructor(statusCode = 500, message = "Internal Server Error") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default CustomError;
