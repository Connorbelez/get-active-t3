
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
import {Event as EventType, TicketType} from "@prisma/client"
import { title } from "@/components/Primatives/Typography";
// import TipTapEditor from "@/ui/editor/Editor";
// import Editor from "@/ui/editor/index";
import Form from "@/app/dashboard/components/EventCreationForm/EditEventForm";
import {toast} from "sonner"
// import { JSONContent } from "@tiptap/react";
interface EventDetails {
    id: string;

  }
 const app = async (  {
    searchParams,
  }: {
    searchParams: EventDetails;
  }) => {
    const eventId = searchParams.id;

    const eventData = await api.event.getEventById.query({eventId:eventId});

    if(!eventData){
        toast.error(<div>Event Not Found</div>)
    }

    

  return(
  <div className="h-full w-full pl-2 pr-0 sm:pr-2 flex  flex-col items-center">
      <h1 className={`text-primary mt-16 ${title()}`}>Edit Event</h1>
      <Form eventData={eventData} />

    </div>
  )
};

export default app;