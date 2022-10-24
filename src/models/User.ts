import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Model, model, Schema } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: string;
  email: string;
  password: string;
  lastName?: string;
  location?: string;
}

interface IUserMethods {
  comparePassword(): boolean;
  createToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
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
    select: false
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

UserSchema.method('comparePassword', async function comparePassword(candidatePassword: string) {
  const isPasswordCorrect = await bcrypt.compare(candidatePassword, this.password);
  return isPasswordCorrect;
});

UserSchema.method('createToken', function createToken() {
  const token = jwt.sign(
    { userId: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  )

  return token;
});



export const User = model<IUser, UserModel>('User', UserSchema);