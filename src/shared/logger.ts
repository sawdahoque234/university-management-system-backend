import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, prettyPrint } = format
import DailyRotateFile from 'winston-daily-rotate-file'

import path from 'path'

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   const date = new Date(timestamp)
//   const hour = date.getHours()
//   const minutes = date.getMinutes()
//   const seconds = date.getSeconds()
//   return `${date.toDateString()} ${hour}:${minutes}:${seconds} } [${label}] ${level}: ${message}`
// })

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Logger-Status' }),
    timestamp(),
    // myFormat()
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successess',
        'ums-%DATE%-success.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
const errorlogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Logger-Status' }),
    timestamp(),
    // myFormat()
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'ums-%DATE%-error.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorlogger }
// error: 0
// warn: 1
// info: 2
