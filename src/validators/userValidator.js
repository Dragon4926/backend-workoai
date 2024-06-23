const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().regex(/^\d{5}(-\d{4})?$/).required()
});

module.exports = {
    validateUser: (user) => userSchema.validate(user)
};
