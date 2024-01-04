"use client"
import {useState }from "react"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { FingerprintIcon } from "lucide-react"
import { button as Button} from "@/components/ui/button"
import VTicketCard from "@/components/cards/prod/VTicketCard"
import SideScrollRoot from "@/components/SideScroll/SideScrollRoot"
import SideScrollComponent from "@/components/SideScroll/SideScrollComponent"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {api} from "@/trpc/react"
import { set } from "zod"
import { c } from "@vercel/blob/dist/put-FLtdezzu.cjs"
import { TicketType } from "@prisma/client"
import {Button as NButton} from "@nextui-org/react"

interface TicketProps {
  tickets : Array<TicketType>
}



export default function DrawerDemo({tickets}:TicketProps) {
  const [selectedTicket, setSelectedTicket] = useState(0)
  // console.table(tickets)
  // console.log('tickets from drawer')
  // console.log(tickets)
  // console.log(typeof tickets)
  // console.log('Is tickets an array:', Array.isArray(tickets));
  
  const ticketArr:Array<TicketType> = tickets as Array<TicketType>;
  // console.log('Is ticketArr an array:', Array.isArray(ticketArr));
  // const ticket:TicketType = tickets[0]!;
  const sendFreeTicket = api.ticket.sendFreeTicket.useMutation({
    onError: (error:any) => {
      console.log("TICKET NOT SENT!");
      console.log(error)
      alert("You must login first")
    },
    onSuccess: () => {
      console.log('ticket sent')
    },
    onSettled: () => {
      console.log('ticket Settled')
    }
  });
  
  return (
    <Drawer   
    >
      <DrawerTrigger asChild>
        <Button className="fixed prose-sm rounded-t-2xl bottom-0 w-full h-[75px] z-10" variant="outline">
            <span className="h-[8px] w-[100px] top-4 rounded-full bg-zinc-300 dark:bg-zinc-600 absolute  flex">
                <span className="absolute h-[30px] bg-black-700 top-5" ></span>
                
            </span>
            <div className="-translate-x-4">
                <FingerprintIcon className=" mt-2 animate-bounce " stroke={"#e114e5"} size={32}/>
            </div>
            <h1 className="mt-3">
                <span className="bg-gradient-to-r font-bold from-[#4F46E5] to-[#e114e5] bg-clip-text text-transparent">
                    Get Tickets
                </span>        
            </h1>
        </Button>
      </DrawerTrigger>
      <DrawerContent >
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Tickets</DrawerTitle>
            <DrawerDescription>Ticket Section </DrawerDescription>
          </DrawerHeader>
          {/* <div className="flex py-4 mx-2 space-x-4 overflow-x-scroll">
            {ticketArr.map((ticket, index) => (
              <div className={'flex'}>
                <VTicketCard setSelectedTicket={setSelectedTicket} ticketData={ticket} _key={index} stateKey={selectedTicket} />
              </div>
            ))}
            
          </div> */}
          <div className="w-full my-2">
          <SideScrollRoot className="p-2">
            {ticketArr.map((ticket, index) => (
              <SideScrollComponent>
                <VTicketCard setSelectedTicket={setSelectedTicket} ticketData={ticket} _key={index} stateKey={selectedTicket} />
              </SideScrollComponent>
              ))}
          </SideScrollRoot>
          </div>
          <DrawerFooter>
            <form onSubmit={(e)=>{
              e.preventDefault();
              
              if (typeof selectedTicket === 'undefined' || !tickets[selectedTicket]?.id) throw new Error('No ticket selected');
              
              try{
                  console.log("SENDING TICKET")
                  sendFreeTicket.mutate({
                    ticket:{
                      name: tickets[selectedTicket]?.name as string,
                      ticketDescription: tickets[selectedTicket]?.ticketDescription as {description:string},
                      price: tickets[selectedTicket]?.price as number,
                      drinksIncluded: tickets[selectedTicket]?.drinksIncluded as boolean,
                      foodIncluded: tickets[selectedTicket]?.foodIncluded as boolean,
                      paymentTypes: tickets[selectedTicket]?.paymentTypes as string,
                      logo:"",
                    },
                    paymentOweing: false,
                    eventName: "CHANGE THIS HARDCODED VALUE",
                    recipientEmail: "connor.belez@gmail.com",
                    eventLocation: "CHANGE THIS HARDCODED VALUE",
                  })
              }catch( e : any) {
                console.log("CAUGHT ERROR: ")
                console.log(e)
              }
              console.log("DONE")
              
            }}>

            <NButton variant="faded" radius="sm" color="warning" className="" type={"submit"}>Submit</NButton>
              
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
           </form>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
