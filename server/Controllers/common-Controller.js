import Restaurant from '../Models/RestaurantSchema.js'

export const getAllRestaurants=async(req,res)=>{
    try {
        
        const Details=await Restaurant.find({status:"approved"})
        if(!Details) return res.status(404).json({message:"Data not found",status:false})
        return res.status(200).json({message:"success",Details,status:true})
      
    } catch (error) {
        return res.status(500).json({message:error,status:false})
    }
}