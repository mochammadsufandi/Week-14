import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { errorHandler } from "@/lib/errorHandler";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwtToken";
import { cookies } from "next/headers";


export const POST = async (req, {params}) => {
    try {
        const {email,password} = await req.json();
        const loginUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        });
        if(!loginUser) throw({name : 'Invalid Email'})
        const checkPassword = comparePassword(password,loginUser.password);

        if(!checkPassword) {
            if(password !== loginUser.password) throw({name : 'Invalid Password'})}
            
        const token = generateToken(loginUser.email);
        
        cookies().set({
            name : "Access Token",
            value : token,
            maxAge : 60 * 60 * 2,
        })

        return NextResponse.json({
            message : 'Berhasil Login',
            token
        });

    } catch(err) {
        console.log(err);
        const errorMessage = errorHandler(err);
        return NextResponse.json({error : errorMessage.message},{status:errorMessage.status});
    }
}