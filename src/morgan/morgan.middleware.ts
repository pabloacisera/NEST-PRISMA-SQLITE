import { NestMiddleware } from '@nestjs/common';
import morgan from 'morgan'
import { Request, Response, NextFunction } from 'express'

export class morganMidlleware implements NestMiddleware{
  use(req: Request, res: Response, next:NextFunction) {
    morgan('dev')(req, res, next)
  }
}