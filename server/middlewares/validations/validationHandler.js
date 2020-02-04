const { validationResult } = require('./node_modules/express-validator')

module.exports = req => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        const error = new Error('Validation Failed')
        error.statusCode = 422
        error.validation = validationErrors
        throw error
    }
}