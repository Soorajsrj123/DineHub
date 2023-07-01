import express from "express";
import { AdminSignUp } from "../Controllers/adminAuthContoller.js";
import {getOwners} from '../helpers/adminHelpers.js'
import {ActivateOwner} from '../helpers/adminHelpers.js'
import {BlockOwner} from '../helpers/adminHelpers.js'
import {getUsers} from '../helpers/adminHelpers.js'
import {selectRequest} from '../Controllers/admin-controller.js'
import {selectedRestaurantDetails} from '../Controllers/admin-controller.js'
import {ApproveRestaurant} from '../Controllers/admin-controller.js'
import {RejectRestaurant} from '../Controllers/admin-controller.js'
import {getDeclinedRequest} from '../Controllers/admin-controller.js'
import {getAllRestaurants} from '../Controllers/common-Controller.js'
import {getOneRestaurant} from '../Controllers/admin-controller.js'
import {addBanner} from '../Controllers/banner-controller.js'
import {getAllBanners} from '../Controllers/banner-controller.js'
import {adminYearlyData} from '../Controllers/order-controllers.js'
import {adminDailyData} from '../Controllers/order-controllers.js'
import {adminMonthlyData} from '../Controllers/order-controllers.js'
const router = express.Router();

router.post("/login", AdminSignUp);
router.get('/getowners',getOwners)
router.put('/owners/unblock/:id',ActivateOwner)
router.put('/owners/block/:id',BlockOwner)
router.get('/get-users',getUsers)
router.get('/restaurant/pending-request',selectRequest)
router.get('/view-restaurant-request/:id',selectedRestaurantDetails)
router.patch('/approve-restaurant/:id',ApproveRestaurant)
router.patch('/reject-restaurant/:id',RejectRestaurant)
router.get('/restaurant/declined-requests',getDeclinedRequest)
router.get('/restaurants',getAllRestaurants)
router.get('/restaurant/get-one-restaurant/:id',getOneRestaurant)
router.post('/restaurant/add-banner',addBanner)
router.get('/restaurant/get-all-banners',getAllBanners)
router.get('/restaurant/yearly-datas',adminYearlyData)
router.get('/restaurant/daily-datas',adminDailyData)
router.get('/restaurant/monthly-datas',adminMonthlyData)






export default router;
