'use server'

import { auth } from "@/src/lib/auth"
import { signinValidationSchema } from "@/src/lib/utils/validations"
import { isAPIError } from "better-auth/api"





export default async function signinAction(prevState:any, formData:FormData){
    const email = formData.get("email")
    const password = formData.get("password")


    const validationResult = await signinValidationSchema.safeParse({
        email:email,
        password:password,
    })

    if(!validationResult.success){
        return({
            errors:validationResult.error?.issues,
            values: {email, password}
        })
    }


    try {
        await auth.api.signInEmail({
            body:{
                email:email as string,
                password:password as string,
                callbackURL:"/"
            }
        })


        return({
            
            success:true,
            message:"User signin successfully"
        })
        
        
    } catch (error) {
        if(isAPIError(error)){
            console.log({apiErrors:error})
            return({
                status:false,
                message:error?.body?.message
            })
        }
    }
}