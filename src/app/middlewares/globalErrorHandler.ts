/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/hanldeValidationError'
import { errorlogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (error, req, res) => {
  config.env === 'development'
    ? console.log('globalHandler', error)
    : errorlogger.error('globalHandler', error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  }
  // else if (error instanceof ZodError) {
  //   const simplifiedError = handleZodError(error)
  //   statusCode = simplifiedError.statusCode
  //   message = simplifiedError.message
  //   errorMessages = simplifiedError.errorMessages
  // }
  // else if (error?.name === 'CastError') {
  //   const simplifiedError = handleCastError(error)
  //   statusCode = simplifiedError.statusCode
  //   message = simplifiedError.message
  //   errorMessages = simplifiedError.errorMessages
  // }
  else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler