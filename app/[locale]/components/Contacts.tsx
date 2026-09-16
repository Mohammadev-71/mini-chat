import getContacts from "@/app/actions/getContacts";
import Image from "next/image";
import Settings from "./Settings";
import { getTranslations } from "next-intl/server";
import Contact from "./Contact";

export default async function Contacts(){
    const t = await getTranslations ("home")
    const {user, contacts} = await getContacts()
    
    return(
        <aside className=" h-screen w-full md:w-auto p-4 md:p-8 bg-white/20 dark:bg-black/30 shadow-lg backdrop-blur-md">
            <Settings/>

            <p className="text-xl my-4">{t("user.title")}</p>
            <div className="flex justify-start items-center gap-4 md:gap-8 border-b py-4">
                <div className="relative w-18 h-18 rounded-full overflow-hidden">
                    <Image
                        fill
                        loading="eager"
                        src={user?.image || "/images/defaultProfileImg.jpeg"}
                        alt={user?.name || "User profile image"}
                        className="object-cover"
                        sizes="80px"
                    />
                </div>
                <div>
                    <p>{user?.name}</p>
                    <p>{user?.email}</p>
                    
                </div>
            </div>

            <ul>
                {
                    contacts.map((contact)=>(
                        <Contact key={contact.id} contact={contact}/>
                    ))
                }
            </ul>


        </aside>
    )
}