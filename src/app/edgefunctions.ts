export const runtime = 'edge'
export const preferedRegion = 'us-east-1'
export const fetchCache = 'force-cache'

import { acceleratedDb } from "@/server/db";
export async function getEvent(id:string) {

  const event = await acceleratedDb.event.findUnique({
    where: { id: id },
    include:{
        ticketTypes: true
    }
  })

    return event

}

