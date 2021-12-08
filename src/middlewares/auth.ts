import expressJwt from 'express-jwt'
import common from '../common/index'

const jwtAuth = expressJwt({ secret: common.secretKey, algorithms: ['HS256']}).unless({path: [
  "/system/login","/system/register","/blog/page","/blog/getInfo","/blog/read","/category/getAll", "/user/getAll",
  ]
})

export default jwtAuth
