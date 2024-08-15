import { errorHandler } from "@/lib/errorHandler";
import { verifyToken } from "@/lib/jwtToken";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) => {
    try {
        const {token} = params;
        const user = verifyToken(token);
        const existingUser = await prisma.user.findUnique({
            where : {
                email : user
            }
        })
    
        return NextResponse.json({message : 'MASUKK', data : existingUser }, {status:200});
        
    } catch (err) {
        console.log(err);
        const errHandler = errorHandler(err);
        return NextResponse.json({error : errHandler.message},{status:errHandler.status});
    }

}