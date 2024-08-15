import imageURL from "@/lib/imageURL";
import { uploadImage } from "@/lib/uploadImage";
import { errorHandler } from "@/lib/errorHandler";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async(req,{params}) => {
    try{
        const file = await req.formData();
        const formData = {};
        file.forEach((value, key) => {
            formData[key] = value;
        });
        const {title, author, publisher, year, pages} = formData;
        const image = formData.image !== 'undefined' ? formData.image : null;
        const allowedExt = ['image/png','image/jpg','image/jpeg','image/webp', 'image/svg'];
        
        if(image) {
            if(allowedExt.includes(image.type)) {
                const imagePath = await uploadImage(image,'/images');
                const imageLink = `${imageURL}${imagePath}`;
                const book = await prisma.book.create({
                    data : {
                        title,author,publisher,
                        year : +year,
                        pages : +pages,
                        image : imageLink
                    }
                })
                return NextResponse.json({message : 'Masukk', data : book}, {status : 200});
            } else {
                throw({name : 'Invalid Extension'});
            }
        } else {
            const imageLink = `${imageURL}/images/no-image.jpg`;
            const book = await prisma.book.create({
                data : {
                    title,author,publisher,
                    year : +year,
                    pages : +pages,
                    image : imageLink
                }
            })
            return NextResponse.json({message : 'Masukk', data : book}, {status : 200});
        }
        
        
    } catch(err) {
        console.log(err);
        const errHandler = errorHandler(err)
        return NextResponse.json({error : errHandler.message},{status:errHandler.status});
    }
}