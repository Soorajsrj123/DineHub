import User from "../Models/UserModel.js";
import Rating from "../Models/Rating.js";

export const addRating = async (req, res) => {
  try {
    console.log(req.body, "bodyyyyy");
    const { review, rating, user, restaurantId } = req.body;
    const userData = await User.findOne({ _id: user });
    if (!userData) return res.status(404).json({ message: "user not found" });
    const newRating = new Rating({
      userName: userData.name,
      userId: userData._id,
      restaurantId,
      rating,
      review,
    });
    newRating.save().then((response) => {
      return res.status(200).json({ message: "success" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getUserReview = async (req, res) => {
  const { resId, userId } = req.query;
  try {
    const review = await Rating.findOne({ restaurantId: resId, userId });
    if (!review) return res.status(204).json({ message: "data not found" });
    return res.status(200).json({ message: "success", review });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const deleteUserReview = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const updatedData = await Rating.findByIdAndDelete({ _id: id });
    console.log(updatedData, "updaed data");
    if (updatedData)
      return res.status(200).json({ message: "success", updatedData });
    // return res.status(404).json({message:"data not found"})
    // throw "data not found"
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getAverageRating=async(req,res)=>{
try {
  const {id}=req.params
   const aggregatedData=await Rating.aggregate([
    {
      $match
    }
   ])
} catch (error) {
  console.log(error);
}
}
