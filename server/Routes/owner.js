import { Router } from "express";
import {OwnerRegistration} from '../Controllers/ownerAuthController.js'
import {OwnerLogin} from '../Controllers/ownerAuthController.js'
import{AddRestaurant} from '../Controllers/ownerController.js'
import {getOwnerRestaurant} from  '../Controllers/ownerController.js'
import {deleteRestaurant} from '../Controllers/ownerController.js'
import {singleRes} from '../helpers/ownerHelpers.js'
import {editRestaurant} from '../Controllers/ownerController.js'
import {AddDishDetails} from '../Controllers/ownerController.js'
import {getAllDishes} from '../Controllers/ownerController.js'
import {deleteDish} from '../Controllers/ownerController.js'
import {singleDish} from '../helpers/ownerHelpers.js'
import {updateDish} from '../Controllers/ownerController.js'
import {vefifyOwner,refreshTokenOwner} from '../Controllers/ownerAuthController.js'
import {AddTable} from '../Controllers/ownerController.js'
import {getAllTables} from '../Controllers/ownerController.js'
import {deleteTable} from '../Controllers/ownerController.js'
import {oneTableData} from '../Controllers/ownerController.js'
import {editTable} from '../Controllers/ownerController.js'
import {getPhone} from '../Controllers/ownerController.js'
import {updatePassword,getClassification} from '../Controllers/ownerController.js'
import {addRestaurantBanner} from '../Controllers/banner-controller.js'
import {getRestaurantBanner} from '../Controllers/banner-controller.js'
import {getUserReview} from '../Controllers/rating-controller.js'
import {getRestaurantYearlySales} from '../Controllers/order-controllers.js'
import {deleteRestaurantBanner} from '../Controllers/banner-controller.js'
import {getAverageRating} from '../Controllers/rating-controller.js'
import {getUserOrders,getRestaurantDailySales,getRestaurantMonthlySales} from '../Controllers/order-controllers.js'
const router=Router()

router.post('/signup',OwnerRegistration)
router.post('/login',OwnerLogin)
router.post('/refreshowner',refreshTokenOwner)
router.post('/add-restaurant',AddRestaurant)
router.get('/restaurants/:id',getOwnerRestaurant)
router.get('/delete-restaurant/:id',deleteRestaurant)
router.get('/get-one-res/:id',singleRes)
router.patch('/edit-restaurant',editRestaurant)
router.post('/add-dish-details',AddDishDetails)
router.get('/dishes/:id',vefifyOwner,getAllDishes)
router.delete('/delete-dish/:id/:resId',vefifyOwner,deleteDish)
router.get('/get-one-dish/:id',singleDish)
router.patch('/edit-dish/:id',updateDish)
router.post('/add-table',AddTable)
router.get('/tables/:id',vefifyOwner,getAllTables)
router.delete('/delete-table/:id/:ownerid',deleteTable)
router.get('/get-one-table/:id',oneTableData)
router.patch('/edit-table:id',editTable)
router.post('/get-phone',getPhone)
router.patch('/update-password',updatePassword)
router.post('/restaurant/add-banner',addRestaurantBanner)
router.get('/restaurant/banner/:id',vefifyOwner,getRestaurantBanner)
router.get('/restaurant',getUserReview)
router.delete('/restaurant/delete-banner/:id',deleteRestaurantBanner)
router.get('/restaurant/yearly-datas/:id',getRestaurantYearlySales)
router.get('/restaurant/monthly-data/:id',getRestaurantMonthlySales)
router.get('/restaurant/daily-data/:id',getRestaurantDailySales)
router.get('/restaurant/classification-chart/:id',vefifyOwner,getClassification)
router.get('/restaurant/average-rating/:id',getAverageRating)
router.get('/users/all-orders/:id',vefifyOwner,getUserOrders)



export default router