import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { Server } from 'http'
import { logger, errorlogger } from './shared/logger'
// const port: Number = 5000
let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('successfully connected!!!!!!!!!!')
    app.listen(config.port, () => {
      logger.info('Server is running!!!!!!!!!')
    })
  } catch (error) {
    errorlogger.error('Failed', error)
  }
  //gracefully close server
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
      })
      process.exit(1)
    }
  })
}
main()
process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})
process.on('SIGTERM', () => {
  logger.info('Sigterm is recieved!!')
  if (server) {
    server.close()
  }
})
