export const runtime = 'edge'
export const preferedRegion = 'us-east-1'
// export const fetchCache = 'force-cache'
// import {Event} from "@prisma/client"
import { acceleratedDb} from "@/server/db";
// import { withAccelerate } from '@prisma/extension-accelerate';
export async function getEventAttendeePreview(id:string) {
        const countConfirmed = acceleratedDb.fulfilledTicket.count({
            where: {
                eventId:id,
            },
        });
        const countRsvpd = acceleratedDb.savedEvent.count({
            where: {
                eventId: id,
            },
        });

    const firstTenConfirmed = acceleratedDb.fulfilledTicket.findMany({
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
    const firstTenRsvpd = acceleratedDb.savedEvent.findMany({
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

    const [countConfirmedResult, countRsvpdResult, firstTenConfirmedResult, firstTenRsvpdResult] = await acceleratedDb.$transaction([countConfirmed, countRsvpd, firstTenConfirmed, firstTenRsvpd]);

    return {
        countConfirmed: countConfirmedResult,
        countRsvpd: countRsvpdResult,
        firstTenConfirmed: firstTenConfirmedResult,
        firstTenRsvpd: firstTenRsvpdResult
    };
}

export async function getFeaturedEvent() {


  const event = await acceleratedDb.featuredEvent.findFirst({
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
    },
    cacheStrategy: { ttl: 60 },
  })

    if(!event){
        return await acceleratedDb.event.findFirst({
            include:{
                ticketTypes: true,
            },
            cacheStrategy: { ttl: 60 },
        })   
    }

    return event.event
}

