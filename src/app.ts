import express from 'express'
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import journalRouter from "./routes/journal.route"
import dashboardRouter from "./routes/dashboard.route"
import fundhistoryRouter from "./routes/fundhistory.route"
import assetRouter from "./routes/asset.route"
import userModel from "./routes/entrymodel.route"
import {errorMiddleWare} from "./middlewares/error.middleware.js"
// import {notFoundError} from "./middlewares/notFound.middleware.js"
import cors from "cors"


const app = express()
app.use(express.json())

app.use(cors({
  origin: ["http://localhost:5173"], // allowed origins
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true, // allow cookies if needed
}))


app.use("/",authRouter)
app.use("/user",userRouter)
app.use("/usermodel",userModel)
app.use("/journal",journalRouter)
app.use("/dashboard",dashboardRouter)
app.use("/fundhistory",fundhistoryRouter)
app.use("/asset",assetRouter)

app.use(errorMiddleWare)

// app.use(notFoundError)

export default app