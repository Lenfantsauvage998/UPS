// src/middleware/validateRequest.js
export const validateBody = schema => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    // Devuelve solo el primer mensaje de error
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value; // opcional: usar los valores sanitizados
  next();
};