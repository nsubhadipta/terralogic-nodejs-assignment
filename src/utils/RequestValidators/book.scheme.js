const Joi = require('joi');

// Validation
const bookSchema = Joi.object({
  title: Joi.string().min(3).max(150).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must be less than or equal to 255 characters',
    'any.required': 'Title is required',
  }),
  author: Joi.string().min(3).max(150).required().messages({
    'string.empty': 'Author is required',
    'string.min': 'Author must be at least 3 characters long',
    'string.max': 'Author must be less than or equal to 255 characters',
    'any.required': 'Author is required',
  }),
  year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required().messages({
    'number.base': 'Year must be a number',
    'number.min': 'Year must be a valid year (greater than 999)',
    'number.max': `Year must be less than or equal to ${new Date().getFullYear()}`,
    'any.required': 'Year is required',
  }),
});

module.exports = { bookSchema };
