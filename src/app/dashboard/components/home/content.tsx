
// import React from "react";
// import dynamic from "next/dynamic";
// import { TableWrapper } from "../table/table";
// import { CardBalance1 } from "./card-balance1";
// import { CardBalance2 } from "./card-balance2";
// import { CardBalance3 } from "./card-balance3";
// import { CardAgents } from "./card-agents";
// import { CardTransactions } from "./card-transactions";
// import { Link } from "@nextui-org/react";
// import NextLink from "next/link";
import EventTable from "@/app/dashboard/components/EventTable/EventTable"
import {api} from "@/trpc/server"
import {Event as EventType} from "@prisma/client"
import { title } from "@/components/Primatives/Typography";
// import TipTapEditor from "@/app/dashboard/components/TipTap/Editor";
import Editor from "@/ui/editor/index";
export interface EventTableData {
  id: number;
  eventId: string;
  category: string;
  title: string;
  status: string;
  heroImage: string;
  numberAttending: number;
  startDate: string;
  startTime: string;
  headline: string;
}
export const Content = async () => {
  // const events: EventType[] = await api.event.getEvents.query();

  // const eventInfo:EventTableData[] = events.map((event,index) => {
  //   return {
  //     id: index,
  //     eventId: event.id,
  //     headline: event.headline || "",
  //     category: event.category || "none",
  //     title: event.title,
  //     status: event.active ? "active" : "paused",
  //     heroImage: event.heroImage,
  //     numberAttending: 50,
  //     startDate: event.startDate,
  //     startTime: event.startTime,
  //   };
  // })
  return(
  <div className="h-full w-full flex flex-col items-center">
      <h1 className={`text-primary ${title()}`}>Existing Events</h1>
    <div className="TableContainer flex w-full justify-center">
      {/* <EventTable events={eventInfo} /> */}
      {/* <TipTapEditor params={{room:"asdf"}} /> */}
      <Editor />  
    </div>

  </div>
  )
};
