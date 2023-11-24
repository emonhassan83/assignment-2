import { UserModel } from "../user.model";
// import { TOrder } from "../user/user.interface";

const addProductToDB = async(userId: number, productData: { productName: string, price: number, quantity: number }) => {
    try {
        const user = await UserModel.findOne({ userId: userId });
        
        if (!user) {
          throw new Error("User not found");
        }
    
        if (!user.orders) {
          user.orders = [];
        }
    
        const newProduct = { ...productData };
        user.orders.push(newProduct);
        
        await user.save();
    
        return true; 
      } catch (error) {
        console.log(error);
        return false; 
      }
}

const getOrdersForUserFromDB = async (userId: number) => {
    try {
      const user = await UserModel.findOne({ userId });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      return user.orders || [];
    } catch (error) {
      console.error('Error fetching orders for user:', error);
      throw error;
    }
  };

  const calculateTotalPriceForUserFromDB = async (userId: number) => {
    try {
      const user = await UserModel.findOne({ userId });
  
      if (!user) {
        throw new Error("User not found");
      }
  
      const totalPrice = user.orders?.reduce((sum, order) => sum + order.price * order.quantity, 0);
  
      return totalPrice;
    } catch (error) {
      console.error('Error calculating total price for user:', error);
      throw error;
    }
  };

export const ProductServices = {
    addProductToDB,
    getOrdersForUserFromDB,
    calculateTotalPriceForUserFromDB

}