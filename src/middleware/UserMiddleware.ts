import {Joi} from 'express-validation'

export var loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required().exist(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}

export var signUpValidation = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    email: Joi.string().email().required().exist(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
}
