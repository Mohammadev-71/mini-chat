'use server'

import cloudinary from "@/src/lib/cloudinary"
import { auth } from "@/src/lib/auth"
import { signupValidationSchema } from "@/src/lib/utils/validations";
import { isAPIError } from "better-auth/api";
import sharp from "sharp";


export async function signupAction(prevState: any, formData: FormData){

    const img = formData.get("img")
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");


    const validationResult = await signupValidationSchema.safeParse({
        img:img,
        name:name,
        email:email,
        password:password
    })

    if(!validationResult.success){
        return({
            errors:validationResult.error?.issues,
            values: { name, email, password,img}
        })
    }

    

    let uploadedPublicUrl = ""
    let uploadedPublicId = ""

    try {

        if (!(img instanceof File)) {
        return {
            success: false,
            message: "Please select a valid image",
        };
        }
        
        if(img){

            
            const bytes = await img.arrayBuffer();


            const buffer = Buffer.from(bytes);

            const outputBuffer =  await sharp(buffer).webp({quality:80}).toBuffer()


            const uploadedImg = await new Promise<{
                secure_url:string;
                public_id:string
            }>((resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream({
                    folder:"mini-chat/profiles",
                    resource_type:"image",
                },(error,result)=>{
                    if(error|| !result){
                        reject(error ?? new Error("Img Upload failed "))
                        return
                    }

                    resolve({
                        secure_url:result.secure_url,
                        public_id:result.public_id
                    })
                })

                uploadStream.end(outputBuffer)
            })

            uploadedPublicUrl = uploadedImg.secure_url;
            uploadedPublicId = uploadedImg.public_id
        }


        await auth.api.signUpEmail({
            body:{
                image:uploadedPublicUrl,
                name:name as string,
                email:email as string,
                password:password as string,
                
            }
        })


        return({
            success:true,
            message:"User created successfully"
        })
        
    } catch (error) {
        if(uploadedPublicId){
            try {
                await cloudinary.uploader.destroy(uploadedPublicId)
                console.log("Img deleted successfully")
            } catch (error) {
                console.error("Failed to delete unused image:", error);
            }
        }

        if(isAPIError(error)){
            if(error.status==="UNPROCESSABLE_ENTITY"){
                return({
                    success:false,
                    message:"this email is already registered"
                })
            }

            return {
                success: false,
                message: error.message || "Could not create the account",
            };
        }

        console.error("Signup error:", error);

        return {
        success: false,
        message: "Something went wrong. Please try again",
        };
    }
    

}