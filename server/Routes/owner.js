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
import {AddTable} from '../Controllers/ownerController.js'
import {getAllTables} from '../Controllers/ownerController.js'
import {deleteTable} from '../Controllers/ownerController.js'
import {oneTableData} from '../Controllers/ownerController.js'
import {editTable} from '../Controllers/ownerController.js'
const router=Router()

router.post('/signup',OwnerRegistration)
router.post('/login',OwnerLogin)
router.post('/add-restaurant/:id',AddRestaurant)
router.get('/restaurants/:id',getOwnerRestaurant)
router.get('/delete-restaurant/:id',deleteRestaurant)
router.get('/get-one-res/:id',singleRes)
router.patch('/edit-restaurant',editRestaurant)
router.post('/add-dish-details',AddDishDetails)
router.get('/dishes/:id',getAllDishes)
router.delete('/delete-dish/:id/:ownerid',deleteDish)
router.get('/get-one-dish/:id',singleDish)
router.patch('/edit-dish/:id',updateDish)
router.post('/add-table',AddTable)
router.get('/tables/:id',getAllTables)
router.delete('/delete-table/:id/:ownerid',deleteTable)
router.get('/get-one-table/:id',oneTableData)
router.patch('/edit-table:id',editTable)

export default router