"use client"
import {Card, CardBody,CheckboxGroup, CardHeader, Button, User, Chip, cn,Divider, Input,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Checkbox, Link} from "@nextui-org/react";
import { PlusCircle, PlusSquare, Plus,CopyPlus, FileEdit, Trash2, FileX2 } from "lucide-react";
import { EditDocumentIcon } from "@/components/icons/Edit";
import TicketCheckBox from "./TicketCheckBox";
import { TicketType } from "@prisma/client";
import { useDisclosure } from "react-use-disclosure";
import NewTicketModal from "./NewTicketModal";
import { set } from "zod";
interface compProps {
    tickets: TicketType[];
    selected: any;
    setSelected: any;
    // onSubmit: any;
    ticketData: {
        ticketTitle:string,
        ticketDescription:string,
        ticketPrice:string,
        itemsIncluded:string,
        paymentTypes:string,
        freeTicket:boolean,
        payAtDoorTicket:boolean,
        foodIncluded:boolean,
        drinksIncluded:boolean,
      }[] | undefined;
    setTicketData: any;
}


export default function comp({tickets,selected,setSelected, ticketData, setTicketData}: compProps) {
    const {isOpen, open, toggle} = useDisclosure();
    const handleDelete = () => {
        console.log("delete : ", selected);
        setTicketData(ticketData?.filter((ticket,index) => {
            return !selected.includes(ticket.ticketTitle);
        }))
    }
    return (
        <div className="w-full">    
            <NewTicketModal isOpen={isOpen} onOpenChange={toggle} onOpen={open} ticketData={ticketData} setTicketData={setTicketData} />
            <Card >
                <CardHeader className="flex justify-between flex-col sm:flex-row" >
                    <h1>Ticket Creation</h1>
                    <div className="flex space-x-4">
                        <Button onPress={handleDelete} color="danger" variant="faded" endContent={<Trash2/>}>Delete</Button>
                        <Button color="warning" variant="faded" endContent={<EditDocumentIcon size={30}/>}>Edit</Button>
                        <Button color="secondary" variant="faded" onPress={open} endContent={<CopyPlus/>}>Add</Button>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <CheckboxGroup 
                        orientation="horizontal" 
                        className="CHECKBOX GROUP w-full flex flex-row "
                        value = {selected}
                        onChange={setSelected}
                    >
                        {
                        ticketData ? ticketData.map((ticket,index) => {
                            return <TicketCheckBox statusColor={"success"} ticket={ticket} key={index} value={ticket.ticketTitle} user={{name:"test",avatar:"https://avatars.githubusercontent.com/u/20658825?v=4",user:"adsf", username:"test",url:"sdf"}}/>
                        }
                        ) : <div className="flex justify-center items-center h-[400px]"><h1 className="text-primary">No Tickets</h1></div>}
                    </CheckboxGroup>
                </CardBody>
            </Card>
        </div>
    )
}