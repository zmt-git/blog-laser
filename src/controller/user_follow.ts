import { Request, Response, NextFunction } from 'express';
import UserFollowValidate from '../validate/userFollow';
import UserFollowEntity from "../entity/user_follow";
import { SuccessModel } from '../utils/httpModel';
import { error400 } from "../utils/http400";
import {getRepository} from "typeorm";
import {Token} from "../types/token";

class UserFollow {
  // 1-关注 0-取消关注
  async like (req: Request, res: Response, next: NextFunction) {
    const { error, value } = UserFollowValidate.followId.validate(req.query)

    if (error) {
      error400(res, error)
      return
    }

    const reqUser = req.user as Token

    try {
      if (value.like) {
        await getRepository(UserFollowEntity)
          .createQueryBuilder('userFollow')
          .insert()
          .values({ userId: reqUser.userId, followId: value.followId })
          .execute()
      } else {
        await getRepository(UserFollowEntity)
          .createQueryBuilder('userFollow')
          .delete()
          .where('user_follow.user_id = :userId AND user_follow.follow_id = :followId', { userId: reqUser.userId, followId: value.followId })
          .execute()
      }
    } catch (e) {
      res.status(500).send(e)

      return
    }

    res.send(new SuccessModel())
  }
}

export default new UserFollow()
