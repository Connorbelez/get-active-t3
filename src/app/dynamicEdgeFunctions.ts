export const runtime = 'edge'
export const preferedRegion = 'us-east-1'
import { UserRole } from "@/server/auth";
// export const fetchCache = 'force-cache'
// import {Event} from "@prisma/client"
import { acceleratedDb} from "@/server/db";
import { user } from "@nextui-org/react";
// import { withAccelerate } from '@prisma/extension-accelerate';


export type getEventAndAttendeeType = {
    paid: boolean;
    event: {
        id: string;
        title: string;
        heroImage: string;
    };
    user: {
        id: string;
        name: string | null;
        image: string | null;
        email: string;
    };
    ticket: {
        name: string;
        price: number;
        payAtDoorTicket: boolean;
        paymentOweing: boolean;
    };
}[]


export async function getPublicEventsMinimal(){
    const events = await acceleratedDb.event.findMany({
        where : {
          //start date is greater than today - 1 day
          startDate: {
            gt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
          },
          archived: false,
            active: true,
        },
        select: {
          id: true,
          title: true,
          headline: true,
          category: true,
          heroImage: true,
          startDate: true,
          startTime: true,
          ticketStartingPrice: true,
          location: true,
          address: false,
          eventDescription: false,
          length: false,
          capacity: false,
          postalCode: false,
          city: false,
          province: false,
          country: false,
          latlng: false,
          createdById: true,
          createdByEmail: true,
          private: false,
          drinksIncluded: false,
          foodIncluded: false,
          adultOnly: false,
          orgId: false,
          lat: false,
          lng: false,
        },
        cacheStrategy: { ttl: 60 },
      });
      return events;
}

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


export interface TicketSaleData{
    events: {
        id: string;
        title: string;
        category: string | null;
        heroImage: string;
        createdById: string | null;
        createdByEmail: string;
    },
    ticketSales:({
        user: {
            id: string;
            name: string | null;
            image: string | null;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        eventId: string;
        ticketId: string;
        stripeTransactionId: string | null;
        quantity: number;
        price: number;
        paid: boolean;
    })[];
}[]


export async function getEventsAndAttendees(){
    const data = await acceleratedDb.fulfilledTicket.findMany({
        select:{
            paid:true,
            user:{
                select:{
                    id:true,
                    name:true,
                    image:true,
                    email:true,
                }
            },
            ticket:{
                select:{
                    name:true,
                    price:true,
                    payAtDoorTicket:true,
                    paymentOweing:true,
                }
            },
            event:{
                select:{
                    id:true,
                    title:true,
                    heroImage:true
                }
            }
        }
    })
    return data as getEventAndAttendeeType
}

export async function getAttendeesByEventId(id:string) {
    const attendees = await acceleratedDb.fulfilledTicket.findMany({
        where: {
            eventId: id,
        },
        select:{   
            user:{
                select:{
                    name: true,
                    image: true,
                    email: true,
                    role:false,
                    emailVerified:false,
                    id:false,
                    adminFor:false,
                    adminForOrgId:false,
                }
            },
            ticket: {
                select: {
                    name: true,
                    price: true,
                    payAtDoorTicket: true,
                    paymentOweing: true,
                }
            }
        },
    });

    return attendees;
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

