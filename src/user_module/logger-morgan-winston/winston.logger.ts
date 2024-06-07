import winston from 'winston'
import 'winston-daily-rotate-file'

export const logger = winston.createLogger({
  level:'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports:[
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern:'YYYY-MM-DD',
      zippedArchive:true,
      maxSize:'20m',
      maxFiles:"14d"
    })
  ]
})