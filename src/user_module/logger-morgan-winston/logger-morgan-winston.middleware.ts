import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import morgan, { TokenIndexer } from 'morgan';
import { CustomLogger } from './CustomLogger';

@Injectable()
export class LoggerMorganWinstonMiddleware implements NestMiddleware {
  private readonly morganMiddleware;

  constructor( private readonly customLogger: CustomLogger ){
    this.morganMiddleware = morgan((tokens, req, res)=>{
      const log=[
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(' ');

      this.customLogger.log(log)

      return null;
    })
  }

  use(req:Request, res:Response, next:NextFunction){
    this.morganMiddleware(req, res, next)
  }
}
