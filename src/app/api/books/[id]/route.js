import { errorHandler } from "@/lib/errorHandler";
import imageURL from "@/lib/imageURL";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/uploadImage";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const unlinkAsync = promisify(fs.unlink);

export const GET = async (req,{params}) => {
    try {
        const response = await prisma.book.findUnique(
            {where : {
                id : parseInt(params.id)
            }}
        )
        return NextResponse.json({data:response}, {status:200});
    } catch(err) {
        console.log(err);
        const errHandler = errorHandler(err);
        return NextResponse.json({message : errHandler.message}, {status : errHandler.status});
    }
}

export const PUT = async (req,{params}) => {
    try {
        const {id} = params;
        const file = await req.formData();
        const formData = {};
        file.forEach((value, key) => {
            formData[key] = value;
        });

        const allowedExt = ['image/png','image/jpg','image/jpeg','image/webp', 'image/svg'];

        const existingBook = await prisma.book.findUnique({
            where : {
                id : +id
            }
        })

        const image = formData.image !== 'undefined' ? formData.image : null;

        if(!existingBook) throw({name : 'Not Found'})
        
        console.log(typeof(image));

        if(image) {
            if(allowedExt.includes(image.type)) {
                const imagePath = await uploadImage(image, '/images');
                const imageLink = `${imageURL}${imagePath}`;
                const book = await prisma.book.update({
                    where : {
                        id : +id
                    },
                    data : {
                        title : formData.title ? formData.title : existingBook.title,
                        author : formData.author ? formData.author : existingBook.author,
                        publisher : formData.publisher ? formData.publisher : existingBook.publisher,
                        year : formData.year ? +formData.year : existingBook.year,
                        pages : formData.pages ? +formData.pages : existingBook.pages,
                        image : imageLink
                    }
                })
                const arrayLink = existingBook.image.split('/');
                console.log(arrayLink);
                const internalImageLink = `public/${arrayLink[3]}/${arrayLink[4]}` 

                await unlinkAsync(internalImageLink);
                return NextResponse.json({message : 'MASOOKKK'});

            } else {
                throw({name : 'Invalid Extension'})
            }

        } else {
            const book = await prisma.book.update({
                where : {
                    id : +id
                },
                data : {
                    title : formData.title ? formData.title : existingBook.title,
                    author : formData.author ? formData.author : existingBook.author,
                    publisher : formData.publisher ? formData.publisher : existingBook.publisher,
                    year : formData.year ? +formData.year : existingBook.year,
                    pages : formData.pages ? +formData.pages : existingBook.pages,
                    image : existingBook.image
                }
            })
            return NextResponse.json({message : 'MASOOKKK'}, {status : 200});
        }

    } catch (err) {
        console.log(err);
        const errHandler = errorHandler(err);
        return NextResponse.json({error : errHandler.message}, {status:errHandler.status});
    }
}

export const DELETE = async(req,{params}) => {
    try {
        const existingBook = await prisma.book.findUnique({
            where : {
                id : +params.id
            }
        })

        if(!existingBook) throw({name : 'Not Found'})

        const book = await prisma.book.delete({
            where : {
                id : +params.id
            }
        })
        return NextResponse.json({message : 'MASUKKK'}, {status : 200});

    } catch (err) {
        console.log(err);
        const errHandler = errorHandler(err);
        return NextResponse.json({error : errHandler.message}, {status : errHandler.status});
    }

}