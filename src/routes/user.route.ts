import express from "express";
import {getMe,patchMe,deleteMe} from "../controllers/user.controller";
import {authenticate} from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/profile',authenticate,getMe)
router.patch('/profile',authenticate,patchMe)
router.delete('/profile',authenticate,deleteMe)


export default router