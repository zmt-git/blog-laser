import Joi from 'joi'

export default class System {
  static Login = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(6).max(16).required()
  })

}
