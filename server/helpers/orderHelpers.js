import Order from "../Models/Orders.js";
import mongoose,{ObjectId} from 'mongoose'

export const getTotalAmount=async(orderId,userId)=>{

    const convertedOrderId=new mongoose.Types.ObjectId(orderId)

    try {
        const totalAmout=await Order.aggregate([
            {
                $match:{
                    _id:convertedOrderId,
                }
            },
            {
                $unwind:"$orderDetails"
            },
            {
                 $group:{
                    _id:null,
                    totalSales:{$sum:"$orderDetails.total"}
                 }
            }
        ])
       return totalAmout
    } catch (error) {
        console.log(error);
    }
}
 
export const getOrderedDishClassification=async(resId)=>{
    
    try {
        const convertedOrderId=new mongoose.Types.ObjectId(resId)
        const result=await Order.aggregate([
            {
                $match:{ownerId:convertedOrderId}
            },
            {
                $unwind:"$orderDetails"
            },
            {
                $group: {
                  _id: "$orderDetails.classification",
                  count: { $sum: 1 }
                }
              }
        ])
       return result
    } catch (error) {
       throw error
    }
}

