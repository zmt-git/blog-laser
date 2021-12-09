import Joi from 'joi'

export default class UserFollow {
  static userId = Joi.object({
    userId: Joi.number().required(),
    like: Joi.number().required()
  })
}
