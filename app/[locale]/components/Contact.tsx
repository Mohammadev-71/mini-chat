"use client";

import getOrCreateChat from "@/app/actions/getOrCreateChat";
import Image from "next/image";
type contactData = {
    id:string;
    name: string;
    email: string;
    image: string | null;
    createdAt: Date; 
    updatedAt: Date;
    emailVerified: boolean;
};

export default function Contact({ contact }: { contact: contactData }) {
    
    return (
        <div
            onClick={()=>{getOrCreateChat({otherId:contact?.id})}}

            key={contact?.id}
            className="my-4 flex justify-start items-center gap-4 hover:bg-indigo-600 rounded-lg py-4 px-1"
        >
            <div className="relative w-18 h-18 rounded-full overflow-hidden">
                <Image
                    fill
                    src={contact?.image || "/images/defaultProfileImg.jpeg"}
                    alt={contact?.name || "User profile image"}
                    className="object-cover pointer-event-none"
                    sizes="80px"
                />
            </div>
            <div>
                <p className="pointer-event-none">{contact?.name}</p>
                <p className="pointer-event-none">{contact?.email}</p>
            </div>
        </div>
    );
}
