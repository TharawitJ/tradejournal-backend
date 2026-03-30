import express from "express";
import {getUserModel,addNewModel, deleteModel} from "../controllers/entrymodel.controller";
import { authenticate } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/',authenticate,getUserModel)
router.post('/',authenticate,addNewModel)
router.delete('/:id',authenticate,deleteModel)

export default router