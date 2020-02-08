import { Response } from 'express';
import mongoose, { Document, Model } from 'mongoose';
import mongodbErrorHandler from 'mongoose-mongodb-errors';
import jwt from 'jsonwebtoken';
import { scopeSchema } from './Scope';
import { taskSchema } from './Task';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    firstName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 255,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      private: true,
    },
    resetPasswordToken: {
      type: String,
      private: true,
    },
    resetPasswordExpires: {
      type: Date,
      private: true,
    },
    settings: {
      pomodoro: {
        pomodoroLength: {
          type: Number,
          default: 25,
        },
        shortBreak: {
          type: Number,
          default: 5,
        },
        longBreak: {
          type: Number,
          default: 15,
        },
        longBreakAfter: {
          type: Number,
          default: 4,
        },
      },
    },
    scopes: [scopeSchema],
    archivedScopes: [scopeSchema],
    schedule: [taskSchema],
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
userSchema.plugin(mongodbErrorHandler);

userSchema.methods.generateAuthToken = function(res: Response, days: number = 60): void {
  const { COOKIE_KEY, APP_SECRET, NODE_ENV } = process.env;

  if (COOKIE_KEY && APP_SECRET) {
    const token = jwt.sign({ id: this._id }, APP_SECRET, { expiresIn: `${days}d` });
    res.cookie(COOKIE_KEY, token, {
      secure: NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * days,
    });
  }
};

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  resetPasswordToken: string | null;
  resetPasswordExpires: number | null;
  generateAuthToken(res: Response, days?: number): void;
}

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
