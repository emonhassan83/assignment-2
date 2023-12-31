import { Schema, model } from "mongoose";
import { TOrder, TUser } from "./user/user.interface";
import bcrypt from 'bcrypt';
import config from "../config";

const orderSchema = new Schema<TOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: { type: [orderSchema] },
});

userSchema.pre('save', async function (next) {
  // hashing password and save into database
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round))
  next();
});

export const UserModel = model<TUser>('User', userSchema);