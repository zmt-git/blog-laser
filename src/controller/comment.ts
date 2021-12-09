import CommentEntity from "../entity/comment";
import CommentValidate from '../validate/comment';
import { Request, Response, NextFunction } from 'express';
import { SuccessModel } from '../utils/httpModel';
import { error400 } from '../utils/http400';
import { getRepository } from "typeorm";
import { ArrayToTree } from '../utils/tool';
import { Token } from '../types/token';
class Comment {
  // 新增
  async create (req: Request, res: Response, next: NextFunction) {
    const { error, value } = CommentValidate.Create.validate(req.body)

    if (error) {
      error400(res, error)
      return
    }

    const reqUser = req.user as Token

    const data = await getRepository(CommentEntity)
      .createQueryBuilder('comment')
      .insert()
      .into({ ...value, userId: reqUser.userId })
      .execute()
    res.send(new SuccessModel(data))
  }

  // 删除
  async del (req: Request, res: Response, next: NextFunction) {
    const { error, value } = CommentValidate.Id.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    await getRepository(CommentEntity)
      .createQueryBuilder('comment')
      .delete()
      .where('comment.id = :id', { id: value.id })
      .execute()
    res.send(new SuccessModel())
  }

  // 获取
  async get (req: Request, res: Response, next: NextFunction) {
    const { error, value } = CommentValidate.BlogId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    const data = await getRepository(CommentEntity)
      .createQueryBuilder('comment')
      .where('comment.blog_id = :blogId', { blogId: value.blogId })
      .getMany()

    // todo ArrayToTree
    const result = ArrayToTree(data)

    res.send(new SuccessModel(result))
  }
}

export default new Comment()
