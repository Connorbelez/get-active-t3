"use client"

import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils"
import { AddressAutofill } from '@mapbox/search-js-react';
import { CreditCard, Banknote } from "lucide-react";
// import ReactDOM from 'react-dom';
import { toast } from "sonner"
// import TimePicker from "@/components/TimePicker/TimePicker";
import { UseFormReturn } from "react-hook-form";
import {api} from "@/trpc/react"

//FORM IMPORTS
import TicketForm  from "@/app/dashboard/components/EventCreationForm/TicketForm";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"


//UI IMPORTS
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { button as Button } from "@/components/ui/button"
import { Input as NextInput, Switch } from "@nextui-org/react"
// import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"



import { Event, TicketType } from "@prisma/client";
// import { start } from "repl"
import React from 'react';

//TIPTAP IMPORTS
import HTMLReactParser from "html-react-parser";
import Editor from "@/ui/editor";
import { generateHTML } from '@tiptap/html'
import {ExtensionKit} from "@/ui/editor/extensions/extension-kit"
import { Extensions, JSONContent } from "@tiptap/react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ticketTypeSchema } from "@/types/schemas";
// import { Edit } from "lucide-react";
export type PaymentMethod = {
    id:number;
    name: string;
    icon: React.JSX.Element;
};


const handleImageUpload = (file: File) => {
  return new Promise<string>((resolve, reject) => {
      toast.promise(
          fetch("/api/upload", {
              method: "POST",
              headers: {
                  "content-type": file?.type || "application/octet-stream",
                  "x-vercel-filename": file?.name || "image.png",
              },
              body: file,
          }).then(async (res) => {
              if (res.status === 200) {
                  const { url } = await res.json();
                  //console.log("IMAGE URL FROM UPLOAD-IMAGES PLUGIN: ", url);
                  resolve(url); // Resolving with the URL
              } else if (res.status === 401) {
                  // Handle unauthorized error
                  const errorMessage = "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.";
                  //console.error(errorMessage);
                  reject(new Error(errorMessage));
              } else {
                  // Handle other errors
                  const error = new Error(`Error uploading image. Please try again.`);
                  //console.error(error.message);
                  reject(error);
              }
          }),
          {
              loading: "Uploading image...",
              success: "Image uploaded successfully.",
              error: (e) => {
                  // This will handle any error during the upload process
                  reject(e);
                  return e.message();
              },
          }
      );
  });
};



// const onSubmit = (values: z.infer<typeof formSchema>) =>{
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log()
//     console.log("SUBMIT")
//     console.log(values)
// }

export const ticketFormSchema = z.object({
  ticketTitle: z.string()
  .min(5, "Too short")
  .max(50, "Too long"),

  ticketDescription: z.string(),
  ticketPrice: z.string(),
  itemsIncluded: z.string(),
  paymentTypes: z.string(), //ToDo: change this to enum with dropdown

  freeTicket: z.boolean(),
  payAtDoorTicket: z.boolean(),
  foodIncluded: z.boolean(),
  drinksIncluded: z.boolean(),


})


