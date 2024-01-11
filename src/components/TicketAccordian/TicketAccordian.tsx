"use client";
import { Accordion, AccordionItem, Button} from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
import { Ticket, Banknote, CreditCard } from "lucide-react"

import { useState } from "react";
import { motion } from "framer-motion";
import TicketCard, {
  HTicketCardProps,
} from "@/components/cards/prod/HTicketCard";
import { TicketType } from "@prisma/client";
import clcx from "classnames";
import {toast} from "sonner"
import {api} from "@/trpc/react"
import { useRouter } from "next/navigation";
export interface MapAccordianProps {
  title: string;
  // children?: React.ReactNode;
  tickets: TicketType[];
  wrapperClassName?: string;
  eventName: string;
  eventLocation: string;
  eventHeroImage: string;
}

export default function App({
  title,
  tickets,
  wrapperClassName,
  eventName,
  eventLocation,
  eventHeroImage,

}: MapAccordianProps) {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["-1"]));
  const [selectedTicket, setSelectedTicket] = useState(-1);
  const [selectedTicketData, setSelectedTicketData] = useState<HTicketCardProps['ticket']>();
  
  const sendFreeTicket = api.ticket.sendFreeTicket.useMutation();

  const handleCashCheckout = () => {

    try{
      if (typeof selectedTicket === 'undefined' || !tickets[selectedTicket]?.id) throw new Error('No ticket selected');
        sendFreeTicket.mutate({
          ticketId: tickets[selectedTicket]?.id as string,
        })

  }catch( error : any) {
    console.log("CAUGHT ERROR: ")
    if (error.message === 'No ticket selected'){
      toast.error('No ticket selected')
    }
    else{
      toast.error('Please Sign In to Continue')
    }
    console.log(error)
  }
  console.log("DONE")
  

}

const handleSubmit = () => {
  try{
    if (typeof selectedTicket === 'undefined' || !tickets[selectedTicket]?.id) throw new Error('No ticket selected');
    console.log("SENDING TICKET")
    console.log(selectedTicketData)
    if(selectedTicketData?.price === 0){

      sendFreeTicket.mutate({
        ticketId: tickets[selectedTicket]?.id as string,
      })
    }else{
      //CHECKOUT
      router.push(`/checkout?id=${tickets[selectedTicket]?.id}`)
    }

}catch( error : any) {
  console.log("CAUGHT ERROR: ")
  if (error.message === 'No ticket selected'){
    toast.error('No ticket selected')
  }
  else{
    toast.error('Please Sign In to Continue')
  }
  console.log(error)
}
console.log("DONE")
}


const handleCC = () => {
  router.push(`/checkout?id=${tickets[selectedTicket]?.id}`)
}

  
  return (
    <Accordion
      
      variant={"splitted"}
      showDivider
      fullWidth
      selectedKeys={selectedKeys}
      //@ts-ignore
      onSelectionChange={setSelectedKeys}

      itemClasses={
        {
          base:" border-1  border-primary/50 shadow-lg shadow-primary ",

        }
      }
      className={
        " hidden flex-col gap-1 border-none sm:flex shadow-md rounded-xl p-0 shadow-primary/50 max-h"
        
      }
    >
      <AccordionItem
        key={"1"}
        aria-label="Map Accordian 1"
        className=" pb-5 w-full group-[.is-splitted]:px-3"
        classNames={
          {
            content: "flex flex-col w-full items-center"
          }
        }
        indicator={({ isOpen }) => (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: -360 },
            }}
          >
            {isOpen ? <MapPinnedIcon /> : <MapPin />}
          </motion.div>
        )}
        title={title}
      >
        {tickets.map((ticket: TicketType, index: number) => {
          return <TicketCard key={index} _key={index} ticket={ticket} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} setSelectedTicketData={setSelectedTicketData} />
        })}
        <div className="grid grid-cols-2 w-full align-middle">
          <div className="flex pl-2 space-x-2 items-center">
            <h1 className="text-2xl text-primary font-bold">Total: </h1>
            <h1 className="text-2xl text-slate-200/70  font-bold">{selectedTicketData?.price ? ` $${selectedTicketData.price - 1 + 0.99}` : "FREE"}</h1>
          </div>
          {
              selectedTicketData?.paymentTypes.includes("Cash") ?
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col w-full items-center">
                  <Button variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCashCheckout}>
                      <Banknote />
                  </Button>
                  <p>Cash</p>
                </div>
                <div className="flex flex-col w-full items-center"> 
                  <Button variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCC}>
                    <CreditCard />
                  </Button>
                  <p>Credit</p>
                </div>
              </div>
             : <Button variant="faded" className=" prose prose-lg dark:prose-invert" startContent={<Ticket className="mr-4"/>} radius="sm" color="primary" type={"submit"}>
                <p className="font-bold text-size-xl my-0">Checkout</p>
              </Button>
              }
        </div>
      </AccordionItem>
    </Accordion>
  );
}
