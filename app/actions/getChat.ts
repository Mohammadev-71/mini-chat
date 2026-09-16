import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";





export default async function getChat({chatId}:{chatId:string}){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const userId = session?.user.id

    try {

        const chat = await prisma.chat.findUnique({
            where:{id:chatId},
            include:{
                messages:true,
                user1:true,
                user2:true
            }
        })

        if(!chat){
            return({
                status:false,
                message:"chat not found"
            })
        }

        return({
            status:true,
            chat:chat,
            userId:userId
        })
    } catch (error) {
        console.log(error)

        return({
            status:false,
            message:"something went wrong"
        })
    }
}