export default function ProfileForm() {
    // ...
  const insertEvent = api.event.create.useMutation();


  const formSchema = z.object({
      eventTitle: z.string().min(2, {
          message: "Event Title must be at least 2 characters.",
      }),
      eventHeadline: z.string().min(2, {
          message: "Event headline must be at least 2 characters.",
      }).optional(),
      category: z.string().min(2, {
          message: "Event headline must be at least 2 characters.",
      }).optional(),
      private: z.boolean().optional(),
      startDate: z.date().optional(),
      startTime: z.string().optional(),
      address: z.string().min(2, {
          message: "Event address must be at least 2 characters.",
      }).optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
      city: z.string().optional(),
      province: z.string().optional(),
      time: z.string().optional(),
      freeTicket: z.boolean().optional(),
      payAtDoorTicket: z.boolean().optional(),
      heroImage: z.string().optional(),

  })
    
  const [editorJson, setEditorJson] = useLocalStorage(
      'editorJson',
      { type: 'doc',
          content: [
          {
              type: 'paragraph',
              content: [
              {
                  type: 'text',
                  text: 'Example ',
              },
              {
                  type: 'text',
                  marks: [
                  {
                      type: 'bold',
                  },
                  ],
                  text: 'Text',
              },
              ],
          },
          ],
      } as JSONContent
  );


  const onTicketSubmit = (vs: z.infer<typeof formSchema>) =>{
      // Do something with the form values.
      // ✅ This will be type-safe and validated.

      console.log("SUBMIT")
      //console.log(vs)
      //console.table(vs)
  }

    // const output = useMemo(() => {
    //        //@ts-ignore
    //     return generateHTML(editorJson, [
    //         ...ExtensionKit({}) 
    //       ])
    //   }, [editorJson])
    // const [date, setDate] = useState<Date>()

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          eventTitle: "",
          eventHeadline: "",
          category: "",
          private: false,
          startDate: new Date(),
          startTime: "",
          address: "",
          postalCode: "",
          country: "",
          city: "",
          province: "",
          time: "",
      
          
      },
    }
    )



    const handleHeroImage = (event)=>{
      const file = event.target.files[0];
      //console.log(event)
      //console.log("FILE: ", file)
      //console.log("FILE TYPE: ", file.type)
      if (!file.type.includes("image/")) {
          toast.error("File type not supported.");
          return;
    
          // check if the file size is less than 20MB
      } else if (file.size / 1024 / 1024 > 20) {
          toast.error("File size too big (max 20MB).");
          return;
      }
    
      // A fresh object to act as the ID for this upload
      const id = {};
    
      // Replace the selection with a placeholder
    
    
      const reader = new FileReader();
      reader.readAsDataURL(file);
    
      void handleImageUpload(file).then(
          (urlVal) => {
              //console.log("HERO URL: ",urlVal);
              // setEventData((prevData) => ({ ...prevData, ["heroImage"]: urlVal }));
              // //console.log("event data: ", eventData)
              // setEditorJson((prevData) => ({ ...prevData, ["heroImage"]: urlVal }));
              form.setValue("heroImage", urlVal);
            }
      )
    }
    
    const onSubmit = (values: z.infer<typeof formSchema>) => {
      try{

        if(!ticketData){
            toast.error("You must add at least one ticket type")
            return;
        }
        const ticketArray = ticketData.map((ticket:typeof ticketData[0]) => {
          const t = ticketTypeSchema.parse({
            name: ticket.ticketTitle,
            ticketDescription: {
              description: ticket.ticketDescription,
            },
            price: parseInt(ticket.ticketPrice),
            foodIncluded: ticket.foodIncluded ,
            drinksIncluded: ticket.drinksIncluded,
            paymentTypes: ticket.paymentTypes,
            paymentOweing: false,
            logo: "",
          })
          return{
            t
          }
        })
        
        insertEvent.mutate({
          length: 4,
          title: values.eventTitle,
          headline: values.eventHeadline,
          category: values.category,
          private: values.private,
          startDate: values.startDate?.toDateString() ? values.startDate?.toDateString() : "",
          createdById: "1",
          startTime: values.startTime as string,
          address: values.address as string,
          location: values.address as string,
          eventDescription: generateHTML(editorJson,ExtensionKit({}) as Extensions),
          heroImage: values.heroImage as string,
          adultOnly: false,
          foodIncluded: false,
          drinksIncluded: false,
          createdByEmail: "connorb@gmail.com",
          ticketStartingPrice: 0,
          ticketTypes: 
            ticketData.map((ticket:typeof ticketData[0]) => {
              return{
                name: ticket.ticketTitle,
                ticketDescription: {
                  description: ticket.ticketDescription,
                },
                price: parseInt(ticket.ticketPrice),
                foodIncluded: ticket?.foodIncluded ,
                drinksIncluded: ticket?.drinksIncluded,
                paymentTypes: ticket.paymentTypes,
              }
            })
        })
        
      }catch(e){
        //console.error(e)
        toast.error("Something went wrong: ",e)
        return
      }
      toast.success("Event Created")
    }

    const [timeValue,setTimeValue] = useState("10:00");
    const [selectedTicket, setSelectedTicket] = useState([]);
    const tickets : TicketType[] = [];
    //@ts-ignore
    const [paymentTypes, setPaymentTypes] = React.useState<Selection>(new Set([]));
    
  
    const [ticketData, setTicketData] = useState<[{
      ticketTitle:string,
      ticketDescription:string,
      ticketPrice:string,
      itemsIncluded:string,
      paymentTypes:string,
      freeTicket:boolean,
      payAtDoorTicket:boolean,
      foodIncluded:boolean,
      drinksIncluded:boolean,
      stripePriceId?:string,
    }]>()


  // const output = useMemo(() => {
  //   //@ts-ignore
  //     return generateHTML(editorJson, [
  //         ...ExtensionKit({})
  //       ])
  //   }, [editorJson])
    return (
      <div className="flex flex-col px-6 sm:p-0 my-16">


      <Form {...form}>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col justify-center">
       
        <div className={"space-y-8"}>
          <FormField
            control={form.control}
            name="eventTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormControl>
                  <Input placeholder="event title" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your event's title
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
                control={form.control}
                name="eventHeadline"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Event headline</FormLabel>
                    <FormControl>
                      <Input placeholder="event headline" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will be your event's headline
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="event category" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your event's category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
        />
       </div>
        

        <div className={"flex justify-start sm:justify-center flex-wrap space-x-4 my-8 space-y-8"}>
            <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? (
                            format(field.value, "PPP")
                        ) : (
                            <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                <FormDescription>
                    Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="time"
            
                render={({ field }) => (
                <FormItem className="flex items-center">
                    <FormControl>
                        {/* <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}> */}
                        <NextInput type="time" label="Time" placeholder="" defaultValue="" labelPlacement="outside-left" variant="bordered" {...field} />
                        {/* </AddressAutofill> */}
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
        />
            <FormField
                control={form.control}
                name="private"
                render={({ field }) => (
                <FormItem className="flex space-x-4 items-center ">
                    <FormLabel className="flex items-center justify-center">Private Event?</FormLabel>
                    <FormControl>
                    <Switch 
                        name="private"
                        // label="Private Event?"
                        // onChange={field.onChange}
                        checked={field.value} 
                        onChange={field.onChange}

                    //   {...field} 
                    />
                    </FormControl>

                    <FormMessage />
                </FormItem>
                )}
            />

        </div>

        {/* ADDRESS */}
        <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                    {/* <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}> */}
                    <Input autoComplete="address-line1" placeholder="event address" {...field} />
                  {/* </AddressAutofill> */}
                </FormControl>
                <FormDescription>
                  Where is your event?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
        />

        {/* IMAGE UPLOAD */}
          <FormField
            control={form.control}
            name="heroImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hero Image</FormLabel>
                <FormControl>
                    {/* <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}> */}
                    <Input type="file" onChange={handleHeroImage}/>
                  {/* </AddressAutofill> */}
                </FormControl>
                <FormDescription>
                  Upload a cover image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
        />
        
        {/* <TimePicker value={timeValue} setValue={setTimeValue} /> */}

            
            <div className="grid grid-cols-2 gap-4">
            <FormField
            disabled
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>postalCode</FormLabel>
                <FormControl>

                    <Input autoComplete="postal-code" placeholder="event address" {...field} />

                </FormControl>
                <FormDescription>
                  Where is your event?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            disabled
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>country</FormLabel>
                <FormControl>

                    <Input autoComplete="country" placeholder="country" {...field} />

                </FormControl>
                <FormDescription>
                  Where is your event?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            disabled
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>province</FormLabel>
                <FormControl>
                    <Input autoComplete="address-level1" placeholder="province" {...field} />
                </FormControl>
                <FormDescription>
                  province of event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />

            <FormField
            disabled
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                    <Input autoComplete="address-level2" placeholder="city" {...field} />
                </FormControl>
                <FormDescription>
                  City of Event
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
            />
          </div>
          


          <TicketForm tickets={tickets} selected={selectedTicket} setSelected={setSelectedTicket} ticketData={ticketData} setTicketData={setTicketData}/>
          
        </form>
      </Form>
        <Editor editorJson={editorJson} setEditorJson={setEditorJson}  />
            <Button onClick={form.handleSubmit(onSubmit)} type="submit">Submit</Button>            
          {/* <div className="prose dark:prose-invert my-16 h-full w-full">
            {HTMLReactParser(output)}
          </div> */}
      </div>
    )
  }