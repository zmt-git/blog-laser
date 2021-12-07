import Joi from 'joi'

export default class Blog {
  static Create = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    img: Joi.string().default(''),
    categoryId: Joi.number(),
  })

  static Update = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    img: Joi.string().default(''),
    authorId: Joi.number(),
    categoryId: Joi.number(),
  })

  static BlogId = Joi.object({
    id: Joi.number().required(),
  })
}
