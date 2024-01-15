"use client"
import { Card, CardBody, CardHeader, Chip, Button } from "@nextui-org/react";
import Accordian from "@/components/TicketAccordian/TicketAccordian";
import Image from "next/image";
import { TicketType } from "@prisma/client";
import { Martini, UtensilsCrossed } from "lucide-react";
import { set } from "zod";
import { useEffect } from "react";

export interface HTicketCardProps {
  ticket: TicketType;
  event:any;
  _key: number;
  selectedTicket: number;
  setSelectedTicket: React.Dispatch<React.SetStateAction<number>>;
  setSelectedTicketData: React.Dispatch<
    React.SetStateAction<TicketType | undefined>
  >;
}


const handleCheckout = () => {
  console.log("checkout");
};

export default function TicketCard({
  ticket: {
    name,
    price,
    paymentTypes,
    drinksIncluded,
    foodIncluded,
    ticketDescription,
    stripePriceId,
    payAtDoorTicket,
    paymentOweing,
  },
  _key,
  selectedTicket,
  setSelectedTicket,
  setSelectedTicketData,
  event:any
}: HTicketCardProps) {
  console.log("NAME: ",name)
  if( !name ){
    console.log("RETURNING NULL")
    return null;
  }
  drinksIncluded = true;
  foodIncluded = true;
  console.table(paymentTypes);
  console.log("TICKET KEY: ", _key);
  let paymentTypesArr: string[] = [];
  if( !paymentTypes ){
    paymentTypesArr = ["Cash"]
  }else{

   paymentTypesArr = paymentTypes.split(",");
  }
  const handlePress = () => {
    selectedTicket === _key ? setSelectedTicket(-1) : setSelectedTicket(_key);
    selectedTicket === _key
      ? setSelectedTicketData(undefined)
      : setSelectedTicketData({
          name: name,
          price: price,
          paymentTypes: paymentTypes,
          drinksIncluded: drinksIncluded,
          foodIncluded: foodIncluded,
          ticketDescription: ticketDescription,
          eventId: "HARDCODED",
          id: "HARDCODED",
          paymentOweing: paymentOweing,
          logo: "HARDCODED",
          stripePriceId: stripePriceId,
          payAtDoorTicket: payAtDoorTicket,
        });
        console.log("selectedTicket: ",selectedTicket);
        console.log("key: ",_key);
        console.log(_key==selectedTicket )
  };
  let cname : string = "box-border-none  my-8 flex h-[125px] w-full rounded-none p-0 pb-2 shadow-none outline-none "+`${_key==selectedTicket ? "ring-2 ring-violet-700" : ""}`;
  useEffect(() => {
    cname = "box-border-none flex h-[125px] w-full rounded-none p-0 pb-2 shadow-none outline-none "+`${_key==selectedTicket ? "ring-2 ring-violet-700" : ""}`
  }, [selectedTicket])

  return (
    // <form onSubmit={handleCheckout} className="z-0">
    // <input type="hidden" name="ticketId" value={name} />
    // <input type="hidden" name="ticketPrice" value={price} />
    // <input type="hidden" name="ticketDescription" value={JSON.stringify(ticketDescription)} />
    // <input type="hidden" name="ticketDrinksIncluded" value={drinksIncluded ? "drinks inlcuded" :""} />
    // <input type="hidden" name="ticketFoodIncluded" value={drinksIncluded ? "drinks inlcuded" :""} />
    // <input type="hidden" name="ticketFoodIncluded" value={foodIncluded ? "drinks inlcuded" :""} />
    // <input type="hidden" name="ticketPaymentTypes" value={JSON.stringify(paymentTypes)} />
    // className={"box-border-none sticky top-20 my-8 flex h-[125px] w-full rounded-none bg-transparent p-0 pb-2 shadow-none outline-none data-[focus-visible=true]:z-0 data-[focus-visible=true]:outline-none"+`${_key==stateKey ? "ring-2 ring-violet-700" : ""}`
    <div className={`w-full mx-1 p-1 h-full rounded-lg flex ${_key == selectedTicket ? "" : ""}`}>

    
        <Button
        isIconOnly
        key={_key}
        onPress={handlePress}
        className={"box-border-none flex bg-transparent h-[125px] w-full rounded-none p-0 pb-2 shadow-none outline-none " }>
      <Card
        style={ _key == selectedTicket ? { filter: "drop-shadow(2px 2px 2px rgb(109 40 217))" } : {}}
        radius="none"
        className="box-border-none  box-border-none h-[120px] w-full rounded-none border-none  p-0 shadow-none outline-none grid"
      >
        <Image
          src={"/TicketBackground.png"}
          className="absolute "
          alt={"test"}
          layout="fill"
        />
        <CardBody className={"w-full p-0 grid grid-cols-12"}>
          <div className="container prose-sm prose-invert relative col-span-8 col-start-2 flex flex-col items-center justify-around pr-2 text-right">
            <h1 className=" prose prose-invert -my-1 text-left text-2xl">
              {name}
            </h1>

            <div className="flex w-full flex-col items-center space-y-2">
              <div className="justify-content-middle flex space-x-2">
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
              </div>
              <div className="flex space-x-2">
                {paymentTypesArr.map((paymentType, index) => {
                  return (
                    <Chip key={index} size="sm" color="warning" variant="faded">
                      <p className="text-tiny">{paymentType.toString()}</p>
                    </Chip>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-flow-row prose-sm col-span-3 col-start-10 flex flex-col items-end justify-center pr-2 text-right dark:prose-invert">
            <h1 className=" prose prose-invert -my-1 text-right text-2xl md:text-3xl lg:text-4xl">
                ${price-1}
            </h1>
            <h1 className="  prose prose-invert -my-1 ml-2 text-right text-base">
              {" "}
              .99
            </h1>
          </div>
        </CardBody>
      </Card>
        </Button>
    </div>
  );
}
