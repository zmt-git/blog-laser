import { Request, Response, NextFunction } from 'express';
import { getRepository } from "typeorm";
import { SuccessPageModel, SuccessModel } from "../utils/httpModel";
import Common from "../validate/common";
import BlogValidate from '../validate/blog'
import BlogEntity from "../entity/blog";
import { error400 }  from '../utils/http400';
import { Token } from '../types/token'
class Blog {
  async page (req: Request, res: Response, next: NextFunction) {
    const { error, value } = Common.Page.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    try {
      const data = await getRepository(BlogEntity)
        .createQueryBuilder('blog')
        .skip((value.current - 1) * value.pageSize)
        .take(value.pageSize)
        .getMany()

      const total = await getRepository(BlogEntity)
        .createQueryBuilder('blog')
        .getCount()

      res.send(new SuccessPageModel(data, value.current, value.pageSize, total))
    } catch (e) {
      res.status(500).send(e)
      console.log(e)
    }
  }

  async create (req: Request, res: Response, next: NextFunction) {
    const { error, value } = BlogValidate.Create.validate(req.body)

    if (error) {
      error400(res, error)
      return
    }

    const reqUser = req.user as Token
    try {
      const data = await getRepository(BlogEntity)
        .createQueryBuilder('blog')
        .insert()
        .values({ ...value, authorId: reqUser.userId })
        .execute()

      res.send(new SuccessModel(data.identifiers.pop()))
    } catch (e) {
      res.status(500).send(e)
      console.log(e)
    }
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const { error, value } = BlogValidate.Update.validate(req.body)

    if (error) {
      error400(res, error)
      return
    }

    try {
      await getRepository(BlogEntity)
        .createQueryBuilder('blog')
        .update()
        .set(value)
        .where('blog.id = :id', { id: value.id })
        .execute()

      res.send(new SuccessModel())
    } catch (e) {
      res.status(500).send(e)
      console.log(e)
    }
  }

  async del (req: Request, res: Response, next: NextFunction) {
    const { error, value } = BlogValidate.BlogId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    try {
      await getRepository(BlogEntity)
        .createQueryBuilder('blog')
        .delete()
        .where('blog.id = :id', { id: value.id })
        .execute()

      res.send(new SuccessModel())
    } catch (e) {
      res.status(500).send(e)
      console.log(e)
    }
  }

  async read (req: Request, res: Response, next: NextFunction) {
    const { error, value } = BlogValidate.BlogId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    try {
      const target = await getRepository(BlogEntity)
        .createQueryBuilder('blog')
        .where('blog.id = :id', { id: value.id })
        .getOne()
      if (target) {
        const readNum = target?.readNum
        await getRepository(BlogEntity)
          .createQueryBuilder('blog')
          .update()
          .set({ readNum: readNum + 1 })
          .where('blog.id = :id', { id: value.id })
          .execute()
      } else {
        res.status(409).send('文章不存在')
        return
      }

      res.send(new SuccessModel())
    } catch (e) {
      res.status(500).send(e)
      console.log(e)
    }
  }

  async like (req: Request, res: Response, next: NextFunction) {
    const { error, value } = BlogValidate.BlogId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    try {
      const target = await getRepository(BlogEntity)
        .createQueryBuilder('blog')
        .where('blog.id = :id', { id: value.id })
        .getOne()
      if (target) {
        const like = target?.like
        await getRepository(BlogEntity)
          .createQueryBuilder('blog')
          .update()
          .set({ like: like + 1 })
          .where('blog.id = :id', { id: value.id })
          .execute()
      } else {
        res.status(409).send('文章不存在')
        return
      }

      res.send(new SuccessModel())
    } catch (e) {
      res.status(500).send(e)
      console.log(e)
    }
  }
}

export default new Blog()
