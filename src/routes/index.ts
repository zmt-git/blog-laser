import { Application } from 'express'
import system from './system'
import user from './user'
import blog from './blog'
import category from './category'
import userFollow from './user_follow'
import comment from './comment'

export default function useRoutes(app: Application) {
  app.use('/system', system)

  app.use('/user', user)

  app.use('/blog', blog)

  app.use('/category', category)

  app.use('/userFollow', userFollow)

  app.use('/comment', comment)
}

