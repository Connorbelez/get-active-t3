"use client"
import { FC } from 'react'
import {Avatar} from "@nextui-org/avatar";
import {useSession} from "next-auth/react";

// interface pageProps {

// }

const App: FC = () => {

    const {data:session} = useSession();
    const image = session?.user?.image
    const name = session?.user?.name
    const email = session?.user?.email

    // console.log("IMAGE: ", image)
    return (
        <div className={'relative group'}>



                <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>


            <Avatar
                className={"h-32 w-32 "}
                //@ts-ignore
                src={image || undefined}
            >

            </Avatar>

        </div>


    )
}

export default App