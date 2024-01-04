import {Card, CardBody,CheckboxGroup, CardHeader, Button, User, Chip, cn,Divider, Input,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Checkbox, Link} from "@nextui-org/react";
import { PlusCircle, PlusSquare, Plus,CopyPlus, FileEdit, Trash2, FileX2 } from "lucide-react";
import { EditDocumentIcon } from "@/components/icons/Edit";
import TicketCheckBox from "./TicketCheckBox";
import { TicketType } from "@prisma/client";
import { useDisclosure } from "react-use-disclosure";
import NewTicketModal from "./NewTicketModal";
interface compProps {
    tickets: TicketType[];
    selected: number;
    setSelected: (index: number) => void;
    onSubmit: any;
    ticketData: any;
    setTicketData: any;
}


export default function comp({tickets,selected,setSelected,onSubmit, ticketData, setTicketData}: compProps) {
    const {isOpen, open, toggle} = useDisclosure();
    return (
        <div className="w-full">    
            <NewTicketModal isOpen={isOpen} onOpenChange={toggle} onOpen={open} ticketData={ticketData} setTicketData={setTicketData} />
            <Card >
                <CardHeader className="flex justify-between flex-col sm:flex-row" >
                    <h1>Ticket Creation</h1>
                    <div className="flex space-x-4">
                        <Button color="danger" variant="faded" endContent={<Trash2/>}>Delete</Button>
                        <Button color="warning" variant="faded" endContent={<EditDocumentIcon size={30}/>}>Edit</Button>
                        <Button color="secondary" variant="faded" onPress={open} endContent={<CopyPlus/>}>Add</Button>
                    </div>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <CheckboxGroup >
                        <TicketCheckBox statusColor={"success"} value={"asdfadsf"} user={{name:"test",avatar:"https://avatars.githubusercontent.com/u/20658825?v=4",user:"adsf", username:"test",url:"sdf"}}/>

                    </CheckboxGroup>
                </CardBody>
            </Card>
        </div>
    )
}