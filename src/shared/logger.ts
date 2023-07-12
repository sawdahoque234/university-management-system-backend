import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, prettyPrint } = format

import path from 'path'

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Logger-Status' }),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})
const errorlogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'Logger-Status' }),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
      level: 'error',
    }),
  ],
})
export { logger, errorlogger }
// error: 0
// warn: 1
// info: 2
