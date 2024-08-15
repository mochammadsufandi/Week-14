import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import { errorHandler } from "@/lib/errorHandler";
import { NextResponse } from "next/server"

export const POST = async(req,{params}) => {
    try{
        const {name,email,password} = await req.json();

        if(!name || !email || !password) throw({name : 'Invalid Input'});
        const existingUser = await prisma.user.findUnique({
            where : {
                email : email
            }
        });
        
        if(existingUser) throw({name : 'Already Exist'});
        const hashedPassword = hashPassword(password);
        const userRegister = await prisma.user.create({
            data : {
                name : name,
                email : email,
                password : hashedPassword
            }
        });
        return NextResponse.json({message : 'Berhasil Daftar'}, {status:201});

    } catch(err) {
        console.log(err)
        const errHandler = errorHandler(err);
        return NextResponse.json({error : errHandler.message}, {status:errHandler.status});

    }
}