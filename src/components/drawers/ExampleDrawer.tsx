"use client"
import {useState}from "react"
// import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
// import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { FingerprintIcon } from "lucide-react"
import { button as Button} from "@/components/ui/button"
import VTicketCard from "@/components/cards/prod/VTicketCard"
import SideScrollRoot from "@/components/SideScroll/SideScrollRoot"
import SideScrollComponent from "@/components/SideScroll/SideScrollComponent"
import { Ticket, Banknote, CreditCard } from "lucide-react"
import {toast} from "sonner"
// import {env} from "@/env"
// import {Modal, ModalBody, ModalContent, ModalFooter, Popover, PopoverContent, useDisclosure} from "@nextui-org/react"
import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {api} from "@/trpc/react"
// import { set } from "zod"
// import { c } from "@vercel/blob/dist/put-FLtdezzu.cjs"
import { TicketType } from "@prisma/client"
import {Button as NButton} from "@nextui-org/react"
import { HTicketCardProps } from "../cards/prod/HTicketCard"

// import { loadStripe } from '@stripe/stripe-js';
// import {
//   EmbeddedCheckoutProvider,
//   EmbeddedCheckout
// } from '@stripe/react-stripe-js';
import { useRouter } from "next/navigation"
// import { StripeEvent } from "@/app/checkout/page";

// const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLABLE_KEY);
interface TicketProps {
  tickets : Array<TicketType>;
  eventName: string;
  eventLocation: string;
  eventHeroImage: string;
}



export default function DrawerDemo({tickets,eventName,eventLocation, eventHeroImage}:TicketProps) {
  // const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState(-1)
  // const [clientSecret, setClientSecret] = useState('');
  const router = useRouter();

  // console.table(tickets)
  // console.log('tickets from drawer')
  // console.log(tickets)
  // console.log(typeof tickets)
  // console.log('Is tickets an array:', Array.isArray(tickets));
  // const [selectedTicketData, setSelectedTicketData] = useState<HTicketCardProps['ticket']>();
  const [selectedTicketData, setSelectedTicketData] = useState<HTicketCardProps['ticket'] | undefined>();
  const ticketArr:Array<TicketType> = tickets as Array<TicketType>;
  // console.log('Is ticketArr an array:', Array.isArray(ticketArr));
  // const ticket:TicketType = tickets[0]!;
  const sendFreeTicket = api.ticket.sendFreeTicket.useMutation({
    onError: (error:any) => {
      console.log("TICKET NOT SENT!");
      console.log(error)
      toast.error('TICKET NOT SENT PLEASE SIGN IN')
      return 0;
    },
    onSuccess: () => {
      console.log('ticket sent')
      toast.success('Ticket Sent')
      return 1
    },
    onSettled: () => {
      console.log('ticket Settled')
      return 1
    }

  });
  

  const handleCashCheckout = () => {

      try{
        if (typeof selectedTicket === 'undefined' || !tickets[selectedTicket]?.id) throw new Error('No ticket selected');

        console.log(selectedTicketData)
          sendFreeTicket.mutate({
            ticketId: tickets[selectedTicket]?.id as string,
          })

    }catch( error : any) {
      console.log("CAUGHT ERROR: ")
      if (error.message === 'No ticket selected'){
        toast.error('No ticket selected')
      }
      else{
        toast.error('Please Sign In to Continue')
      }
      console.log(error)
    }
    console.log("DONE")
    
  
  }

  const handleSubmit = () => {
    try{
      if (typeof selectedTicket === 'undefined' || !tickets[selectedTicket]?.id) throw new Error('No ticket selected');
      console.log("SENDING TICKET")
      console.log(selectedTicketData)
      if(selectedTicketData?.price === 0){

        sendFreeTicket.mutate({
          ticketId: tickets[selectedTicket]?.id as string,
        })
      }else{
        //CHECKOUT
        router.push(`/checkout?id=${tickets[selectedTicket]?.id}`)
      }

  }catch( error : any) {
    console.log("CAUGHT ERROR: ")
    if (error.message === 'No ticket selected'){
      toast.error('No ticket selected')
    }
    else{
      toast.error('Please Sign In to Continue')
    }
    console.log(error)
  }
  console.log("DONE")
  }


  const handleCC = () => {
    router.push(`/checkout?id=${tickets[selectedTicket]?.id}`)
  }

  return (
    <Drawer   
    
    >
      <DrawerTrigger asChild>
        <Button className="fixed prose-sm rounded-t-2xl bottom-0 w-full h-[75px] z-10" variant="outline">
            <span className="h-[8px] w-[100px] top-4 rounded-full bg-zinc-300 dark:bg-zinc-600 absolute  flex">
                <span className="absolute h-[30px] bg-black-700 top-5" ></span>
                
            </span>
            {/* <div className="-translate-x-4">
                <FingerprintIcon className=" mt-2 animate-bounce " stroke={"#e114e5"} size={32}/>
            </div> */}
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
          <SideScrollRoot spacing="space-y-4" vertical className="p-2">
            {ticketArr.map((ticket, index) => (
              <SideScrollComponent key={index}>
                <VTicketCard selectedTicketData={selectedTicketData} setSelectedTicketData={setSelectedTicketData} setSelectedTicket={setSelectedTicket} ticketData={ticket} _key={index} stateKey={selectedTicket} />
              </SideScrollComponent>
              ))}
          </SideScrollRoot>
          </div>
          <DrawerFooter>
            <form onSubmit={(e)=>{
              e.preventDefault();
              handleSubmit();
              
            }}>

            <div className="w-full grid grid-cols-2">
              <div className="flex space-x-2 items-center">
              {
                 selectedTicket >=0 ? 
                 <h1 className="text-2xl text-primary font-bold">Total: </h1>
                 : 
                  null
                }
                {/* <h1 className="text-2xl text-primary font-bold">Total: </h1> */}
                {
                 selectedTicket >=0 ? 
                  <h1 className="text-2xl text-slate-200/70  font-bold">{selectedTicketData?.price ? ` $${selectedTicketData.price - 1 + 0.99}` : "FREE"}</h1>
                  : 
                  null
                }
              </div>
            {
              selectedTicketData?.paymentTypes.includes("Cash") ?
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col w-full items-center">
                  <NButton variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCashCheckout}>
                      <Banknote />
                  </NButton>
                  <p>Cash</p>
                </div>
                <div className="flex flex-col w-full items-center"> 
                  <NButton variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCC}>
                    <CreditCard />
                  </NButton>
                  <p>Credit</p>
                </div>
              </div>
             : <NButton variant="faded" className=" prose prose-lg dark:prose-invert" startContent={<Ticket className="mr-4"/>} radius="sm" color="primary" type={"submit"}>
                <p className="font-bold text-size-xl my-0">Checkout</p>
              </NButton>
              }
            </div>
           </form>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
