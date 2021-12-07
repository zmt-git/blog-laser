import { Request, Response, NextFunction } from 'express'
import {getRepository} from "typeorm";
import CategoryEntity from "../entity/category";
import {SuccessModel, SuccessPageModel} from "../utils/httpModel";
import CateGoryValidate from '../validate/category'
import {error400} from "../utils/http400";
import {Token} from "../types/token";
import Common from "../validate/common";

class Category {
  // 获取全部
  async getAll (req: Request, res: Response, next: NextFunction) {
    const data = await getRepository(CategoryEntity)
      .createQueryBuilder('category')
      .getMany()
    res.send(new SuccessModel(data))
  }

  // 新增
  async create (req: Request, res: Response, next: NextFunction) {
    const { error, value } = CateGoryValidate.Create.validate(req.body)

    if (error) {
      error400(res, error)
      return
    }

    const user = req.user as Token

    try {
      await getRepository(CategoryEntity)
        .createQueryBuilder('category')
        .insert()
        .values({...value, createUserId: user.userId })
        .execute()
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
      return
    }

    res.send(new SuccessModel())
  }

  // 更新
  async update (req: Request, res: Response, next: NextFunction) {
    const { error, value } = CateGoryValidate.Update.validate(req.body)

    if (error) {
      error400(res, error)
      return
    }

    try {
      await getRepository(CategoryEntity)
        .createQueryBuilder('category')
        .update()
        .set({ categoryName: value.categoryName })
        .where('category.id = :id', { id: value.id })
        .execute()
    } catch (e) {
      console.log(e)
      res.status(500).send(e)
      return
    }
    res.send(new SuccessModel())
  }

  // 删除
  async del (req: Request, res: Response, next: NextFunction) {
    const { error, value } = CateGoryValidate.CateGoryId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    await getRepository(CategoryEntity)
      .createQueryBuilder('category')
      .delete()
      .where('category.id = :id', { id: value.id })
      .execute()
    res.send(new SuccessModel())
  }

  async page (req: Request, res: Response, next: NextFunction) {
    const { error, value } = Common.Page.validate(req.query)
    if (error) {
      error400(res, error)
      return
    }

    const data = await getRepository(CategoryEntity)
      .createQueryBuilder('category')
      .take(value.pageSize)
      .skip((value.current - 1) * value.pageSize)
      .getMany()
    const count = await getRepository(CategoryEntity)
      .createQueryBuilder('category')
      .getCount()

    res.send(new SuccessPageModel(data, value.current, value.pageSize, count))
  }
}

export default new Category()
