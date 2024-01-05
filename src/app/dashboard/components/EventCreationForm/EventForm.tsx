"use client"

import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils"
import { AddressAutofill } from '@mapbox/search-js-react';
import { CreditCard, Banknote } from "lucide-react";
import ReactDOM from 'react-dom';

// import TimePicker from "@/components/TimePicker/TimePicker";


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
import { start } from "repl"
import React from 'react';

//TIPTAP IMPORTS
import HTMLReactParser from "html-react-parser";
import Editor from "@/ui/editor";
import { generateHTML } from '@tiptap/html'
import {ExtensionKit} from "@/ui/editor/extensions/extension-kit"
import { JSONContent } from "@tiptap/react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
// import { Edit } from "lucide-react";
export type PaymentMethod = {
    id:number;
    name: string;
    icon: React.JSX.Element;
};


export const ticketFormSchema = z.object({
    ticketTitle: z.string()
        .min(5, "Too short")
        .max(50, "Too long"),

    ticketPrice: z.string(),
    itemsIncluded: z.string(),
    paymentTypes: z.string(), //ToDo: change this to enum with dropdown
    ticketDescription: z.string(),
    freeTicket: z.boolean(),
    payAtDoorTicket: z.boolean(),


})


const formSchema = z.object({
    eventTitle: z.string().min(2, {
        message: "Event Title must be at least 2 characters.",
    }),
    eventHeadline: z.string().min(2, {
        message: "Event headline must be at least 2 characters.",
    }),
    category: z.string().min(2, {
        message: "Event headline must be at least 2 characters.",
    }),
    private: z.boolean(),
    startDate: z.date(),
    startTime: z.string(),
    address: z.string().min(2, {
        message: "Event address must be at least 2 characters.",
    }),
    postalCode: z.string().min(2, {
        message: "Event PC must be at least 2 characters.",
    }).optional(),
    country: z.string().min(2, {
        message: "Event country must be at least 2 characters.",
    }).optional(),
    city: z.string().min(2, {
        message: "Event city must be at least 2 characters.",
    }).optional(),
    province: z.string().min(2, {
        message: "Event province must be at least 2 characters.",
    }).optional(),
    time: z.string().min(2, { message: "Event time must be at least 2 characters." }).optional(),
    freeTicket: z.boolean(),
    payAtDoorTicket: z.boolean(),



})

// const onSubmit = (values: z.infer<typeof formSchema>) =>{
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log()
//     console.log("SUBMIT")
//     console.log(values)
// }

export default function ProfileForm() {
    // ...
     
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

    const onSubmit = (values: z.infer<typeof formSchema>) =>{
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(editorJson)
        console.table(editorJson)
        console.log("SUBMIT")
        console.log(values)
    }

    const onTicketSubmit = (vs: z.infer<typeof formSchema>) =>{
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log("SUBMIT")
        console.log(vs)
        console.table(vs)
    }

    // const output = useMemo(() => {
    //        //@ts-expect-error
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
      })

      const [timeValue,setTimeValue] = useState("10:00");
      const [selectedTicket, setSelectedTicket] = useState(0);
      const tickets : TicketType[] = [];
      //@ts-expect-error
      const [paymentTypes, setPaymentTypes] = React.useState<Selection>(new Set([]));
      
      const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        //@ts-expect-error
        setPaymentTypes(new Set(e.target.value.split(",")));
      };
    
    const [ticketData, setTicketData] = useLocalStorage(
        'ticketData', {
        ticketTitle: "",
        ticketPrice: "0",
        foodIncluded: false,
        drinkIncluded: false,
        paymentTypes: "",
        ticketDescription: "",
        freeTicket: false,
        payAtDoorTicket: false,
    })
      const output = useMemo(() => {
    //@ts-expect-error
      return generateHTML(editorJson, [
          ...ExtensionKit({})
        ])
    }, [editorJson])
    return (
      <div>


      <Form {...form}>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col justify-center m-8 p-8">
       
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

        <div className={"flex justify-center space-x-4"}>
            
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
        
        {/* <TimePicker value={timeValue} setValue={setTimeValue} /> */}

            {/* 
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
          </div> */}
          


          <TicketForm tickets={tickets} selected={selectedTicket} setSelected={setSelectedTicket} ticketData={ticketData} setTicketData={setTicketData}/>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
        <Editor editorJson={editorJson} setEditorJson={setEditorJson}  />
                        
          {/* <div className="prose dark:prose-invert my-16 h-full w-full">
            {HTMLReactParser(output)}
          </div> */}
      </div>
    )
  }