export default function errorHandler(err, req, res, next) {
  console.error(err); // lo loggeamos para debugging
  const status = err.status || 500;
  // En producción podrías suprimir stack trace
  res.status(status).json({
    message: err.message || 'Internal Server Error'
  });
}