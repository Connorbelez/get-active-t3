"use client"
import { FC } from 'react'
import {Card, CardBody, CardHeader} from "@nextui-org/react";
import ProfileAvatar from "@/app/profile/[...profile]/components/ProfileAvatar";
import {Avatar} from "@nextui-org/react";
import {useSession} from "next-auth/react";

// interface pageProps {

// }

const App: FC = () => {
    const {data:session} = useSession();
    const image = session?.user?.image
    const name = session?.user?.name
    const email = session?.user?.email
    //@ts-ignore
    const role = session?.user?.role;

    console.log("ROLE : ", role)
    return (
        <Card
            className={"flex w-full h-fit p-4 m-4 justify-items-center border border-indigo-500 sm:justify-items-start"}
            shadow="lg"
        >
            <CardHeader className={"justify-items-center justify-center sm:justify-items-start"}>
                <div className={'relative group'}>
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <Avatar
                        className={"h-32 w-32 "}
                        //@ts-ignore
                        src={image || undefined}
                    >
                    </Avatar>
                </div>
            </CardHeader>
            <CardBody>
                <h1 className={"text-center"}>{name}</h1>
                <h1 className={"text-center"}>{email}</h1>
                <h1 className={"text-center"}>{role}</h1>
            </CardBody>
        </Card>
    )
}

export default App