import { Request, Response, NextFunction } from 'express'
export default function validator (req: Request, res: Response, next: NextFunction) {
  next()
}
