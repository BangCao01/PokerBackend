// Commented Authentication
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';

export interface User {
  username: string;
  hash: string;
}

// interface UserStaticMethods {
//   setPassword(password: crypto.BinaryLike): void;
//   validPassword(password: crypto.BinaryLike): boolean;
//   generateJwt(): string;
// }

// export type UserDocument = User & mongoose.Document & UserStaticMethods;
export type UserDocument = User & mongoose.Document;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  hash: String,
  salt: String,


  created_date: {
    type: String,
    default: new Date().getTime(),
  },
  modified_date: {
    type: String,
    default: new Date().getTime(),
  },
});



const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;
