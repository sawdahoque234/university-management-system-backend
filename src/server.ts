import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorlogger } from './shared/logger'
// const port: Number = 5000;

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
}
main()
