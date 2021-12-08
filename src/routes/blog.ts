import { Router } from 'express'
import blog from '../controller/blog'
const router = Router()


/**
 * @api {get} /blog/getInfo 博客详情
 * @apiGroup Blog
 * @apiDescription 获取博客详情
 * @apiParam {Number} id 博客id
 * @apiSampleRequest /blog/getInfo
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.get('/getInfo', blog.getInfo)
/**
 * @api {get} /blog/page 分页查询博客文章
 * @apiGroup Blog
 * @apiDescription 分页查询博客文章
 * @apiParam {Number} current=1 当前页
 * @apiParam {Number} pageSize=15 每页条数
 * @apiParam {Object} condition 查询条件
 * @apiParam {Array} desc 降序参数
 * @apiParam {Array} asc 升序条件
 * @apiSampleRequest http://127.0.0.1:3000/blog/page
 * @apiVersion 1.0.0
 * */
router.get('/page', blog.page)

/**
 * @api {post} /blog/create 新增博客文章
 * @apiGroup Blog
 * @apiDescription 新增
 * @apiBody {String} title 文字标题
 * @apiBody {String} content 文字内容
 * @apiBody {File} img 文章图片
 * @apiBody {String} categoryId 分类id
 * @apiSampleRequest http://127.0.0.1:3000/blog/create
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/create', blog.create)

/**
 * @api {post} /blog/update 更新博客文章
 * @apiGroup Blog
 * @apiDescription 新增
 * @apiBody {number} id 文字id
 * @apiBody {String} title 文字标题
 * @apiBody {String} content 文字内容
 * @apiBody {File} img 文章图片
 * @apiBody {String} categoryId 分类id
 * @apiSampleRequest http://127.0.0.1:3000/blog/update
 * @apiHeader {String} [authorization= Bearer]
 * @apiVersion 1.0.0
 * */
router.post('/update', blog.update)

/**
 * @api {delete} /blog/del 删除博客文章
 * @apiGroup Blog
 * @apiDescription 新增
 * @apiParam {number} id 文字id
 * @apiSampleRequest http://127.0.0.1:3000/blog/del
 * @apiHeader {String} [authorization= Bearer]
 * @apiVersion 1.0.0
 * */
router.delete('/del', blog.del)

/**
 * @api {post} /blog/read 阅读文章
 * @apiGroup Blog
 * @apiDescription 新增
 * @apiParam {number} id 文字id
 * @apiSampleRequest http://127.0.0.1:3000/blog/read
 * @apiVersion 1.0.0
 * */
router.post('/read', blog.read.bind(blog))

/**
 * @api {post} /blog/like 收藏文章
 * @apiGroup Blog
 * @apiDescription 新增
 * @apiParam {number} id 文字id
 * @apiSampleRequest http://127.0.0.13000/blog/like
 * @apiHeader {String} [authorization= Bearer]
 * @apiVersion 1.0.0
 * */
router.post('/like', blog.like.bind(blog))

export default router
