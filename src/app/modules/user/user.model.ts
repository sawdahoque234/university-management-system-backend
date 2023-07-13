import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
  },
)
export const User = model<IUser, UserModel>('User', UserSchema)
