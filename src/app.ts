import express from 'express'
import authRouter from "./routes/auth.route"
import userRouter from "./routes/user.route"
import journalRouter from "./routes/journal.route"
// import postRouter from "./routes/post.route.js"
// import {errorMiddleWare} from "./middlewares/error.middleware.js"
// import {notFoundError} from "./middlewares/notFound.middleware.js"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/",authRouter)
app.use("/user",userRouter)
app.use("/journal",journalRouter)


// app.use(errorMiddleWare)

// app.use(notFoundError)

export default app