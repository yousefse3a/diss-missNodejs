import 'dotenv/config'
import express from "express"
import cors from "cors"
import path from "path"
import userRouter from "./routes/users/users.router.js";
// import launchRouter from "./routes/products/products.router.js";
// import { getDirName } from "../libs/utils.js";
import { connectDB } from "../DBconnection/DBconnection.js";
connectDB();

const app = express();
app.use(express.json())
app.use(cors())
// app.use(morgan("combined"))
// app.use(express.static(path.join(getDirName(import.meta.url), "..", "public")))
app.use(userRouter)
// app.use('/launches', launchRouter)
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(getDirName(import.meta.url), "..", "public", "index.html"))
// })

export default app;






