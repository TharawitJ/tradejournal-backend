import express from 'express'

const router = express.Router()

router.get("/",(req,res,next)=>(
    console.log(req.body),
    res.send(req.body)))
// router.post("/record",)
// router.patch("/edit",)
// router.delete("/",)

 export default router