import expressJwt from 'express-jwt'
import common from '../common/index'

const jwtAuth = expressJwt({ secret: common.secretKey, algorithms: ['HS256']}).unless({path: [
    "/system/login",
    "/system/register",
    "/blog/page",
    "/blog/read",
    "/category/getAll"
  ]
})

export default jwtAuth
