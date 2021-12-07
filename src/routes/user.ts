import { Router } from 'express'
import User from '../controller/user'
const router = Router()

/**
 * @api {get} /user/getAll 获取分类
 * @apiGroup User
 * @apiDescription 获取全部用户
 * @apiSampleRequest /user/getAll
 * @apiVersion 1.0.0
 * */
router.get('/getAll', User.getAll)
// 获取用户信息
/**
 * @api {get} /user/userInfo 获取用户详情
 * @apiGroup User
 * @apiDescription 获取用户详情
 * @apiParam {Number} id 用户id
 * @apiSampleRequest http://127.0.0.1:3000/user/userInfo
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.get('/userInfo', User.getInfo)

/**
 * @api {post} /user/update 更新用户信息
 * @apiGroup User
 * @apiDescription 更新用户信息
 * @apiBody {Number} id 用户id
 * @apiBody {String} name 用户名称
 * @apiBody {String} telephone 用户电话
 * @apiBody {String} email 用户邮箱
 * @apiBody {Number} sex 用户性别
 * @apiBody {String} sign 用户签名
 * @apiBody {file} avatar 用户头像
 * @apiSampleRequest http://127.0.0.1:3000/user/update
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/update', User.update)

/**
 * @api {get} /user/page 分页查询用户
 * @apiGroup User
 * @apiDescription 分页查询用户
 * @apiParam {Number} current 当前页
 * @apiParam {Number} pageSize 每页条数
 * @apiParam {Object} condition 查询条件
 * @apiParam {Array} desc 降序参数
 * @apiParam {Array} asc 升序条件
 * @apiSampleRequest http://127.0.0.1:3000/user/page
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.get('/page', User.page)

/**
 * @api {delete} /user/del 删除用户
 * @apiGroup User
 * @apiDescription 删除用户
 * @apiParam {Number} id 用户id
 * @apiSampleRequest http://127.0.0.1:3000/user/del
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.delete('/del', User.del)

export default router
