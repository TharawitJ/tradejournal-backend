import express from 'express'
import userRouter from "./routes/user.route"
// import postRouter from "./routes/post.route.js"
// import {errorMiddleWare} from "./middlewares/error.middleware.js"
// import {notFoundError} from "./middlewares/notFound.middleware.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/",userRouter)
// app.use("/post",postRouter)


// app.use(errorMiddleWare)

// app.use(notFoundError)

export default app