import { Response } from 'express'
import { ErrorModel } from './httpModel'

export function error400 (res: Response, e: unknown) {
  const error = new ErrorModel('参数不正确！', e)

  res.status(400).send(error)
}
