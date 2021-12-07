import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import UserEntity from '../entity/user';
import UserValidate from '../validate/user';
import { SuccessModel, SuccessPageModel } from '../utils/httpModel';
import { error400 } from "../utils/http400";
import { Token} from "../types/token";
import Common from "../validate/common";

class User {
  async getAll (req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .getMany()

      res.send(new SuccessModel(result))
    } catch (e) {
      res.sendStatus(500).send(e)
    }
  }

  async getInfo (req: Request, res: Response, next: NextFunction) {
    const reqUser = req.user as Token

    const { error, value } = UserValidate.UserId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    const id = value.id ? value.id : reqUser.userId

    const user = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where("user.id = :id", { id: id })
      .getOne()

    res.send(new SuccessModel(user))
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const { error, value } = UserValidate.Update.validate(req.body)

    if (error || value.id === undefined) {
      error400(res, error)
      return
    }

    try {
      await getRepository(UserEntity)
        .createQueryBuilder('user')
        .update(UserEntity)
        .set(value)
        .where('user.id = :id', { id: value.id })
        .execute()
    } catch (e) {
      res.status(500).send(e)
      return
    }

    res.send(new SuccessModel())
  }

  async page (req: Request, res: Response, next: NextFunction) {
    const { error, value } = Common.Page.validate(req.query)
    if (error) {
      error400(res, error)
      return
    }

    const data = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .take(value.pageSize)
      .skip((value.current - 1) * value.pageSize)
      .getMany()
    const count = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .getCount()

    res.send(new SuccessPageModel(data, value.current, value.pageSize, count))
  }

  async del (req: Request, res: Response, next: NextFunction) {
    const { error, value } = UserValidate.UserId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    const data = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .delete()
      .where('user.id = :id', value)
      .execute()

    res.send(new SuccessModel())
  }
}

export default new User()
