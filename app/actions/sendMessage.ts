'use server'


import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { headers } from "next/headers";




export default async function sendMessage(chatId:string, formData:FormData){

    const content = formData.get("content")

    const session = await auth.api.getSession({
        headers: await headers()
    }) 

    const senderId = session?.user.id
    if(!senderId){
        return({
            status:false,
            message:"Login to continue"
        })
    }
    try {
        const sentMessage = await prisma.message.create({
            data:{
                senderId:senderId,
                content:content as string   ,
                chatId:chatId
            }
        })
        

        if(!sentMessage){
            return({
                status:false,
                message:"Error while sending message"
            })
        }

        return({
            status:true,
            message:"message sent successfully"
        })
        
    } catch (error) {
        console.log(error)

        return({
            status:false,
            message:"error while sending message"
        })
    }
    
}