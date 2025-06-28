const Joi = require('joi');

const todoSchema = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().allow('').optional(),
  priority: Joi.string().valid('low', 'medium', 'high').optional(),
  due_date: Joi.date().optional(),
  completed: Joi.boolean().optional(),
});

module.exports = { todoSchema }; 