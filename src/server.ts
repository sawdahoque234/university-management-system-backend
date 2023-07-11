import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
// const port: Number = 5000;

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('successfully connected!!!!!!!!!!')
    app.listen(config.port, () => {
      console.log('Server is running!!!!!!!!!')
    })
  } catch (error) {
    console.log('Failed', error)
  }
}
main()
