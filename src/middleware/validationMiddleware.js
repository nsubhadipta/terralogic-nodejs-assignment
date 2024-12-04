const Joi = require('joi');
const middleware = (schema, property) => {
    return (req, res, next) => {
        const {
            error
        } = schema.validate(req.body,{ abortEarly: false }); //
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const {
                details
            } = error;
            const message = details.map(i => i.message).join(',');

            res.status(422).json({
                error: message,
                status: 0
            })
        }
    }
}
module.exports = middleware;