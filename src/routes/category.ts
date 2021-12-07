import { Router } from "express"
import category from "../controller/category"

const router = Router()
/**
 * @api {get} /category/getAll 获取分类
 * @apiGroup Category
 * @apiDescription 获取全部分类
 * @apiSampleRequest http://127.0.0.1:3000/category/getAll
 * @apiVersion 1.0.0
 * */
router.get('/getAll', category.getAll)

/**
 * @api {get} /category/page 分页查询类型
 * @apiGroup Category
 * @apiDescription 分页查询类型
 * @apiParam {Number} current 当前页
 * @apiParam {Number} pageSize 每页条数
 * @apiParam {Object} condition 查询条件
 * @apiParam {Array} desc 降序参数
 * @apiParam {Array} asc 升序条件
 * @apiSampleRequest user/page
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.get('/page', category.page)
/**
 * @api {post} /category/create 新增分类
 * @apiGroup Category
 * @apiDescription 新增
 * @apiBody {String} categoryName 分类名称
 * @apiSampleRequest http://127.0.0.1:3000/category/create
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/create', category.create)

/**
 * @api {post} /category/update 更新类型
 * @apiGroup Category
 * @apiDescription 更新类型
 * @apiBody {number} id 分类id
 * @apiBody {String} categoryName 分类名称
 * @apiSampleRequest http://127.0.0.1:3000/category/update
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.post('/update', category.update)

/**
 * @api {delete} /category/del 删除类型
 * @apiGroup Category
 * @apiDescription 新增
 * @apiParam {Number} id 分类id
 * @apiSampleRequest http://127.0.0.1:3000/category/del
 * @apiHeader {String} authorization token
 * @apiVersion 1.0.0
 * */
router.delete('/del', category.del)

export default router
