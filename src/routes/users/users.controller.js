import { StatusCodes } from "http-status-codes";
import { sequelize } from "../../../DBconnection/DBconnection.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

async function register(req, res) {
   let { username, email, password } = req.body;
   try {
      // if missing paramter
      if (notFound(username) || notFound(email) || notFound(password)) {
         return res.status(StatusCodes.NOT_FOUND).json({ "success": false, "message": "Username or email or password not sent" })
      }
      // check if username or email used before 
      let result = await executeQuery(`SELECT user_id FROM users WHERE username = '${username}' OR email = '${email}'`)
      if (result.length) {
         console.log(result)
         return res.status(StatusCodes.NOT_FOUND).json({ "success": false, "message": "Username or email is exits" })
      }
      // insert new user to databse
      let hashPassword = await bcrypt.hash(password, +process.env.Roundbycrpt)
      let user_id = await executeQuery(`INSERT INTO users (username, email, password, phone, registration_date) VALUES ('${username}','${email}','${hashPassword}',NULL,'2023-12-17 23:39:50')`);
      console.log("tokenSignature", process.env.Roundbycrpt)
      const token = jwt.sign({
         "user_id": user_id,
         "username": username,
         "email": email,
      }, process.env.tokenSignature);

      return res.json({
         success: true,
         "token": token,
         "user_id": user_id,
         "username": username,
         "email": email,
         "message": "Registration successful"
      });


   } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
   }
}
async function login(req, res) {
   let { email, password } = req.body;
   try {
      if (notFound(email) || notFound(password)) {
         return res.status(StatusCodes.NOT_FOUND).json({ "success": false, "message": " email or password not sent" })
      }
      let result = await executeQuery(`SELECT user_id ,username,email, password FROM users WHERE email = '${email}'`)
      if (!result.length) {
         console.log(result)
         return res.status(StatusCodes.NOT_FOUND).json({ "success": false, "message": " email is not exits" })
      }
      if (result[0]) {
         let userData = result[0]
         bcrypt.compare(password, userData.password, function (err, result) {
            if (result) {
               const token = jwt.sign({
                  "user_id": userData.user_id,
                  "username": userData.username,
                  "email": userData.email,
               }, process.env.tokenSignature);

               return res.status(StatusCodes.ACCEPTED).json({
                  "success": true,
                  "token": token,
                  "user_id": userData.user_id,
                  "username": userData.username,
                  "email": userData.email,
               })
            } else {
               return res.status(StatusCodes.NOT_ACCEPTABLE).json({ "success": false, "message": "password not right" })
            }
         });
      }
   } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "error", error });
   }
}
async function getAllProducts(req, res) {
   let { page } = req.params

   try {
      if (notFound(page) || isNaN(page)) {
         page = 1
      }
      // let start = ()
      let totalProducts = await executeQuery('SELECT COUNT(product_id) as total FROM products')
      let products = await executeQuery(`
   SELECT p.bigid,p.product_id,p.name,p.price,p.category,p.description,p.media_url AS image,p.stock AS max_stock  FROM products p 
   start ${0}  limit 10
   `)
      console.log(totalProducts)

   } catch (error) {

   }
}

function notFound(param) {
   if (param == "" || param == null || param == undefined) {
      return true;
   }
   return false;
}
async function executeQuery(query) {
   try {
      const [results, metadata] = await sequelize.query(query);
      return results;
   } catch (error) {
      return error
   }
}
export {
   register,
   login,
   getAllProducts
}
