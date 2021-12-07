import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'
import UserEntity from '../entity/user'
import Validate from '../validate/system'
import UserValidate from '../validate/user'
import jwt from 'jsonwebtoken'
import common from '../common'
import { SuccessModel, ErrorModel } from '../utils/httpModel'
import { Token } from '../types/token'
import crypto from 'crypto'
import { error400 } from '../utils/http400'
const md5 = crypto.createHash('md5')

class System {
  async login (req: Request, res: Response, next: NextFunction) {
    const { error, value } = Validate.Login.validate(req.body)

    if (error) {
      error400(res, error)
      return
    }

    try {
      const user = await getRepository(UserEntity)
        .createQueryBuilder('user')
        .where('user.name = :username AND user.password = :password', value)
        .getOne()

      if (user) {
        const tokenObj: Token = { userId: user.id, username: user.name }

        const token = jwt.sign(tokenObj, common.secretKey, { expiresIn: 60 * 60 * 24 })

        const result = new SuccessModel({ token: token })

        res.send(result)
      } else {
        const error = new ErrorModel('账号或密码不正确！')

        res.send(error)
      }
    } catch (e) {
      res.status(500).send(e)
    }
  }

  async register (req: Request, res: Response, next: NextFunction) {
    const { error, value } = UserValidate.Create.validate(req.body)

    if (error) {
      error400(res, error)
      return
    }

    const user = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.name = :name', { name: value.name})
      .getOne()

    if (user) {
      res.status(409).send(new ErrorModel('用户已存在'))
      return
    }

    const data = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .insert()
      .values(value)
      .execute()

    res.send(new SuccessModel(data.identifiers.pop()))
  }

  async logout (req: Request, res: Response, next: NextFunction) {
    const reqUser = req.user as Token

    if (reqUser.username === 'administrator') {
      res.send(new ErrorModel('超管不可删除'))
      return
    }

    await getRepository(UserEntity)
      .createQueryBuilder('user')
      .delete()
      .where('user.id = :id', { id: reqUser.userId })
      .execute()

    res.send(new SuccessModel())
  }
}

export default new System()
