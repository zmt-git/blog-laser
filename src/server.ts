import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import chalk from "chalk"
import useRoutes from './routes'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import jwtAuth from './middlewares/auth'
class Server {
  app: Application
  private port: number = 8081

  constructor () {
    this.app = express()
  }

  async init () {
    try {
      // 链接数据库
      await createConnection()

      this.initializeConfig()
      // 中间件
      this.initializeMiddleware()
      // 启动 监听端口
      this.startListen()
    } catch (e) {
        console.log(chalk.red('链接数据库异常'))
        console.log(chalk.red(e))
    }
  }

  // 配置
  initializeConfig () {
  }
  // 中间件
  initializeMiddleware () {
    // 日志
    this.app.use(morgan('dev'))
    // 跨域
    this.app.use(cors())
    // 解析器
    this.app.use(express.json())
    this.app.use(express.urlencoded())
    // this.app.use(formidable())
    // 定义静态文件目录
    this.app.use(express.static(path.join(__dirname, 'public')))

    // 鉴权
    this.app.use(jwtAuth)

    // 路由
    useRoutes(this.app)
    // 404处理
    this.app.use((req, res, next) => {
      res.status(404)
      res.render('404', {
        message: 'NOT FOUNT',
        error: new Error('NOT FOUNT')
      })
    })

    // 500错误处理和错误堆栈跟踪
    this.app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token');
        return
      }

      res.status(500)
    })
  }
  // 监听端口
  startListen () {
    this.app.listen(this.port, () => {
      console.log(chalk.blue(`服务启动成功: http://localhost:${this.port}`))
    })
  }
}

const server = new Server()

server.init()

export default server
