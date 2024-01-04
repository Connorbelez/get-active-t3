import { z } from "zod";
import nodemailer from "nodemailer";
import {render} from "jsx-email"   
import qrcode from 'qrcode';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { create } from "domain";
import { EventTicketEmail } from "@/components/emails/SendTicketEmail";
import { ticketTypeSchema } from "@/types/schemas"



export const ticketRouter = createTRPCRouter({

    sendFreeTicket: protectedProcedure
    .input(z.object({
        ticket: ticketTypeSchema,
        recipientEmail: z.string(),
        paymentOweing: z.boolean(),
        eventName: z.string(),
        eventLocation: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
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

        const email = input.recipientEmail;
        // console.log("EMAIL:",email);
        const payload = JSON.stringify({
          ...input.ticket,
          email: email,
        })
        const base64Payload = Buffer.from(payload).toString('base64');
        const dataURI = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${base64Payload}`;
        const imageBuffer = await generateQRCodeWithLogo(dataURI);

        // console.log("EMAIL: ");
        const html = await render(EventTicketEmail({customerName: input.recipientEmail, ticketId: "123", eventName: input.eventName, eventLocation: input.eventLocation, qrSrc:"cid:dynamic_image"}));
        // console.log(html);

        const res = await transporter.sendMail({
            from: 'getactive.ticketservice@gmail.com', // sender address
            to: `${input.recipientEmail}`, // list of receivers
            subject: "Active Ticket ✔", // Subject line
            text: "Hello world!", // plain text body
            html:html,
            attachments: [
              {
                filename: 'image.png',
                content: imageBuffer,
                cid: 'dynamic_image'
              }
            ]
          });

          // console.log("RESPONSE: ", res);
          // console.table(res);
          return res;
    })

  });
  
  async function generateQRCodeWithLogo(dataURI:string) {
    const text = dataURI; // The content of the QR code
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