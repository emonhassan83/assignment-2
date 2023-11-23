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

const getSingleUsersFromDB = async(userId: string) => {
    const result = await UserModel.findOne({userId});
    return result;
}

const updateAUser = async (userId: string, updatedUserData: object) => {
    const result = await UserModel.updateOne({ userId: userId }, updatedUserData);
    return result;
  };
  

export const UserServices = {
    createUserToDB,
    getAllUsersFromDB,
    getSingleUsersFromDB,
    updateAUser,
}