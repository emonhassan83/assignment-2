/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { orderValidationSchema } from "../user/user.validation";

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { productName, price, quantity } = req.body;

    const { error, value } = orderValidationSchema.validate({ productName, price, quantity });

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error,
      })
    }

    const result = await ProductServices.addProductToDB(userId, value);

    if (result as any) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error adding product to order",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getOrdersForUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
  
      // Retrieve orders for the user
      const orders = await ProductServices.getOrdersForUserFromDB(userId);
  
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: { orders },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


  const calculateTotalPriceForUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
  
      // Calculate total price for the user
      const totalPrice = await ProductServices.calculateTotalPriceForUserFromDB(userId);
  
      res.status(200).json({
        success: true,
        message: "Total price calculated successfully!",
        data: { totalPrice },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };


export const ProductControllers = {
  addProductToOrder,
  getOrdersForUser,
  calculateTotalPriceForUser,
  
};
