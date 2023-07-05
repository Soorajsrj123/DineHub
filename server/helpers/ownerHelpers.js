import Restaurant from "../Models/RestaurantSchema.js";
import Dish from '../Models/DishModel.js'

export const singleRes = async (req, res) => {
  const resId = req.params.id;
  
  try {
    const dbresponse = await Restaurant.findOne({ _id: resId });
    
    if (dbresponse) {
      return res.status(200).json({ message: "success", data: dbresponse });
    } else {
      return res.status(201).json({ message: "data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const singleDish=async(req,res)=>{
  try {
    const id=req.params.id
  
          const singleDish=await Dish.findById({_id:id})
         
          if(singleDish) return res.status(200).json({message:'success',singleDish})
          return res.status(201).json({message:"data not found"})
  } catch (error) {
    return res.status(500).json({message:error})
  }
}
