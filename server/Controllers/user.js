import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Dish from "../Models/DishModel.js";
import Order from "../Models/Orders.js";
import cloudinary from "../utils/cloudinary.js";
import Rating from "../Models/Rating.js";
import { isValidObjectId } from "mongoose";
// import { token } from 'morgan'

// SIGNUP USER
export const register = async (req, res) => {
  try {
    const { name, email, password, PhoneNumber } = req.body;

    const UserName = new Promise((resolve, reject) => {
      if (!name || name.length < 2) {
        reject(new Error("please enter the valid name "));
      } else {
        resolve();
      }
    });

    const UserEmail = new Promise((resolve, reject) => {
      if (email) {
        //  chack if the user already exist or not
        User.findOne({ email: email }).then((email) => {
          if (email) {
            reject(new Error("Email already exist"));
          } else {
            resolve();
          }
        });
      } else {
        reject(new Error("Email required"));
      }
    });
    const UserPhone = new Promise((resolve, reject) => {
      if (!PhoneNumber) reject(new Error("enter a valid phone number"));
      User.findOne({ PhoneNumber }).then((phoneNo) => {
        if (phoneNo) reject(new Error("PhoneNumber already exist"));
        resolve();
      });
    });

    Promise.all([UserName, UserEmail, UserPhone])
      .then(() => {
        if (password) {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              res.status(500).json({ err: err });
            }
            const newUser = new User({
              name,
              email,
              password: hash,
              PhoneNumber,
            });
            newUser.save().then((user) => {
              res.status(200).json({ success: "Registered Successfully" });
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ err: error.message });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message });
  }
};

// LOGIN USER

export const LoginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    //checking if the email is exist or not

    let user = await User.findOne({ email: email });

    if (user) {
      let validUser = await bcrypt.compare(password, user.password);

      if (validUser) {
        //   CREATING A TOKEN
        const token = jwt.sign({ user_id: user._id, email }, "my secret key", {
          expiresIn: "10d",
        });

        //   checking if the cookis already has data then clear it
        // if(req.cookies[`${user._id}`])
        // {
        //     req.cookies[`${user._id}`]=""
        // }

        //   SAVING THE TOKEN IN COOKIE
        res.cookie(String(user._id), token, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 30),
          httpOnly: true,
          samesiteL: "lax",
        });
        res.status(200).json({ message: "login Success", token, user });
      } else {
        res.status(400).send("wrong password");
      }
    } else {
      res.status(400).send("email not found");
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

// LOGIN USING GOOGLE

export const googleSignup = async (req, res) => {
  const { email, fullName } = req.body._tokenResponse;

  let user = await User.findOne({ email });
  if (user) {
    res.status(409).send("email already exist");
  } else {
    let user = new User({
      name: fullName,
      email: email,
    });
    user
      .save()
      .then((response) => {
        res.status(200).json({ message: "login success" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const googleLogin = async (req, res) => {
  const { email, fullName } = req.body._tokenResponse;
  let user = await User.findOne({ email });
  if (user) {
    res.status(200).json({ message: "login success" });
  } else {
    res.status(409).json({ message: "Login failed" });
  }
};

// VERIFY TOKEN

export const verifyToken = (req, res, next) => {
  try {
    let cookies = req.headers.cookie;
    let token = cookies.split("=")[1];

    if (!token) {
      res.status(404).json({ message: "no token found" });
    }

    jwt.verify(token, "my secret key", (err, user) => {
      if (err) {
        return res.status(400).json({ message: "invalid token" });
      }

      req.id = user.user_id;
    });
    next();
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new error();
  }
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({ user });
};

// REFRESH TOKEN

export const refreshToken = (req, res, next) => {
  let cookies = req.headers.cookie;
  let Prevtoken = cookies.split("=")[1];
  if (!Prevtoken) {
    return res.status(400).json({ message: "token not found" });
  }
  jwt.verify(String(Prevtoken), "my secret key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Authentication failed" });
    }
    // CLEARING THE PREVIOUS COOKIE
    res.clearCookie(`${user.user_id}`);
    req.cookies[`${user.user_id}`] = "";
    // CREATING THE NEW COOKIE

    let token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      "my secret key",
      {
        expiresIn: "35s",
      }
    );

    res.cookie(String(user.user_id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      samesiteL: "lax",
    });

    req.id = user.user_id;
    next(); //it calls the vefiry fn
  });
};

export const Logout = (req, res, next) => {
  let cookies = req.headers.cookie;
  let Prevtoken = cookies.split("=")[1];
  if (!Prevtoken) {
    return res.status(400).json({ message: "token not found" });
  }
  jwt.verify(String(Prevtoken), "my secret key", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Authentication failed" });
    }
    // CLEARING THE PREVIOUS COOKIE
    res.clearCookie(`${user.user_id}`);
    req.cookies[`${user.user_id}`] = "";
    return res.status(200).json({ message: "successfully Logged out" });
  });
};

