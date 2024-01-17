"use client";
import { Accordion, AccordionItem, Button} from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
import { Ticket, Banknote, CreditCard } from "lucide-react"
import SideScrollRoot from "@/components/SideScroll/SideScrollTIckets";
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
import Ticket2Icon from "../icons/TicketIcon";
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
  
  const sendFreeTicket = api.ticket.sendFreeTicket.useMutation({
    
    async onSuccess(data){
      console.log("SUCCESS")
      console.log(data)
      toast.success('Ticket Sent')
    },
    async onError(error){
      console.log("ERROR")
      console.log(error)
      
      toast.error("ERROR: You may already have a ticket for this event or need to sign in")
    }
  });

  const handleCashCheckout = () => {

    try{
      if (typeof selectedTicket === 'undefined' || !tickets[selectedTicket]?.id) throw new Error('No ticket selected');
      toast.loading('Sending Ticket to your email, please wait...')
      console.log(selectedTicketData)
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
  toast.loading('Checking Out, please wait..')
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
          base:"ACCORDIAN BASE border-1  border-primary/50 shadow-lg shadow-primary/50 ",

        }
      }
      className={
        "ACCORDIAN CLASSNAME hidden flex-col gap-1  border-none sm:block shadow-md shadow-primary/50 rounded-xl p-0  max-h"
        
      }
    >
      <AccordionItem
        key={"1"}
        aria-label="Map Accordian 1"
        className="pb-0 group-[.is-splitted]:pb-5 w-full group-[.is-splitted]:px-3"
        classNames={
          {
            content: "flex flex-col w-full items-center"
          }
        }
        indicator={({ isOpen }) => (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 0 },
              close: { rotate: 90 },
            }}
          >
            <Ticket />
          </motion.div>
        )}
        title={title}
      >
          <SideScrollRoot selectedTicketData={selectedTicketData} setSelectedTicketData={setSelectedTicketData} tickets={tickets} setSelectedTicket={setSelectedTicket} stateKey={selectedTicket}/>

            <div className="w-full grid grid-cols-2 h-[105px] items-center" >
              <div className="flex space-x-2 items-center">
                  {
                  selectedTicket >=0 ? 
                  <h1 className="text-2xl text-primary font-bold">Total: </h1>
                  : 
                  <h1 className="text-xl text-primary font-bold">None Selected</h1>
                  }
                  {/* <h1 className="text-2xl text-primary font-bold">Total: </h1> */}
                  {
                  selectedTicket >=0 ? 
                    <h1 className="text-2xl dark:text-slate-200/70 text-slate-800/70 font-bold">{selectedTicketData?.price ? ` $${selectedTicketData.price - 1 + 0.99}` : "FREE"}</h1>
                    : 
                    null
                  }
                </div>
              {
                selectedTicketData?.paymentTypes.includes("Cash") ?
                // <div className="grid grid-cols-2 gap-2">
                //   <div className="flex flex-col w-full items-center">
                //     <NButton variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCashCheckout}>
                //         <Banknote />
                //     </NButton>
                //     <p>Cash</p>
                //   </div>
                //   <div className="flex flex-col w-full items-center"> 
                //     <NButton variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCC}>
                //       <CreditCard />
                //     </NButton>
                //     <p>Credit</p>
                //   </div>
                // </div>
                <Button variant="faded" className=" prose prose-lg dark:prose-invert" startContent={<Ticket className="mr-4"/>} radius="sm" color="primary" onPress={handleCashCheckout}>
                  <p className="font-bold text-size-xl my-0">Get Ticket</p>
                </Button>
              : <Button variant="faded" className=" prose prose-lg dark:prose-invert" startContent={<Ticket className="mr-4"/>} radius="sm" color="primary" onPress={handleCC}>
                  <p className="font-bold text-size-xl my-0">Get Ticket</p>
                </Button>
              }
            </div>

      </AccordionItem>
    </Accordion>
  );
}
