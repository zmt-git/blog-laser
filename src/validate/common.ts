import Joi from 'joi'

export default class Common {
  static Page = Joi.object({
    pageSize: Joi.number().default(10),
    current: Joi.number().default(10),
    desc: Joi.array(),
    asc: Joi.array(),
    condition: Joi.object()
  })
}
