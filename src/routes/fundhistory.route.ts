import express from "express";
import {getUserFundHistory} from "../controllers/fund.controller";
import { authenticate } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/:id',authenticate,getUserFundHistory)

export default router