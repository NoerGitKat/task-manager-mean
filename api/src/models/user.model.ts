import _ from "lodash";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Schema, model } from "mongoose";
import hashPassword from "../middlewares/hashPassword";
import comparePassword from "../middlewares/comparePassword";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Overwrite methods
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  // Return document minues password/sessions
  return _.omit(userObj, ["password", "sessions"]);
};

userSchema.methods.generateAccessAuthToken = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id.toHexString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
      (err, token) => {
        if (!err) {
          resolve(token);
        } else {
          reject(err.message);
        }
      }
    );
  });
};

userSchema.methods.generateRefreshAuthToken = function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buffer) => {
      if (!err) {
        let refreshToken = buffer.toString("hex");
        return resolve(refreshToken);
      } else {
        reject(err.message);
      }
    });
  });
};

userSchema.methods.createSession = function () {
  let user = this;

  const refreshToken = user
    .generateRefreshAuthToken()
    .then((refreshToken: any) => {
      return saveSessionToDatabase(user, refreshToken);
    })
    .then((refreshToken: any) => {
      return refreshToken;
    })
    .catch((error: { message: string }) => {
      return Promise.reject(error.message);
    });
};

/* MODEL METHODS */
userSchema.statics.findByIdAndToken = function (_id, token) {
  const user = this;
  return User.findOne({ _id, "session.token": token });
};

userSchema.statics.findByCredentials = function (email, password) {
  let user = this;
  return User.findOne({ email }).then((user) => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      const isValid = comparePassword(password, user.password);
      if (isValid) {
        resolve(user);
      } else {
        reject("Password is not valid!");
      }
    });
  });
};

userSchema.statics.hasRefreshTokenExpired = (expiresAt: number) => {
  let secondsSinceEpoch = Date.now() / 1000;
  if (expiresAt > secondsSinceEpoch) {
    return false; // Token hasn't expired yet
  } else {
    return true; // Token has expired
  }
};

/* MIDDLEWARE */
userSchema.pre("save", function (next) {
  let user = this;
  const salts = 10;

  if (user.isModified("password")) {
    // If password has changed, run this code
    hashPassword(user, salts, user.password);
  }
});

/* HELPER METHODS */
let saveSessionToDatabase = (user: any, refreshToken: any) => {
  return new Promise((resolve, reject) => {
    let expiresAt = generateRefreshTokenExpiryTime();

    user.sessions.push({ token: refreshToken, expiresAt });

    user
      .save()
      .then(() => {
        return resolve(refreshToken);
      })
      .catch((error: any) => {
        reject(error);
      });
    return refreshToken;
  });
};

let generateRefreshTokenExpiryTime = () => {
  let daysUntilExpire = 10;
  let secondsUntilExpire = daysUntilExpire * 24 * 60 * 60;
  return Date.now() / 1000 + secondsUntilExpire;
};

const User = model("User", userSchema);

export default User;
