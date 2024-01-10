
import {api} from "@/trpc/server"
import UserTable from "./components/UserTable"
interface compProps {
    
}

export default async function Comp({
    
}: compProps) {
    const users = await api.member.getAll.query();

    return (
        <section className={"w-full flex flex-col items-center my-16 px-4"}>
            <UserTable users={users}/>
        </section>
    )
}