export const getPhone = async (req, res) => {
  const PhoneNumber = req.body.phoneNumber;

  // const { id } = req.params;

  try {
    const isFound = await User.findOne({ PhoneNumber });

    if (!isFound)
      return res
        .status(403)
        .json({ message: "PhoneNumber is Not Registered", status: false });
    else {
      return res.status(200).json({ message: "success", status: true });
    }
  } catch (error) {
    return res.status(500).json({ message: error, status: false });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const phone = req.body.phoneNumber;
    const updatedPhone = phone.slice(3);

    const userData = await User.findOne({ PhoneNumber: updatedPhone });

    return res.status(200).json({ message: "success", userId: userData._id });
  } catch (error) {
    console.log(error, "err");
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const updateForgotPass = async (req, res) => {
  try {
    const { password, id } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(200).json({ message: "password not changed" });
    else {
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(500).json({ message: "internal server error" });
        }
        const updatedData = await User.findByIdAndUpdate(
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
    return res.status(500).json({ message: "server error" });
  }
};

export const getRestaurantDishes = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantId = isValidObjectId(id);

    if (restaurantId) {
      const dishDetails = await Dish.find({ restaurantId: id }).sort({
        _id: -1,
      });
      if (!dishDetails.length)
        return res
          .status(404)
          .json({ message: "data not found", status: false });
      return res
        .status(200)
        .json({ message: "success", status: true, dishDetails });
    } else {
      return res.status(400).json({ message: "Bad Request" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const checkOut = async (req, res) => {
  try {
    const {
      userId,
      startDateString,
      time,
      button,
      selectedValue,
      filteredDishes,
    } = req.body;

    const orderDetails = new Order({
      orderDetails: filteredDishes,
      tableNo: button,
      orderType: selectedValue,
      userId,
      date: startDateString,
      time,
    });

    orderDetails.save().then((response) => {
      if (response) {
        return res.status(200).json({ message: "success", data: response });
      } else {
        return res.status(500).json({ message: "something went wrong" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const { name, email, PhoneNumber, userId, image } = req.body;

    const { id } = userId;
    let updatedValue;

    if (image !== "") {
      const result = await cloudinary.uploader.upload(image, {
        folder: "Users",
      });

      updatedValue = await User.findByIdAndUpdate(
        { _id: id },
        {
          name,
          email,
          PhoneNumber,
          imageURL: {
            public_id: result.public_id,
            url: result.url,
          },
        }
      );
    } else {
      updatedValue = await User.findByIdAndUpdate(
        { _id: id },
        {
          name,
          email,
          PhoneNumber,
        }
      );
    }

    if (updatedValue)
      return res.status(200).json({ message: "success", status: true });
    return res
      .status(200)
      .json({ message: "profile not updated", status: false });
  } catch (error) {
    console.log(error, "err");
    return res.status(500).json({ message: error, status: false });
  }
};
