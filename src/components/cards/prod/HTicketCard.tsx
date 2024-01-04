import {Card, CardBody, CardHeader,Chip, Button} from "@nextui-org/react"
import Accordian from "@/components/TicketAccordian/TicketAccordian";
import Image from "next/image";
import { TicketType } from "@prisma/client";
import { Martini, UtensilsCrossed } from "lucide-react";

export interface HTicketCardProps {
    ticket: TicketType;
    key: number;
}

const handleCheckout = () => {
    console.log("checkout")

}


export default function TicketCard({
    ticket:{
    name,price,paymentTypes,drinksIncluded,foodIncluded,ticketDescription},
    key
} : HTicketCardProps) {
    drinksIncluded = true;
    foodIncluded = true;
    console.table(paymentTypes)
    const paymentTypesArr:string[] = paymentTypes.split(",");
    const handlePress = () => {
        
    }
    return (

        // <form onSubmit={handleCheckout} className="z-0">
        // <input type="hidden" name="ticketId" value={name} />
        // <input type="hidden" name="ticketPrice" value={price} />
        // <input type="hidden" name="ticketDescription" value={JSON.stringify(ticketDescription)} />
        // <input type="hidden" name="ticketDrinksIncluded" value={drinksIncluded ? "drinks inlcuded" :""} />
        // <input type="hidden" name="ticketFoodIncluded" value={drinksIncluded ? "drinks inlcuded" :""} />
        // <input type="hidden" name="ticketFoodIncluded" value={foodIncluded ? "drinks inlcuded" :""} />
        // <input type="hidden" name="ticketPaymentTypes" value={JSON.stringify(paymentTypes)} />
         <Button isIconOnly key={key} className="p-0 my-8 h-[125px] pb-2 bg-transparent sticky top-20 flex w-full box-border-none outline-none data-[focus-visible=true]:z-0 data-[focus-visible=true]:outline-none shadow-none rounded-none"> 

        <Card style={{ filter: 'drop-shadow(2px 2px 2px rgb(109 40 217))'}}
        radius="none" className="hidden box-border-none outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-none shadow-none rounded-none w-full border-none box-border-none p-0 h-[120px] bg-transparent sm:grid sm:col-span-4 sm:col-start-9">
            <Image src={"/TicketBackground.png"} className="absolute z-0" alt={"test"} layout="fill" />
            <CardBody className={"sm:grid sm:grid-cols-12 w-full p-0"}>
                <div className="prose-sm prose-invert text-right col-start-2 col-span-8 container relative flex flex-col justify-around items-center pr-2">
                    
                    <h1 className=" -my-1 text-2xl text-left prose prose-invert">VIP Ticket</h1>
                    
                    <div className="flex flex-col items-center w-full space-y-2">

                        
                        <div className="flex space-x-2 justify-content-middle"> 
                            {drinksIncluded ? <Chip size="sm" color="warning" variant="faded" startContent={<Martini size={15}/>} className="flex ">
                                <p className=" text-tiny "> Included</p>
                            </Chip> : null}
                            {foodIncluded ? <Chip size="sm" color="warning" variant="faded" startContent={<UtensilsCrossed size={15}/>} >
                                <p className="text-tiny"> Included</p>
                            </Chip> : null}

                        </div>
                        <div className="flex space-x-2">
                            {
                                paymentTypesArr.map((paymentType, index) => {
                                    return (
                                        <Chip key={index} size="sm" color="warning" variant="faded" >
                                            <p className="text-tiny">{paymentType.toString()}</p>
                                        </Chip>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="prose-sm dark:prose-invert text-right col-start-10 col-span-3 flex flex-col flex-flow-row justify-center items-end pr-2">
                    <h1 className=" -my-1 text-2xl md:text-3xl lg:text-4xl prose prose-invert text-right">$18</h1>
                    <h1 className="  ml-2 -my-1 text-base prose prose-invert text-right"> .99</h1>
                </div>
            </CardBody>
        </Card>
        </Button>
       
    )
}