import { Router } from 'express'
import UserFollow from '../controller/user_follow'
const router = Router()

/**
 * @api {post} /userFollow/like 关注/取消关注
 * @apiGroup UserFollow
 * @apiDescription 关注/取消关注
 * @apiParam {Number} followId 关注人id
 * @apiParam {Number} like 1-关注 0-取消关注
 * @apiSampleRequest http://127.0.0.1:3000/userFollow/like
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/like', UserFollow.like)

export default router
