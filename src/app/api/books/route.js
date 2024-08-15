import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"

export const GET = async(req,{params}) => {
    try {
        const response = await prisma.book.findMany({
          skip : 0,
          take : 20
        });
        
        for(let i = 0; i<response.length-1; i++) {
          for(let j = i+1; j<response.length; j++) {
            if(response[i].id > response[j].id ) {
              const x = response[i];
              response[i] = response[j];
              response[j] = x;
            }
          }
        }
        return NextResponse.json({data : response},{status:200});
    } catch(err) {
        console.log(err);
    }
}