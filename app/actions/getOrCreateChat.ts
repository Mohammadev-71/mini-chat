'use server'

import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";


export default async function getOrCreateChat ({otherId}:{otherId:string}){


    const session = await auth.api.getSession({
        headers: await headers()
    })

    const currentUserId = session?.user?.id

    if (currentUserId === otherId) {
        return({
            success:false,
            message:"You can't chat with your self"
        })
    }

    const otherUser = await prisma.user.findUnique({
        where:{id:otherId},
        select:{id:true}
    })

    if(!otherUser){
        return({
            success:false,
            message:"User not found"
        })
    }


    if (!currentUserId) {
        return {
            success: false,
            message: "Unauthorized",
        };
    }

    
    const ids: [string, string] = [
        currentUserId,
        otherId,
    ];

    ids.sort();

    const [user1Id, user2Id] = ids;

    const chat = await prisma.chat.upsert({
        where: {
            user1Id_user2Id: {
                user1Id,
                user2Id,
            },
        },
        update:{},

        create: {
            user1Id,
            user2Id,
        },
    })


    redirect(`/chat/${chat.id}`)

}
