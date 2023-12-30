"use client"
import {Accordion, AccordionItem} from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Map from "@/components/Map/MapBox";
export interface MapAccordianProps {
  title: string;
  children?: React.ReactNode;
}


export default function App({ title }: MapAccordianProps) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));

  return (
    <Accordion
    isCompact
    variant={"splitted"}
    showDivider
    fullWidth
    selectedKeys={selectedKeys}
    //@ts-expect-error
    onSelectionChange={setSelectedKeys}
    className="flex flex-col gap-1"
    defaultExpandedKeys={["theme"]} >
      <AccordionItem
        key="1"
        aria-label="Map Accordian 1"
        indicator={({ isOpen }) => (
            <motion.div animate={isOpen ? "open" : "closed"} variants={
                {
                    open: {rotate: 90},
                    closed: {rotate: -360},
                }
            } >
              {isOpen ? <MapPinnedIcon /> : <MapPin />}
            </motion.div>
          )}        
          title={title}
      >
        {/* <Map isAccordionOpen={selectedKeys.has("1")}/> */}
        <div className="h-[400px] mb-3">

          {selectedKeys.has("1") ? <Map wrapperClassName="w-full rounded-lg h-full" /> : null}
        </div>
      </AccordionItem>

    </Accordion>
  );
}
