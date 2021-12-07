import Joi from 'joi'

export default class Comment {
  static Create = Joi.object({
    userParentId: Joi.number().required(),
    content: Joi.string().max(2000).required(),
    blogId: Joi.number().required()
  })

  static Id = Joi.object({
    id: Joi.number().required()
  })

  static BlogId = Joi.object({
    blogId: Joi.number().required()
  })
}
