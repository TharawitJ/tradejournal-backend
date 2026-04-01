import {prisma} from "../libs/prisma"

export const getAsset = async () =>{
    const data = await prisma.asset.findMany();
    return data
} 