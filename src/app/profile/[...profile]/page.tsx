import { FC } from 'react'
// import ProfileAvatar from "@/app/profile/[...profile]/components/ProfileAvatar";
// import {CardBody, Card, CardHeader, CardFooter} from "@nextui-org/card";
import ProfileCard from "@/app/profile/[...profile]/components/ProfileCard";
import EventTabs from "./components/EventTabs"
// import {
//     getSavedEventDetailsFromUserEmail,
//     getSavedEventsFromUserEmail,
//     getTicketsAndMatchingEventForUserByEmail,
//     getTicketsForUserByEmail, NewTicket
// } from "@/lib/planetscale";
import { getServerSession } from "next-auth/next"
// import {authOptions} from "@/config/authOptions";
import { redirect } from "next/navigation";
import { getServerAuthSession } from '@/server/auth';
// interface pageProps {

// }

const App: FC = async () => {
    const session = await getServerAuthSession();
    const email = session?.user?.email
    console.log("EMAIL : ", email)


    if(!session || !session?.user?.email){
        //redirect user to login page
        redirect("/api/auth/signin")
    }

    // //@ts-ignore
    // const tickets = await getTicketsForUserByEmail(email);
    //     //@ts-ignore
    // const ticketsAndMatchingEvent = await getTicketsAndMatchingEventForUserByEmail(email);
    //     //@ts-ignore
    // const savedEvents = await getSavedEventsFromUserEmail(email);
    //     //@ts-ignore
    // const savedEventsWithEventDetails = await getSavedEventDetailsFromUserEmail(email);
    // console.table(ticketsAndMatchingEvent)
    // console.log("\n\n===========================TICKETS AND MATCHING EVENTS : ", ticketsAndMatchingEvent)
    // console.log("\n\n===========================saved Events : ", savedEvents)
    // console.log("\n\n===========================saved Events with event details : ", savedEventsWithEventDetails);
    // //ToDo: error handling with invalid JSON

    // try {
    //     console.log("TICKETS Server : ", JSON.parse(JSON.stringify(tickets)));
    // } catch (e) {
    //     console.log("TICKETS Server : ", tickets);
    //     console.log("TICKETS Server ERROR : ", e);
    // }
    // console.log("TICKETS Server : ", JSON.parse(JSON.stringify(savedEvents)));
    //
    // const savedEventsArray = JSON.parse(JSON.stringify(savedEvents))
    // const t : NewTicket[] = JSON.parse(JSON.stringify(tickets))


    return (
        <div id={"profile container"} className={" w-full sm:grid flex-row sm:grid-rows-1 sm:grid-cols-3"}>

            <div className={"flex justify-items-center sm:justify-items-start   row-start-1 row-span-1 sm:row-span-3 sm:col-span-1 sm:col-start-1"}>

                <ProfileCard/>

            </div>


            <div className={" rounded-2xl sm:row-start-1 sm:col-span-2 w-full sm:col-start-2 "}>
                <EventTabs tickets={undefined} savedEvents={undefined}></EventTabs>
            </div>
        </div>
    )
}

export default App