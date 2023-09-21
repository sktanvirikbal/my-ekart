import express from "express";

const router=express.Router();
// import products from '../data/products.js';
// import asyncHandler from "../middleware/asyncHandler.js";
// import Product from "../models/productModel.js";
//instead of previous 2 imports we bring in our controller functions
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
    } from "../controllers/userController.js";

import {protect,admin} from '../middleware/authMiddleware.js';

router.route('/').post(registerUser).get(protect,admin,getUsers);
// router.get('/',getProducts);
router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);


export default router;
