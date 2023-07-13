/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import ApiError from './errors/ApiError'
import { UserRoutes } from './app/modules/user/user.route'
const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//routes
app.use('/api/v1/users/', UserRoutes)

app.get('/', async (req, res) => {
  throw new ApiError(400, 'Something went wrong!!!!!!')
})

app.use(globalErrorHandler)
export default app
