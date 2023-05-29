import express from 'express'
import  {getUser, refreshToken, register} from '../Controllers/user.js'
import { LoginUser } from '../Controllers/user.js'
import {googleSignup} from '../Controllers/user.js'
import {googleLogin} from '../Controllers/user.js'
import { verifyToken } from '../Controllers/user.js'
import { Logout } from '../Controllers/user.js'
import {getPhone} from '../Controllers/user.js'
import {getOneUser} from '../Controllers/user.js'
import {updateForgotPass} from '../Controllers/user.js'
const router=express.Router()



 router.post('/register',register)
 router.post('/login',LoginUser)
 router.post('/googleSignup',googleSignup)
 router.post('/googleLogin',googleLogin)
 router.get('/home',verifyToken,getUser)
 router.get('/refresh',refreshToken,verifyToken,getUser)
 router.post('/logout',verifyToken,Logout)
 router.post('/get-phone/:id',getPhone)
 router.post('/get-user',getOneUser)
 router.patch('/update-password',updateForgotPass)
export default router