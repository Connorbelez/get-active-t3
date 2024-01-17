import { z } from "zod";
import nodemailer from "nodemailer";
import {render} from "jsx-email"   
import qrcode from 'qrcode';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {env as envVar} from "@/env";
import { EventTicketEmail } from "@/emails/SendTicketEmail";
const sharp = require('sharp');
const Stripe = require('stripe');

async function overlayLogoOnImage(logoPath : string,dataURL:string) {
  const logoSize = 100; // Size of the logo in pixels
  const borderRadius = 10; // Border radius for rounded edges

  // Create a white background with rounded edges
  const background = Buffer.from(
    `<svg><rect x="0" y="0" width="${logoSize + 3}" height="${logoSize + 3}" rx="${borderRadius}" ry="${borderRadius}" fill="#ffffff"/></svg>`
  );
  const imageBuffer = await generateQRCodeWithLogo(dataURL);
  // Load the logo image and composite it onto the white background
  const logo = sharp(logoPath).resize(logoSize, logoSize);
  const compositeImage = await sharp(background)
    .composite([{ input: await logo.toBuffer(), gravity: 'centre' }])
    .toBuffer();

  // Composite the logo onto the image buffer
return await sharp(imageBuffer)
        .composite([{input: compositeImage, gravity: 'centre'}])
        .toBuffer();
}

// const key = process.env.NODE_ENV === "production" ? envVar.STRIPE_SECRET_KEY : envVar.STRIPE_SECRET_KEY_DEV
const key = envVar.STRIPE_SECRET_KEY_DEV

const stripe = Stripe(key);

