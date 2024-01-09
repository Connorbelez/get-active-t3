import {z} from 'zod';



export const ticketTypeSchema = z.object({
    name: z.string().min(1),
    price: z.number(),
    // paymentOweing: z.boolean(),
    // eventId: z.string().min(1),
    ticketDescription: z.object({
        description: z.string(),
    }),
    drinksIncluded: z.boolean().default(false),
    foodIncluded: z.boolean().default(false),
    paymentTypes: z.string(),
    logo: z.string().default("https://res.cloudinary.com/dtqevfsxh/image/upload/v1627667959/placeholder-image_zqjz3c.png"),    
})

export const eventSchema = z.object({
    // name: z.string().min(1),
    title: z.string().min(1),
    address: z.string().min(1),
    headline: z.string().optional(),
    category: z.string().optional(),
    heroImage: z.string().min(1),
    startDate: z.string(),
    startTime: z.string(),
    ticketStartingPrice: z.number(),
    location: z.string().min(1),
    postalCode: z.string().min(1).default("KOJ"),
    city: z.string().min(1).default("Ottawa"),
    province: z.string().min(1).default("Ontario"),
    country: z.string().min(1).default("CA"),
    eventDescription: z.string(),
    length: z.number(),
    capacity: z.number().optional(),
    createdById: z.string().min(1),
    createdByEmail: z.string().min(1),
    private: z.boolean().optional(),
    drinksIncluded: z.boolean().optional(),
    foodIncluded: z.boolean().optional(),
    createdByOrg: z.string().optional(),
    ticketTypes: z.array(ticketTypeSchema),
    adultOnly: z.boolean().optional(),
    // Add more fields as needed
  })


  