const mongoose = require('mongoose');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const jwt = require('jsonwebtoken');
const { scopeSchema } = require('./Scope');

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
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true },
);

// The MongoDBErrorHandler plugin gives us a better 'unique' error
userSchema.plugin(mongodbErrorHandler);

userSchema.methods.generateAuthToken = function(res, days = 60) {
  const token = jwt.sign({ id: this._id }, process.env.APP_SECRET, { expiresIn: `${days}d` });
  res.cookie(process.env.COOKIE_KEY, token, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * days,
  });
};

const User = mongoose.model('User', userSchema);

exports.User = User;
