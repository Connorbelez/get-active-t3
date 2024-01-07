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
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const [selectedKeys, setSelectedKeys] = useState(new Set(["-1"]));
  const [selectedTicket, setSelectedTicket] = useState(-1);
  const [selectedTicketData, setSelectedTicketData] = useState<HTicketCardProps['ticket']>();
  return (
    <Accordion
      isCompact
      variant={"splitted"}
      showDivider
      fullWidth
      selectedKeys={selectedKeys}
      //@ts-expect-error
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
          <Button color="primary" variant="faded" className="w-full">Checkout</Button>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
