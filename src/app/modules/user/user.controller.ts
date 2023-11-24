/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";
import { UserModel } from "../user.model";
import userValidationSchema from "./user.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const { error, value } = userValidationSchema.validate(user);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error,
      })
    }

    const result = await UserServices.createUserToDB(value);

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
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUsersFromDB(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userWithoutPassword: TUser = { ...result.toObject() };
    delete (userWithoutPassword as { password?: any }).password;

    res.status(200).json({
      success: true,
      message: "User is retrieve successfully!",
      data: userWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: error.message,
    });
  }
};

const updateAUser = async (req: Request, res: Response) => {
  try {
    const updatedUserData: TUser = req.body;
    const { userId } = req.params;

    const existingUser = await UserServices.updateAUser(
      userId,
      updatedUserData
    );
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { userId: userId },
      { $set: updatedUserData },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUserWithoutPassword: TUser = { ...updatedUser.toObject() };
    delete (updatedUserWithoutPassword as { password?: any }).password;

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updatedUserWithoutPassword,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
};

const deleteASingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteAUserFromDB(userId);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: error.message,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateAUser,
  deleteASingleUser,
};
