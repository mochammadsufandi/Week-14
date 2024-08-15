import { errorHandler } from "@/lib/errorHandler";
import { verifyToken } from "@/lib/jwtToken";
import { NextResponse } from "next/server"

export const GET = async(req,{params}) => {
    try {
        const cookies = req.cookies.get("Access Token");
        const accessToken = cookies.value;
        const user = verifyToken(accessToken);

        return NextResponse.json({message : "Masukk", data : user},{status : 200});

    } catch (err) {
        console.log(err);
        const errHandler = errorHandler(err);
        return NextResponse.json({message : errHandler.message}, {status : errHandler.status});
    }
}