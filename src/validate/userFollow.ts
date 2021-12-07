import Joi from 'joi'

export default class UserFollow {
  static followId = Joi.object({
    followId: Joi.number(),
    like: Joi.number().required()
  })
}
