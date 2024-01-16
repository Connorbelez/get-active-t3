export const runtime = 'edge'
export const preferedRegion = 'us-east-1'
export const fetchCache = 'force-cache'
import {Event} from "@prisma/client"
import { db } from "@/server/db";

export async function getEventAttendeePreview(id:string) {
        const countConfirmed = db.fulfilledTicket.count({
            where: {
                eventId:id,
            },
        });
        const countRsvpd = db.savedEvent.count({
            where: {
                eventId: id,
            },
        });

    const firstTenConfirmed = db.fulfilledTicket.findMany({
        where: {
            eventId: id,
        },
        select:{   
            user:{
                select:{
                    name: true,
                    image: true,
                    email:false,
                    role:false,
                    emailVerified:false,
                    id:false,
                    adminFor:false,
                    adminForOrgId:false,
                }
            },
        },
        take: 10,
    });
    const firstTenRsvpd = db.savedEvent.findMany({
        where: {
            eventId: id,
        },
        select:{   
            user:{
                select:{
                    name: true,
                    image: true,
                    email:false,
                    role:false,
                    emailVerified:false,
                    id:false,
                    adminFor:false,
                    adminForOrgId:false,
                }
            },
        },
        take: 10,
    });

    const [countConfirmedResult, countRsvpdResult, firstTenConfirmedResult, firstTenRsvpdResult] = await db.$transaction([countConfirmed, countRsvpd, firstTenConfirmed, firstTenRsvpd]);

    return {
        countConfirmed: countConfirmedResult,
        countRsvpd: countRsvpdResult,
        firstTenConfirmed: firstTenConfirmedResult,
        firstTenRsvpd: firstTenRsvpdResult
    };
}

export async function getFeaturedEvent() {

  const event = await db.featuredEvent.findFirst({
    include:{
        event:{
            include:{
                ticketTypes: true,
            }
        },
        
    },
    where : {
        event :{
            active : true,
            archived : false
        }
    }
  })

    if(!event){
        return await db.event.findFirst({
            include:{
                ticketTypes: true,
            }
        })   
    }

    return event.event
}

