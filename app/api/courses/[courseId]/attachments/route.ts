import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
    {params} : {params: {courseId: string}}
){
    try {

         const {userId} = auth();
         const {url} = await req.json();

         if(!userId){
            return new NextResponse("Unauthorized", {status: 401});
         }

         const courseOwner = await db.course.findUnique({
            where:{
                id: params.courseId,
                userId: userId,
            }
         });


         const attachment = await db.attachement.create({
            data:{
                url,
                name: url.split("/").pop(),
                courseId: params.courseId,
            }
         });

         return NextResponse.json(attachment);

         if(!courseOwner){
            return new NextResponse("Unauthorized",{status:401});
         }
        
    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS", error);
        return new NextResponse("Internal Error", {status:500})
    }
}