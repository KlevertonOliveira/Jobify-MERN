import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string;
  email: string;
  password: string;
  lastName?: string;
  location?: string;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'valid email',
    }
  },
  password: {
    type: String,
    required: [true, 'password'],
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
});

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);

  this.password = hashPassword;
})

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isPasswordCorrect = await bcrypt.compare(candidatePassword, this.password);
  return isPasswordCorrect;
}

export const User = model<IUser>('User', UserSchema);