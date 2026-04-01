import express from "express"
import { getAllAsset } from "../controllers/asset.controller"

const router = express.Router()

router.get("/",getAllAsset)

export default router