export const ticketRouter = createTRPCRouter({
    getTicketAndEventById: protectedProcedure
    .input(z.object({
        ticketId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
        const ticket = await ctx.db.ticketType.findUniqueOrThrow({
            where: {
                id: input.ticketId,
            },
            include: {
                event: {
                  select:{
                    id: true,
                    title: true,
                    address: true,
                    startTime: true,
                    startDate: true,
                    eventDescription: false,
                    heroImage: true,
                    

                  }
                },
            },
        });
        return ticket;
    }),

    //Turn into transaction
    

    sendFreeTicketWithLogo: protectedProcedure
    .input(z.object({
      ticketId: z.string(),
      // recipientEmail: z.string(),
      // paymentOweing: z.boolean(),
      // eventName: z.string(),
      // eventLocation: z.string(),
      // eventHeroImage: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {

    //Check if user already has a ticket for this event
    // const existingTicket = await ctx.db.fulfilledTicket.findFirst({
    //   where:{
    //     userId: ctx.session.user.id,
    //     ticketId: input.ticketId,
    //   }
    // })
    // if(existingTicket){
    //   throw new Error("You already have a ticket for this event")
    // }

    const ticketAndEventData = await ctx.db.ticketType.findUnique({
      where: {
          id: input.ticketId,
      },
      include: {
          event: {
            select:{
              id: true,
              title: true,
              address: true,
              startTime: true,
              startDate: true,
              eventDescription: false,
              heroImage: true,
            },
          },
      },
    })

      if(!ticketAndEventData){
        throw new Error("Ticket not found")
      }
      let paymentOweing = false;
      if(ticketAndEventData.price > 0){
        paymentOweing = true;
      }
      
      const ticketD = {
        id: ticketAndEventData.id,
        name: ticketAndEventData.name,
        price: ticketAndEventData.price,
        paymentOweing: paymentOweing,
        eventId: ticketAndEventData.eventId,
        // ticketDescription: ticketAndEventData.ticketDescription,
        drinksIncluded: ticketAndEventData.drinksIncluded,
        foodIncluded: ticketAndEventData.foodIncluded,
        logo: ticketAndEventData.logo,
        eventTitle: ticketAndEventData.event.title,
        eventLocation: ticketAndEventData.event.address,
        eventHeroImage: ticketAndEventData.event.heroImage,
        eventStartTime: ticketAndEventData.event.startTime,
        eventStartDate: ticketAndEventData.event.startDate,

      }
      
      // Log ticket data in fullfilled Ticket 
      const fullfilledTicketInsertRes = await ctx.db.fulfilledTicket.create({
        data:{
          userId: ctx.session.user.id,
          eventId: ticketD.eventId,
          ticketId: ticketD.id,
          quantity: 1,
          paid: false,
          price: ticketD.price,
        }
      }
      )

      console.log("FULLFILLED TICKET DATA: ",fullfilledTicketInsertRes)
      console.log("PAYMENT OWEING: ", paymentOweing)
      // if(input.ticket.price > 0){
      //     throw new Error("Ticket is not free");
      // }
      const transporter = nodemailer.createTransport({
          service: "gmail",
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
          },
      });

      const email = ctx.session.user.email;
      const name = ctx.session.user.name;
      // console.log("EMAIL:",email);

      const payload = JSON.stringify({
        ticketData: ticketD,
        ticketDescription: ticketAndEventData.ticketDescription,
        customer: {
          name: name,
          email: email,
        },
        paymentOweing: paymentOweing
      })
      const base64Payload = Buffer.from(payload).toString('base64');
      const dataURI = `${base64Payload}`;
      // const imageBuffer = await generateQRCodeWithLogo(dataURI);
      //Implement this:
      const final = await overlayLogoOnImage("public/KSLogo.png",dataURI);
      // console.log("EMAIL: ");
      console.log("TICKET DATA: ", ticketD)
      const html = await render(EventTicketEmail({customerName: email as string, ticketId: "123", eventName: ticketAndEventData.event.title, eventLocation: ticketD.eventLocation, heroImage:ticketAndEventData.event.heroImage, qrSrc:"cid:dynamic_image"}));
      // console.log(html);

      const res = await transporter.sendMail({
          from: 'getactive.ticketservice@gmail.com', // sender address
          to: `${email}`, // list of receivers
          subject: "Get Active Ticket ✔", // Subject line
          text: "Your Ticket", // plain text body
          html:html,
          attachments: [
            {
              filename: 'image.png',
              content: final,
              cid: 'dynamic_image'
            }
          ]
        });

        console.log("RESPONSE: ", res);
        console.log(res);
        return res;
  }),

    sendFreeTicket: protectedProcedure
    .input(z.object({
        ticketId: z.string(),
        // recipientEmail: z.string(),
        // paymentOweing: z.boolean(),
        // eventName: z.string(),
        // eventLocation: z.string(),
        // eventHeroImage: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {

      //Check if user already has a ticket for this event
      const existingTicket = await ctx.db.fulfilledTicket.findFirst({
        where:{
          userId: ctx.session.user.id,
          ticketId: input.ticketId,
        }
      })
      if(existingTicket){
        throw new Error("You already have a ticket for this event")
      }

      const ticketAndEventData = await ctx.db.ticketType.findUnique({
        where: {
            id: input.ticketId,
        },
        include: {
            event: {
              select:{
                id: true,
                title: true,
                address: true,
                startTime: true,
                startDate: true,
                eventDescription: false,
                heroImage: true,
              },
            },
        },
      })

        if(!ticketAndEventData){
          throw new Error("Ticket not found")
        }
        let paymentOweing = false;
        if(ticketAndEventData.price > 0){
          paymentOweing = true;
        }
        
        const ticketD = {
          id: ticketAndEventData.id,
          name: ticketAndEventData.name,
          price: ticketAndEventData.price,
          paymentOweing: paymentOweing,
          eventId: ticketAndEventData.eventId,
          // ticketDescription: ticketAndEventData.ticketDescription,
          drinksIncluded: ticketAndEventData.drinksIncluded,
          foodIncluded: ticketAndEventData.foodIncluded,
          logo: ticketAndEventData.logo,
          eventTitle: ticketAndEventData.event.title,
          eventLocation: ticketAndEventData.event.address,
          eventHeroImage: ticketAndEventData.event.heroImage,
          eventStartTime: ticketAndEventData.event.startTime,
          eventStartDate: ticketAndEventData.event.startDate,

        }
        
        // Log ticket data in fullfilled Ticket 
        const fullfilledTicketInsertRes = await ctx.db.fulfilledTicket.create({
          data:{
            userId: ctx.session.user.id,
            eventId: ticketD.eventId,
            ticketId: ticketD.id,
            quantity: 1,
            paid: false,
            price: ticketD.price,
          }
        }
        )

        console.log("FULLFILLED TICKET DATA: ",fullfilledTicketInsertRes)
        console.log("PAYMENT OWEING: ", paymentOweing)
        // if(input.ticket.price > 0){
        //     throw new Error("Ticket is not free");
        // }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const email = ctx.session.user.email;
        const name = ctx.session.user.name;
        // console.log("EMAIL:",email);

        const payload = JSON.stringify({
          ticketData: ticketD,
          ticketDescription: ticketAndEventData.ticketDescription,
          customer: {
            name: name,
            email: email,
          },
          paymentOweing: paymentOweing
        })
        // const base64Payload = Buffer.from(payload).toString('base64');
        // const dataURI = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${base64Payload}`;
        const base64Payload = Buffer.from(payload).toString('base64');
        const dataURI = `${base64Payload}`;
        // const imageBuffer = await generateQRCodeWithLogo(dataURI);
        //Implement this:
        const final = await overlayLogoOnImage("public/KSLogo.png",dataURI);

        // console.log("EMAIL: ");
        console.log("TICKET DATA: ", ticketD)
        const html = await render(EventTicketEmail({customerName: email as string, ticketId: "123", eventName: ticketAndEventData.event.title, eventLocation: ticketD.eventLocation, heroImage:ticketAndEventData.event.heroImage, qrSrc:"cid:dynamic_image"}));
        // console.log(html);

        const res = await transporter.sendMail({
            from: 'getactive.ticketservice@gmail.com', // sender address
            to: `${email}`, // list of receivers
            subject: "Get Active Ticket ✔", // Subject line
            text: "Your Ticket", // plain text body
            html:html,
            attachments: [
              {
                filename: 'image.png',
                content: final,
                cid: 'dynamic_image'
              }
            ]
          });

          // console.log("RESPONSE: ", res);
          // console.log(res);
          return res;
    }),


    sendTicket: publicProcedure
      .input(z.object({
        id:z.string()
      }))
      .query(async ({ ctx,input }) => {
        const stripeCheckoutID = input.id;
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          // @ts-ignore
          stripeCheckoutID,
          {
              expand: ['line_items'],
          }
      );

      console.log("trpc x strip: ",sessionWithLineItems);
      const paymentIntentId = sessionWithLineItems.payment_intent;
      console.log("PAYMENT INTENT ID: ", paymentIntentId);
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      console.log("PAYMENT INTENT: ", paymentIntent);
      const latestChargeId = paymentIntent.latest_charge;
      const latestCharge = await stripe.charges.retrieve(latestChargeId);
      console.log("LATEST CHARGE: ", latestCharge);
      const receiptUrl = latestCharge.receipt_url;
      //ToDo: Create Stripe products on event creation and link the product instead of creating it on the fly!!!!>
      const lineItems = sessionWithLineItems.line_items;
      const price = lineItems.data[0].price
      const amount = price.unit_amount_decimal
    
      const charge = sessionWithLineItems.metadata
      const customer = (sessionWithLineItems.customer_details)
      
      const checkoutData = {
          checkoutProduct: charge,
          priceProduct: price,
          customer: customer,
      }
      console.log("TRPC CHECKOUT DATA: ",checkoutData)

      let sessionObj:JSON | undefined;
      const userObj = {
        email: "",
        id: "",
        name: "",
      };

      try{

        sessionObj = JSON.parse(checkoutData.checkoutProduct.userSession);
        if(sessionObj && sessionObj['user']){
          userObj.id= sessionObj['user']['id'];
          userObj.name= sessionObj['user']['id'];
          userObj.email= sessionObj['user']['email'];
        }

      }catch(err){
        console.log("ERROR PARSING SESSION OBJ: ", err);
        sessionObj = undefined
      }
      if(checkoutData.checkoutProduct.userSessionEmail){
        userObj.email = checkoutData.checkoutProduct.userSessionEmail;
      }

      // LOG STRIPE TRANSACTION
      try{

        const stripeTransaction = await ctx.db.stripeTransaction.create({
          data:{
            customerEmail: latestCharge.billing_details.email,
            customerName: latestCharge.billing_details.name,
            
            userEmail: userObj.email,
            userId: userObj.id,
            userName: userObj.name,
            stripeChargeId: latestCharge.id,
            stripePriceId: checkoutData.priceProduct.id,
            stripeProductId: checkoutData.priceProduct.product,
            checkoutSessionId: sessionWithLineItems.id, 
            // stripeCustomerId: checkoutData.customer.id, //problem
            receiptUrl: receiptUrl,
            checkoutMetadata: checkoutData.checkoutProduct,
            productMetadata: checkoutData.priceProduct.metadata,
            customerMetadata: checkoutData.customer,
            ticketId: checkoutData.priceProduct.metadata.ticketId,
            price: checkoutData.priceProduct.unit_amount_decimal,
            paid: true,
          }
        })
  
        console.log("\n\n\n STRIPE TRANSACTION: ", stripeTransaction);
      }catch(err){
        console.log("ERROR INSERTING STRIPE TRANSACTION", err);
      }



      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // console.log("EMAIL:",email);
    const ticketId = checkoutData.priceProduct.metadata.ticketId;



    // const ticket = await ctx.db.ticketType.findUnique({
    //   where:{
    //     id:ticketId
    //   }
    // })
    // const payload = JSON.stringify({
    //   ticketData: ticketD,
    //   ticketDescription: ticketAndEventData.ticketDescription,
    //   customer: {
    //     name: name,
    //     email: email,
    //   },
    //   paymentOweing: paymentOweing
    // })
    // const ticketAndEventData = await ctx.db.ticketType.findUnique({
    //   where: {
    //       id: ticketId,
    //   },
    //   include: {
    //       event: {
    //         select:{
    //           id: true,
    //           title: true,
    //           address: true,
    //           startTime: true,
    //           startDate: true,
    //           eventDescription: false,
    //           heroImage: true,
    //         },
    //       },
    //   },
    // })

    // const ticketD = {
    //   id: ticketAndEventData?.id,
    //   name: ticketAndEventData?.name,
    //   price: ticketAndEventData?.price,
    //   paymentOweing: false,
    //   eventId: ticketAndEventData?.eventId,
    //   // ticketDescription: ticketAndEventData.ticketDescription,
    //   drinksIncluded: ticketAndEventData?.drinksIncluded,
    //   foodIncluded: ticketAndEventData?.foodIncluded,
    //   logo: ticketAndEventData?.logo,
    //   eventTitle: ticketAndEventData?.event.title,
    //   eventLocation: ticketAndEventData?.event.address,
    //   eventHeroImage: ticketAndEventData?.event.heroImage,
    //   eventStartTime: ticketAndEventData?.event.startTime,
    //   eventStartDate: ticketAndEventData?.event.startDate,
    // }

    const eventAndTicketData = await ctx.db.event.findUnique({
      
      where:{
          id: checkoutData.priceProduct.metadata.eventId,
      },
      include:{
        ticketTypes:{
          where:{
            stripePriceId: checkoutData.priceProduct.id
          }
        
        }
        
      }
    })
   
    const ticketD = {
      id: eventAndTicketData?.ticketTypes[0]?.id as string,
      name: eventAndTicketData?.ticketTypes[0]?.name,
      price: eventAndTicketData?.ticketTypes[0]?.price,
      paymentOweing: false,
      eventId: eventAndTicketData?.id,
      // ticketDescription: ticketAndEventData.ticketDescription,
      drinksIncluded: eventAndTicketData?.ticketTypes[0]?.drinksIncluded,
      foodIncluded: eventAndTicketData?.ticketTypes[0]?.foodIncluded,
      logo: eventAndTicketData?.ticketTypes[0]?.logo,
      eventTitle: eventAndTicketData?.title,
      eventLocation: eventAndTicketData?.address,
      eventHeroImage: eventAndTicketData?.heroImage,
      eventStartTime: eventAndTicketData?.startTime,
      eventStartDate: eventAndTicketData?.startDate,
    }


  

    const payload = JSON.stringify({
      // stripeProduct: checkoutData.priceProduct.metadata,
      ticketData: ticketD,
      
      customer: {
        name: checkoutData.customer.name,
        email: checkoutData.customer.email,
      },
      // ticketDescription: checkoutData.priceProduct.metadata.ticketDescription ? checkoutData.priceProduct.metadata.ticketDescription : eventAndTicketData?.ticketTypes[0]?.ticketDescription ,
      paymentOweing:false
    })
    const base64Payload = Buffer.from(payload).toString('base64');
    const dataURI = `${base64Payload}`;
    // const imageBuffer = await generateQRCodeWithLogo(dataURI);
    //Implement this:
    const final = await overlayLogoOnImage("public/KSLogo.png",dataURI);
    // console.log("EMAIL: ");
    console.log("CHECKOUT DATA LOGO:", checkoutData.priceProduct.metadata.logo)
    const logo = checkoutData.checkoutProduct.heroImage;
    const html = await render(EventTicketEmail({customerName: checkoutData.customer.name, ticketId: ticketD.id, eventName: checkoutData.priceProduct.metadata.eventTitle, heroImage:checkoutData.priceProduct.metadata.eventHeroImage,eventLocation: ticketD.eventLocation, qrSrc:"cid:dynamic_image",receiptUrl: receiptUrl}));

    const email = checkoutData.customer.email ? checkoutData.customer.email : checkoutData.checkoutProduct.userSessionEmail;

    const res = await transporter.sendMail({
        from: 'getactive.ticketservice@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Get Active Ticket ✔", // Subject line
        text: "Your Ticket", // plain text body
        html:html,
        attachments: [
          {
            filename: 'image.png',
            content: final,
            cid: 'dynamic_image'
          }
        ]
      });

      // console.log("RESPONSE: ", res);
      // console.log(res);
      return res;




    }),



  });
  
  async function generateQRCodeWithLogo(dataURI:string) {
 // The content of the QR code
    const qrCodeOptions = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      margin: 2,
      width: 500,
      height: 500
    };
  
    // Generate the QR code as a buffer
    const qrCodeBuffer = await qrcode.toBuffer(dataURI, qrCodeOptions);
  
    return qrCodeBuffer;
  }


  