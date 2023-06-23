import Banner from "../Models/Banner.js";
import cloudinary from "../utils/cloudinary.js";
import RestaurantBanner from "../Models/RestaurantBanner.js";
import { response } from "express";
export const addBanner = async (req, res) => {
  try {
    const { image, title } = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: "Banner",
    });

    const newBanner = new Banner({
      title,
      imageURL: result.url,
    });
    newBanner.save().then((data) => {
      if (data) {
        console.log(data, "dtata");
        return res.status(200).json({ message: "success", status: true });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    const allBanners = await Banner.find({});
    if (allBanners)
      return res.status(200).json({ message: "success", allBanners });
    return res.status(404).json({ message: "data not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const addRestaurantBanner = async (req, res) => {
  try {
  
    const { image, title, ownerId,subTitle } = req.body
  
    const result = await cloudinary.uploader.upload(image, {
      folder: "RestaurantBanner",
    });
    const restaurantBanner = new RestaurantBanner({
      title,
      subTitle,
      imageURL: result.url,
      restaurantId:ownerId
    });
    restaurantBanner.save().then((response) => {
      if (response) return res.status(200).json({ message: "success" });
      return res.status(200).json({ message: "banner not uploaded" });
    });
  } catch (error) {
    console.log(error); //console for debug
    return res.status(500).json({ message: error });
  }
};

export const getRestaurantBanner=async(req,res)=>{
    try {
        const {id}=req.params
        
        const result=await RestaurantBanner.findOne({restaurantId:id})
   
        if(result) return res.status(200).json({message:"success",result})
        return res.status(404).json({message:"data not found"})
        
    } catch (error) {
        console.log(error); //console for debug
        return res.status(500).json({message:error})
    }
}

export const deleteRestaurantBanner=async(req,res)=>{
    try {
         const {id}=req.params
       
          
         const details=await RestaurantBanner.findByIdAndDelete({_id:id})
       
         if(details){
            const allbanner=await RestaurantBanner.findOne({_id:id})
            return res.status(200).json({message:"success",allbanner})
         }
         return res.status(404).json({message:"data not deleted"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
}
