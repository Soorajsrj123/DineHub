import express from "express";
import { getUser, refreshToken, register } from "../Controllers/user.js";
import { LoginUser } from "../Controllers/user.js";
import { googleSignup } from "../Controllers/user.js";
import { googleLogin } from "../Controllers/user.js";
import { verifyToken } from "../Controllers/user.js";
import { Logout } from "../Controllers/user.js";
import { getPhone } from "../Controllers/user.js";
import { getOneUser } from "../Controllers/user.js";
import { updateForgotPass } from "../Controllers/user.js";
import { getRestaurantDishes } from "../Controllers/user.js";
import { getOneRestaurant } from "../Controllers/ownerController.js";
import { getTables } from "../Controllers/ownerController.js";
import { getAllRestaurants } from "../Controllers/common-Controller.js";
import { getBookedOrders } from "../Controllers/order-controllers.js";
import { checkOut } from "../Controllers/user.js";
import { ConfirmPayment } from "../Controllers/order-controllers.js";
import { UserOrderDetails } from "../Controllers/order-controllers.js";
import {
  fetchRestaurantData,
  getSearchedRestaurant,
} from "../Controllers/ownerController.js";
import { addRating } from "../Controllers/rating-controller.js";
import { getUserDataById } from "../Controllers/common-Controller.js";
import { editUserProfile } from "../Controllers/user.js";
import { deleteUserReview } from "../Controllers/rating-controller.js";
import { cancelBooking } from "../Controllers/order-controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",LoginUser);
router.post("/googleSignup", googleSignup);
router.post("/googleLogin", googleLogin);
router.post("/logout", Logout);
router.post("/get-phone", getPhone);
router.post("/get-user", getOneUser);
router.get("/home", getUser);
router.post("/refresh", refreshToken);
router.patch("/update-password", updateForgotPass);
router.get("/restaurant/get-dishes/:id", verifyToken,getRestaurantDishes);
router.get("/restaurant/get-one-restaurant/:id", getOneRestaurant);
router.get("/restautant/get-tables/:id", getTables);
router.get("/restaurants/get-all-restaurants", getAllRestaurants);
router.get("/restaurant/get-booked-orders", getBookedOrders);
router.post("/restaurant/checkout",verifyToken, checkOut);
router.post("/restaurant/confirm-payment", ConfirmPayment);
router.get("/restaurant/get-order-details/:id",verifyToken, UserOrderDetails);
router.get("/restaurant/get-res-details/:id", fetchRestaurantData);
router.post("/restaurant/add-rating", addRating);
router.get("/get-one-user/:id", getUserDataById);
router.patch("/update-user-profile",verifyToken, editUserProfile);
router.delete("/delete-user-review/:id", verifyToken,deleteUserReview);
router.patch("/restaurant/cancel-booking/:id/:userId",verifyToken, cancelBooking);
router.get("/restaurant/search-restaurant", getSearchedRestaurant);
export default router;
