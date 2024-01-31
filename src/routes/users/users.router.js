import express from "express";
import { getAllProducts, login, register,getProductDetails } from "./users.controller.js";

const userRouter = express.Router();
userRouter.post('/register', register);
userRouter.post('/login', login);
// userRouter.post('/add-to-cart', httpGetAllPlanets);
// userRouter.post('/view-cart', httpGetAllPlanets);
// userRouter.post('/delete-cart-item', httpGetAllPlanets);
// userRouter.post('/update-cart', httpGetAllPlanets);
// userRouter.post('/checkout', httpGetAllPlanets);
userRouter.get('/products/:page', getAllProducts);
userRouter.get('/detailsproduct/:bigid', getProductDetails);
// userRouter.get('/product-details', httpGetAllPlanets);
// userRouter.get('/submit-review', httpGetAllPlanets);
// userRouter.get('/fetch-profile', getProfile);
// userRouter.get('/new-address', httpGetAllPlanets);
// userRouter.get('/edit_address', httpGetAllPlanets);

export default userRouter