import cloudinary from "../utils/cloudinary.js";
import Restaurant from "../Models/RestaurantSchema.js";
import Dish from "../Models/DishModel.js";
import Table from "../Models/TableModel.js";
import Owner from "../Models/OwnerModel.js";
import bcrypt from "bcrypt";
export const AddRestaurant = async (req, res) => {
  try {
    // console.log(req.body);
    const {
      restaurantName,
      ownerName,
      email,
      phone,
      address,
      tables,
      fssc,
      wifi,
      parking,
      aircondition,
      description,
      image,
      startTime,
      endTime,
    } = req.body;

    const result = await cloudinary.uploader.upload(image, {
      folder: "restorants",
    });
    //  console.log(result,"cloudinaryyyyyyyyyyyyy");
    // checking if the restaurant is already exist
    const isEmailExist = await Owner.find({ email: email });
    // email already exist
    if (isEmailExist.length !== 0)
      return res
        .status(409)
        .json({ message: "This email is already registered", status: false });
    const phoneNumberExist = await Restaurant.find({ phone: phone });
    // PhoneNo already exist
    if (phoneNumberExist.length !== 0)
      return res
        .status(409)
        .json({ message: "PhoneNumber already exist", status: false });

    const restaurant = new Restaurant({
      restaurantName,
      address,
      ownerName,
      email,
      phone,
      fssc,
      description,
      startTime,
      endTime,
      tables,
      wifi,
      parking,
      aircondition,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    restaurant.save().then((data) => {
      return res.status(200).json({ message: "success", status: true });
    });
  } catch (error) {
    console.log(error, "errr");
    res.status(500).json({ message: error, status: false });
  }
};

export const getOwnerRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    // console.log(restaurant,"kjhg");
    if (!restaurant) return res.status(200).json({ message: "no data found" });
    return res.status(200).json({ message: "success", restaurant });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const resId = req.params.id;

    const dbresponse = await Restaurant.deleteOne({ _id: resId });

    if (!dbresponse.acknowledged)
      return res.status(200).json({ message: "data is not deleted" });
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const editRestaurant = async (req, res) => {
  try {
    const {
      resName,
      resAddress,
      resPhone,
      resTable,
      resTime,
      resWifi,
      resAircondition,
      resParking,
      id,
      image,
    } = req.body;
    const result = await cloudinary.uploader.upload(image, {
      folder: "restaurant",
    });

    if (result) {
      const dbresponse = await Restaurant.updateOne(
        { _id: id },
        {
          $set: {
            restaurantName: resName,
            aircondition: resAircondition,
            address: resAddress,
            tables: resTable,
            phone: resPhone,
            time: resTime,
            wifi: resWifi,
            parking: resParking,
            aircondition: resParking,
            image: {
              public_id: result.public_id,
              url: result.url,
            },
          },
        }
      );

      if (dbresponse) {
        res.status(200).json({ message: "success", data: dbresponse });
      }
    }
  } catch (error) {
    console.log(error, "errssss");
    res.status(500).json({ message: error });
  }
};

export const AddDishDetails = async (req, res) => {
  const {
    dishName,
    description,
    price,
    category,
    image,
    owner,
    classification,
  } = req.body;

  const result = await cloudinary.uploader.upload(image, {
    folder: "Dishes",
  });

  try {
    const dish = new Dish({
      dishName,
      description,
      category,
      price,
      restaurantId: owner,
      classification,
      image: {
        public_id: result.public_id,
        url: result.url,
      },
    });
    dish
      .save()
      .then((data) => {
        return res.status(200).json({ message: "success" });
      })
      .catch((err) =>
        res.status(500).json({ message: "something went wrong" })
      );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllDishes = async (req, res) => {
  try {
    const { id } = req.params;

    const allDishes = await Dish.find({ restaurantId: id });
    if (allDishes)
      return res.status(200).json({ message: "success", allDishes });
    return res.status(201).json({ message: "data not found" });
  } catch (error) {
    console.log(error, "err");
    return res.status(500).json({ message: error });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const { id, resId } = req.params;
    console.log(id, resId, "id>>>>>>>");
    const dbresponse = await Dish.findByIdAndDelete({ _id: id });
    console.log(dbresponse);
    if (!dbresponse)
      return res.status(200).json({ message: "data is not deleted" });
    else {
      const allDishes = await Dish.find({ restaurantId: resId });
      if (allDishes) return res.status(200).json({ allDishes });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const updateDish = async (req, res) => {
  try {
    const { dishName, description, price, category, image } = req.body;

    const id = req.params.id;
    const result = await cloudinary.uploader.upload(image, {
      folder: "Dishes",
    });

    if (result) {
      const newDish = await Dish.updateOne(
        { _id: id },
        {
          $set: {
            dishName,
            price,
            category,
            description,
            image: {
              public_id: result.public_id,
              url: result.url,
            },
          },
        }
      );
      if (newDish) return res.status(200).json({ message: "success" });
      return res.status(201).json({ message: "data not updated" });
    }
    return res.status(201), json({ message: "data not found" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const AddTable = async (req, res) => {
  try {
    const { tableNumber, isAvailable, owner } = req.body;
    console.log(tableNumber, "tt");
    const oldTable = await Table.findOne({restaurantId:owner, tableNumber });
    if (oldTable)
      return res
        .status(409)
        .json({ message: "Table already exist", status: false });
    const table = new Table({
      tableNumber,
      isAvailable,
      restaurantId: owner,
    });
    table.save().then((data) => {
      return res.status(200).json({ message: "success", status: true });
    });
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const getAllTables = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    const allDatas = await Table.find({ restaurantId });

    if (allDatas.length <= 0)
      return res.status(404).json({ message: "data not found" });
    return res.status(200).json({ message: "success", allDatas });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteTable = async (req, res) => {
  try {
    const { id, ownerid } = req.params;

    const dbresponse = await Table.findByIdAndDelete({ _id: id });
    console.log(dbresponse, ">>>>>>>>>>>>>>>>>>>>>>");
    if (!dbresponse)
      return res.status(201).json({ message: "data is not deleted" });
    else {
      const allTables = await Table.find({ restaurantId: ownerid });
      if (allTables) return res.status(200).json({ allTables });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const oneTableData = async (req, res) => {
  try {
    const id = req.params.id;

    const dbresponse = await Table.findOne({ _id: id });
    if (!dbresponse) return res.status(404).json({ message: "data not found" });
    return res.status(200).json({ message: "success", data: dbresponse });
  } catch (error) {
    console.log(error, ">>>>>>>>>>>>");
    return res.status(500).json({ message: error });
  }
};

export const editTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const { tableNumber, isAvailable } = req.body;

    const dbresponse = await Table.updateOne(
      { _id: tableId },
      {
        $set: {
          tableNumber,
          isAvailable,
        },
      }
    );
    if (!dbresponse)
      return res.status(404).json({ message: "data not found", status: false });
    return res.status(200).json({ message: "success", status: true });
  } catch (error) {
    return res.status(500).json({ message: error.response, status: false });
  }
};

export const getOneRestaurant = async (req, res) => {
  try {

   
    const restaurantId = req.params.id;
            console.log(restaurantId,"kk");
    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    console.log(restaurant, "dd gggd ");
    if (!restaurant)
      return res.status(404).json({ message: "data not found", status: false });
    return res
      .status(200)
      .json({ message: "succuss", restaurant, status: true });
  } catch (error) {
    console.log(error, "dd");
    return res.status(500).json({ message: error, status: false });
  }
};

export const getTables = async (req, res) => {
  try {
    console.log("called bbb");
    const { id } = req.params;
    console.log(id,"id");
    const dbresponse = await Table.find({ restaurantId: id });
    // console.log(dbresponse,"res >>>>>>");
    if (!dbresponse)
      return res.status(404).json({ message: "data not found", status: false });
    return res
      .status(200)
      .json({ message: "success", status: true, tables: dbresponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error, status: false });
  }
};

export const getPhone = async (req, res) => {
  try {
    console.log(req.body, "body phone");
    const phone = req.body.phoneNumber;
    const owner = await Owner.findOne({ phone });
    console.log(owner, "owner>>>");
    if (!owner)
      return res
        .status(404)
        .json({ message: "Number is not registered", status: false });
    return res.status(200).json({ message: "success", status: true, owner });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { password, id } = req.body;

    const owner = await Owner.findOne({ _id: id });

    if (!owner)
      return res.status(404).json({ message: "password not changed" });
    else {
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(500).json({ message: "internal server error" });
        }
        const updatedData = await Owner.findByIdAndUpdate(
          { _id: id },
          { password: hash }
        );
        if (updatedData)
          return res
            .status(200)
            .json({ message: "success", user: updatedData });
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const fetchRestaurantData=async(req,res)=>{
  try {
    console.log("here");
    const restaurantId=req.params.id

    const data=await Restaurant.findOne({_id:restaurantId})
        console.log(data,"finded data from order");
    if(data) return res.status(200).json({message:"success",restaurantDetails:data})
    return res.status(404).json({message:"data not found"})
  } catch (error) {
    return res.status(500).json({message:error})
  }
}

