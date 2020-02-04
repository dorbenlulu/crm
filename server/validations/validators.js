const { body } = require('express-validator')

exports.hasImg = body('base64')
    .isBase64()
    .withMessage('Image URL in base64 is required.')