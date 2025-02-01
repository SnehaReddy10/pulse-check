import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Role } from '../constants/enums/role';
import { AuthProvider } from '../constants/enums/auth-provider';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: [Role.ADMIN, Role.USER, Role.MERCHANT],
    default: Role.USER,
  },
  authProvider: {
    type: String,
    enum: [AuthProvider.EMAIL, AuthProvider.GOOGLE],
    required: true,
  },
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
  },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const User = mongoose.model('User', userSchema);
