import React from "react";
import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";
import VTicketCard from "./TicketPreview";
import { TicketType } from "@prisma/client";
interface CustomCheckboxProps {
  user: any,
  statusColor: string,
  value: string,
  key: number,
  ticket: {
    ticketTitle:string,
    ticketDescription:string,
    ticketPrice:string,
    itemsIncluded:string,
    paymentTypes:string,
    freeTicket:boolean,
    payAtDoorTicket:boolean,
    foodIncluded:boolean,
    drinksIncluded:boolean,
  }
}

export const CustomCheckbox = ({ user, statusColor, value, ticket,key }:CustomCheckboxProps) => {
  return (
    <Checkbox
      aria-label={user.name}
      classNames={{
        base: cn(
          "flex flex-col h-[400px] bg-zinc-800 m-0",
          "hover:bg-content2 items-start justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-1 border-zinc-700 ",
          "data-[selected=true]:border-primary data-[selected=true]:border-2"
        ),
        label: "",
      }}
      key={key}
      value={value}
    >
      <div className="flex flex-row justify-between">
        <div className="flex gap-1 w-[150px]">
          <VTicketCard ticketData={ticket} _key={1} stateKey={1} />
          {/* <span className="text-tiny text-default-500">{user.role}</span>
          <Chip color={statusColor} size="sm" variant="flat">
            {user.status}
          </Chip> */}
        </div>
      </div>
    </Checkbox>
  );
};

export default CustomCheckbox;
