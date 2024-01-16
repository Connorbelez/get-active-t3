
// import React from "react";
// import dynamic from "next/dynamic";
// import { TableWrapper } from "../table/table";
// import { CardBalance1 } from "./card-balance1";
// import { CardBalance2 } from "./card-balance2";
// import { CardBalance3 } from "./card-balance3";
// import { CardAgents } from "./card-agents";
// import { CardTransactions } from "./card-transactions";
// import { Link } from "@/components/ClientNextUI";
// import NextLink from "next/link";
import EventTable from "@/app/dashboard/components/EventTable/EventTable"
import {api} from "@/trpc/server"
import {Event as EventType} from "@prisma/client"
import { title } from "@/components/Primatives/Typography";
// import TipTapEditor from "@/ui/editor/Editor";
// import Editor from "@/ui/editor/index";
import Form from "@/app/dashboard/components/EventCreationForm/EventForm";
// import { JSONContent } from "@tiptap/react";
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
 const app = async () => {


  return(
  <div className="h-full w-full pl-2 pr-0 sm:pr-2 flex  flex-col items-center">
      <h1 className={`text-primary mt-16 ${title()}`}>Create Event</h1>
      <Form />

    </div>
  )
};

export default app;