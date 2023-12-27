
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerAuthSession } from "@/server/auth"



export default async function middleware(req: NextRequest) {
        // const session = await getServerAuthSession();
        console.log("\n\nMIDDLEWARE\n\n")
        // console.table({session})
}


export const config = {matcher:["/blog"]}