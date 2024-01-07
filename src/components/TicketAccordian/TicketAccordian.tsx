"use client";
import { Accordion, AccordionItem, Button} from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
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
}

export default function App({
  title,
  tickets,
  wrapperClassName,
}: MapAccordianProps) {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(new Set(["-1"]));
  const [selectedTicket, setSelectedTicket] = useState(-1);
  const [selectedTicketData, setSelectedTicketData] = useState<HTicketCardProps['ticket']>();
  
  const sendFreeTicket = api.ticket.sendFreeTicket.useMutation();

  const handleSubmit = () => {
    try{
      if (typeof selectedTicket === 'undefined' || !tickets[selectedTicket]?.id) throw new Error('No ticket selected');
      console.log("SENDING TICKET")
      if(selectedTicketData?.price === 0){
      sendFreeTicket.mutate({
        ticket:{
          name: tickets[selectedTicket]?.name as string,
          ticketDescription: tickets[selectedTicket]?.ticketDescription as {description:string},
          price: tickets[selectedTicket]?.price as number,
          drinksIncluded: tickets[selectedTicket]?.drinksIncluded as boolean,
          foodIncluded: tickets[selectedTicket]?.foodIncluded as boolean,
          paymentTypes: tickets[selectedTicket]?.paymentTypes as string,
          logo:"",
        },
        paymentOweing: false,
        eventName: "CHANGE THIS HARDCODED VALUE",
        recipientEmail: "connor.belez@gmail.com",
        eventLocation: "CHANGE THIS HARDCODED VALUE",
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

  
  return (
    <Accordion
      isCompact
      variant={"splitted"}
      showDivider
      fullWidth
      selectedKeys={selectedKeys}
      //@ts-ignore
      onSelectionChange={setSelectedKeys}
      className={
        " hidden h-[100px] w-full flex-col gap-1 border-none sm:flex "
        
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
          <Button color="primary" variant="faded" onClick={handleSubmit} className="w-full">Checkout</Button>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
