import { Router } from "express"
import comment from "../controller/comment"

const router = Router()

/**
 * @api {post} /comment/get 获取文章评论
 * @apiGroup Comment
 * @apiDescription 获取文章评论
 * @apiParam {Number} blogId 文章id
 * @apiSampleRequest http://127.0.0.1:3000/comment/get
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/get', comment.get)

/**
 * @api {post} /comment/create 新建文章评论
 * @apiGroup Comment
 * @apiDescription 新建文章评论
 * @apiBody {Number} blogId 文章id
 * @apiBody {String} content 评论内容
 * @apiBody {String} userParentId 评论父id
 * @apiSampleRequest http://127.0.0.1:3000/comment/create
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/create', comment.create)

/**
 * @api {delete} /comment/del 删除文章评论
 * @apiGroup Comment
 * @apiDescription 删除文章评论
 * @apiParam {Number} id 评论id
 * @apiSampleRequest http://127.0.0.1:3000/comment/del
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.delete('/del', comment.del)

export default router
