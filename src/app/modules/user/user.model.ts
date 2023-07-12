import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'
type UserModel = Model<IUser, object>
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
