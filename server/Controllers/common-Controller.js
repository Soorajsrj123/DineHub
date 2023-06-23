import Restaurant from "../Models/RestaurantSchema.js";
import User from "../Models/UserModel.js";

export const getAllRestaurants = async (req, res) => {
  try {
    const Details = await Restaurant.find({ status: "approved" });
    if (!Details)
      return res.status(404).json({ message: "Data not found", status: false });
    return res.status(200).json({ message: "success", Details, status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, status: false });
  }
};

export const getUserDataById = async (req, res) => {
  try {
    const { id } = req.params

    const details = await User.findOne({ _id: id });
    if (!details) return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ message: "success", details });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
