import {checkSchema} from 'express-validator'
import {error} from '../type'

export var loginValidate = checkSchema({
  email: {
    in: ['body'],
    isEmpty: {
      errorMessage: error.EMPTY,
    },
    isEmail: {
      errorMessage: error.EMAIL,
    },
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: error.LENGTH,
      // Multiple options would be expressed as an array
      options: {min: 6},
    },
    isEmpty: {
      bail: true,
      errorMessage: error.EMPTY,
    },
  },
})
