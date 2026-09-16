'use server'


import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";





export default async function getContacts(){
    const session = await auth.api.getSession({
        headers:await headers()
    })
    
    
    const userData = session?.user


    if(!session && !userData){
        redirect("/signin")
    }




    const contacts = await prisma.user.findMany({
        where:{id:{not:userData?.id}}
    })

    return ({
        user:userData,
        contacts:contacts
    })
}