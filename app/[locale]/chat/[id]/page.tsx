import getChat from "@/app/actions/getChat";
import Contacts from "../../components/Contacts";
import SendMessage from "../../components/SendMessage";
import Image from "next/image";

export default async function Chat({ params }: { params: Promise<{ id: string }> }){
    
    const { id } = await params;

    const chat = await getChat({chatId:id}) || [];
    const receiver = chat.chat?.user1Id === chat.userId? chat.chat?.user2:chat.chat?.user1
    


    return( 
        <main className="w-screen min-h-screen h-auto relative flex justify-start items-end overflow-hidden bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-900">
            <div className="hidden md:block ">
                <Contacts />
            </div>
            
            <div className="relative flex flex-col w-full h-screen max-h-screen p-2 justify-between pt-30">
                <div
                    className=" flex justify-start items-center gap-4 hover:bg-indigo-600  py-4 px-1 border-b absolute top-0 inset-x-0 z-4 bg-indigo-800"
                >
                <div className="relative w-18 h-18 rounded-full overflow-hidden">
                    <Image
                        loading="eager"
                        fill
                        src={receiver?.image || "/images/defaultProfileImg.jpeg"}
                        alt={receiver?.name || "User profile image"}
                        className="object-cover"
                        sizes="80px"
                    />
                </div>
                <div>
                    <p>{receiver?.name}</p>
                    <p>{receiver?.email}</p>
                </div>
                </div>

                <SendMessage chat={chat}/>
            </div>
            
        </main>
    )
}


