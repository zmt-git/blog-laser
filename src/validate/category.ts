import Joi from 'joi'

export default class CateGory {
  static CateGoryId = Joi.object({
    id: Joi.number().required(),
  })

  static Create = Joi.object({
    categoryName:Joi.string().required(),
    pid: Joi.number().default(0)
  })

  static Update = Joi.object({
    id: Joi.number().required(),
    categoryName:Joi.string().required(),
    pid: Joi.number().default(0)
  })
}
