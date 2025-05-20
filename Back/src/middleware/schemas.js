// src/middleware/schemas.js
import Joi from 'joi';

export const nodeSchema = Joi.object({
  name: Joi.string().trim().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

export const edgeSchema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  weight: Joi.number().min(0).required()
});
