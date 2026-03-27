import express from 'express'
import {getPnL,getWinRate,getAverageRR} from "../controllers/dashboard.controller"
import { authenticate } from '../middlewares/auth.middleware'

const router = express.Router()
// PnL
router.get("/pnl",authenticate,getPnL)
// Avg
router.get("/winrate",authenticate,getWinRate)
router.get("/riskreward",authenticate,getAverageRR)
// router.delete("/:recordId",authenticate,deleteTheJournal)

 export default router