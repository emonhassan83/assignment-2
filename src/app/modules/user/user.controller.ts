import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await UserServices.createUserToDB(user);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
        success: true,
        message: "Users are retrieve successfully!",
        data: result,
      });

} catch (error) {
    res.status(500).json({
        success: false,
        message: "User not found",
        error: error,
      });
}
}


export const UserControllers = {
    createUser,
    getAllUsers,
}