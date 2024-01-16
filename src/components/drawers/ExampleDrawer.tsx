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
import { usePress } from "react-aria"
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
  const [open, setOpen] = useState(false);
  // const [clientSecret, setClientSecret] = useState('');
  const router = useRouter();
  const { pressProps } = usePress({
    onPressStart: (e) => {
      if(!open) {setOpen(true);}
    },
    
    onPress: (e) => {
      if(!open) {setOpen(true);}
    }
  });
  
  
  const [selectedTicket, setSelectedTicket] = useState(-1)
  const [selectedTicketData, setSelectedTicketData] = useState<HTicketCardProps['ticket'] | undefined>();
  const ticketArr:Array<TicketType> = tickets as Array<TicketType>;

  const sendFreeTicket = api.ticket.sendFreeTicket.useMutation({
    onError: (error:any) => {
      console.log("TICKET NOT SENT!");
      console.log(error)
      toast.error('TICKET NOT SENT, you may already have this ticket or need to sign in as an email is required to fulfill the ticket')
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
        toast.loading('Sending Ticket to your email, please wait...')
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
        toast.error('Something went wrong, you may not be signed in or already have this ticket')
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
    toast.loading('Loading Secure Stripe checkout, please wait...')
    router.push(`/checkout?id=${tickets[selectedTicket]?.id}`)
  }

  return (
    <Drawer   
      open={open}
      onOpenChange={setOpen}
      
      >
    
    
      <DrawerTrigger asChild>
        <Button 
          {...pressProps}
          className="fixed prose-sm rounded-t-2xl bottom-0 dark:outline-zinc-600 dark:outline-2 dark:border-2 w-full h-[75px] shadow-lg z-10" variant="outline">
            <span className="h-[8px] w-[100px] top-4 rounded-full bg-zinc-300 dark:bg-zinc-600 absolute  flex">
                <span className="absolute h-[30px] bg-black-700 top-5" ></span>
                
            </span>
            {/* <div className="-translate-x-4">
                <FingerprintIcon className=" mt-2 animate-bounce " stroke={"#e114e5"} size={32}/>
            </div> */}
            <h1 className="mt-3">
                <span className="bg-primary font-extrabold bg-clip-text text-transparent">
                    View Tickets
                </span>        
            </h1>
        </Button>
      </DrawerTrigger>
      <DrawerContent >
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Tickets</DrawerTitle>
            <DrawerDescription> Click ticket to select </DrawerDescription>
          </DrawerHeader>
          <div className="w-full my-2 max-h-[400px]">
            <SideScrollRoot spacing="space-y-4" vertical className="p-2 max-h-[350px]"
              tickets={ticketArr} setSelectedTicket={setSelectedTicket} stateKey={selectedTicket} selectedTicketData={selectedTicketData} setSelectedTicketData={setSelectedTicketData}/>
          </div>
          <DrawerFooter className="py-0">
            <form onSubmit={(e)=>{
              e.preventDefault();
              handleSubmit();
              
            }}>

            <div className="w-full grid grid-cols-2 h-[105px] items-center" >
              <div className="flex space-x-2 items-center">
                  {
                  selectedTicket >=0 ? 
                  <h1 className="text-2xl text-primary font-bold">Total: </h1>
                  : 
                  <h1 className="text-xl text-primary font-bold">None Selected</h1>
                  }
                  {/* <h1 className="text-2xl text-primary font-bold">Total: </h1> */}
                  {
                  selectedTicket >=0 ? 
                    <h1 className="text-2xl dark:text-slate-200/70 text-slate-800/70 font-bold">{selectedTicketData?.price ? ` $${selectedTicketData.price - 1 + 0.99}` : "FREE"}</h1>
                    : 
                    null
                  }
                </div>
              {
                selectedTicketData?.paymentTypes.includes("Cash") ?
                // <div className="grid grid-cols-2 gap-2">
                //   <div className="flex flex-col w-full items-center">
                //     <NButton variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCashCheckout}>
                //         <Banknote />
                //     </NButton>
                //     <p>Cash</p>
                //   </div>
                //   <div className="flex flex-col w-full items-center"> 
                //     <NButton variant="faded" size={"lg"} className={"w-full"} isIconOnly radius="sm" color="primary" onPress={handleCC}>
                //       <CreditCard />
                //     </NButton>
                //     <p>Credit</p>
                //   </div>
                // </div>
                <NButton variant="faded" className=" prose prose-lg dark:prose-invert" startContent={<Ticket className="mr-4"/>} radius="sm" color="primary" onPress={handleCashCheckout}>
                  <p className="font-bold text-size-xl my-0">Get Ticket</p>
                </NButton>
              : <NButton variant="faded" className=" prose prose-lg dark:prose-invert" startContent={<Ticket className="mr-4"/>} radius="sm" color="primary" onPress={handleCC}>
                  <p className="font-bold text-size-xl my-0">Get Ticket</p>
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
