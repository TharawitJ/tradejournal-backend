import { RequestHandler } from "express";
import { getAsset } from "../services/asset.service";

export const getAllAsset:RequestHandler = async (req,res,next) =>{
    const data = await getAsset()
    console.log(data)
    if(!data) {
        return res.json({message:"No asset in database"})
    }
    res.json({data})
}