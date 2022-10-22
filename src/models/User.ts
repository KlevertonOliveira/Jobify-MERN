import { model, Schema } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string;
  email: string;
  password: string;
  lastName?: string;
  location?: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please, provide a name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please, provide an email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please, provide a valid email',
    }
  },
  password: {
    type: String,
    required: [true, 'Please, provide a password'],
    minlength: 6,
  },
  lastName: {
    type: String,
    default: 'lastName',
    maxlength: 20,
    trim: true,
  },
  location: {
    type: String,
    maxlength: 20,
    default: 'my city',
    trim: true,
  },
})

export const User = model<IUser>('User', userSchema);