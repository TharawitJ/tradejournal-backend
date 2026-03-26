import express from 'express'
import {getUserJournal,recordTheJournal,editTheJournal,deleteTheJournal} from "../controllers/journal.controller"
import { authenticate } from '../middlewares/auth.middleware'

const router = express.Router()

router.get("/",authenticate,getUserJournal)
router.post("/",authenticate,recordTheJournal)
router.patch("/:recordId",authenticate,editTheJournal)
router.delete("/:recordId",authenticate,deleteTheJournal)

 export default router