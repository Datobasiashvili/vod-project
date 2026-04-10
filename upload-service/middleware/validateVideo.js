const Joi = require('joi');

const validateVideo = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required().messages({
            'string.empty': 'Title is required',
            'string.min': 'Title must be at least 3 characters long'
        }),
        description: Joi.string().max(500).allow('', null)
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = { validateVideo };