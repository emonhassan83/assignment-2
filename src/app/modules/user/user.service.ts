import { UserModel } from "../user.model";
import { TUser } from "./user.interface";

const createUserToDB = async(user: TUser) => {
    const result = await UserModel.create(user);
    return result;
}

const getAllUsersFromDB = async() => {
    const result = await UserModel.find();
    return result;
}

export const UserServices = {
    createUserToDB,
    getAllUsersFromDB,
}