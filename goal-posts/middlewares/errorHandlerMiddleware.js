const errorHandler = (error, request, response, next) => {
  console.log("This is in error handler middleware. ", error.statusCode)
  const statusCode = error.statusCode;

  return response
    .status(statusCode)
    .json({
      message: error.message,
      stack: process.env.NODE_ENV === "Production" ? null : error.stack
    })
}

export { errorHandler }