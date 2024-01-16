import { Card, CardBody, CardHeader, Chip, Button } from "@nextui-org/react";
import Accordian from "@/components/TicketAccordian/TicketAccordian";
import Image from "next/image";
import { TicketType } from "@prisma/client";
import { Martini, UtensilsCrossed } from "lucide-react";

export interface HTicketCardProps {
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
  };
  _key: number;
  stateKey?: number;
  setSelectedTicket?: React.Dispatch<React.SetStateAction<number>>;
}

const handleCheckout = () => {
  console.log("checkout");
};

export default function TicketCard({
 ticketData: {
    ticketTitle,
    ticketDescription,
    ticketPrice,
    itemsIncluded,
    paymentTypes,
    freeTicket,
    payAtDoorTicket,
    foodIncluded,
    drinksIncluded,
  },
  _key,
  stateKey,
  setSelectedTicket
}: HTicketCardProps) {
  drinksIncluded = true;
  foodIncluded = true;
  console.log(paymentTypes);
  const paymentTypesArr: string[] = paymentTypes.split(",");
  console.log({_key,stateKey});

//   const handlePress = () => {setSelectedTicket(_key)};
  return (
    // <form key={_key} onSubmit={handleCheckout} className="z-0 ">
    //   <input type="hidden" name="ticketId" value={name} />
    //   <input type="hidden" name="ticketPrice" value={price} />
    //   <input
    //     type="hidden"
    //     name="ticketDescription"
    //     value={JSON.stringify(ticketDescription)}
    //   />
    //   <input
    //     type="hidden"
    //     name="ticketDrinksIncluded"
    //     value={drinksIncluded ? "drinks inlcuded" : ""}
    //   />
    //   <input
    //     type="hidden"
    //     name="ticketFoodIncluded"
    //     value={drinksIncluded ? "drinks inlcuded" : ""}
    //   />
    //   <input
    //     type="hidden"
    //     name="ticketFoodIncluded"
    //     value={foodIncluded ? "drinks inlcuded" : ""}
    //   />
    //   <input
    //     type="hidden"
    //     name="ticketPaymentTypes"
    //     value={JSON.stringify(paymentTypes)}
    //   />

        <Card 
        style={{ filter: 'drop-shadow(0px 3px 3px rgb(109 40 217))'}}
        className={`h-[300px] w-[150px] bg-opacity-0 box-border-none outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-none shadow-none rounded-none border-none box-border-none p-0 `}>
          <Image
            src={"/TicketBackgroundV.png"}
            className={`absolute z-0 object-fill border-none box-border-none shadow-xl shadow-violet-700 `}
            alt={"test"}
            fill
          />
          <CardBody
            className={"container bg-opacity-0 boder-none box-border-none flex w-full flex-col overflow-hidden pb-10 px-0"}
          >
            <div className="mt-6 w-full">
                <div className=" flex justify-center">

                    <h1 className="text-black bg-slate-200 font-bold text-center text-2xl">{ticketTitle}</h1>
                </div>
            </div>
            <div className="justify-center mt-4 flex flex-wrap items-center space-x-1 space-y-1">
              {drinksIncluded ? (
                <Chip
                  size="sm"
                  color="warning"
                  variant="faded"
                  startContent={<Martini size={15} />}
                  className="flex "
                >
                  <p className=" text-tiny "> Included</p>
                </Chip>
              ) : null}
              {foodIncluded ? (
                <Chip
                  size="sm"
                  color="warning"
                  variant="faded"
                  startContent={<UtensilsCrossed size={15} />}
                >
                  <p className="text-tiny"> Included</p>
                </Chip>
              ) : null}
              {paymentTypesArr.map((paymentType) => {
                return (
                  <Chip size="sm" color="warning" variant="faded">
                    <p className="text-tiny">{paymentType.toString()}</p>
                  </Chip>
                );
              })}
            </div>


            <div className=" absolute bottom-3 flex w-full justify-center text-center ">
              <h1 className="mr-2 text-4xl">${parseInt(ticketPrice) - 1}</h1>
              <h1 className="mr-2">.99</h1>
            </div>
          </CardBody>
        </Card>
    // </form>
  );
}
