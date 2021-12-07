import Joi from 'joi'

export default class User {
  static UserId = Joi.object({
    id: Joi.number()
  })

  static Update = Joi.object({
    id: Joi.number(),
    name: Joi.string(),
    telephone: Joi.string(),
    email: Joi.string(),
    sex: Joi.number(),
    sign: Joi.string(),
    avatar: Joi.string(),
  })

  static Create = Joi.object({
    name: Joi.string(),
    password: Joi.string().min(6).max(15).default('123456'),
    telephone: Joi.string(),
    email: Joi.string().email(),
    sex: Joi.number(),
    sign: Joi.string(),
    avatar: Joi.string(),
  })
}
