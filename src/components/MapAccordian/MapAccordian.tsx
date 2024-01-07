"use client"
import {Accordion, AccordionItem} from "@nextui-org/react";
import { MapPin, MapPinnedIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Map from "@/components/Map/MapBox";
export interface MapAccordianProps {
  title: string;
  children?: React.ReactNode;
  center: string;
}


export default function App({ title, center }: MapAccordianProps) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));
    console.log("center: ",center)
    const latLng = center.split(",").map((str) => parseFloat(str));
    console.log("latLng: FROM ACCORDIAN",latLng);
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
        key={"1"}
        aria-label="Map Accordian 1"
        indicator={({ isOpen }) => (
            <motion.div animate={isOpen ? "open" : "closed"} variants={
                {
                    open: {rotate: 90},
                    closed: {rotate: -360},
                }
            } >
              {isOpen ? <MapPinnedIcon key={1} color={"#BEF264"} /> : <MapPin color={"#BEF264"} />}
            </motion.div>
          )}        
          title={title}
      >
        {/* <Map isAccordionOpen={selectedKeys.has("1")}/> */}
        <div className="h-[400px] mb-3">

          {selectedKeys.has("1") ? <Map latlng={latLng} wrapperClassName="w-full rounded-lg h-full" /> : null}
        </div>
      </AccordionItem>

    </Accordion>
  );
}
