import { Router } from 'express'
import System from '../controller/system'
const router = Router()

/**
 * @api {post} /system/login 账号登录
 * @apiDescription 账号登录
 * @apiGroup System
 * @apiBody {String} username
 * @apiBody {String} password
 * @apiSampleRequest http://127.0.0.1:3000/system/login
 * @apiVersion 1.0.0
 * */
router.post('/login', System.login)

/**
 * @api {post} /system/register 注册账号
 * @apiDescription 注销账号
 * @apiGroup System
 * @apiBody {String} name 账号
 * @apiBody {String} password 密码
 * @apiBody {Number} sex 性别 0-未知 1-男 2-女
 * @apiBody {String} sign 签名
 * @apiBody {File} avatar 头像
 * @apiBody {String} telephone 电话
 * @apiBody {String} email 邮箱
 * @apiSampleRequest http://127.0.0.1:3000/system/register
 * @apiVersion 1.0.0
 * */
router.post('/register', System.register)

/**
 * @api {post} /system/logout 注销账号
 * @apiDescription 注销账号
 * @apiGroup System
 * @apiSampleRequest http://127.0.0.1:3000/system/logout
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/logout', System.logout)

export default router
