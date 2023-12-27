import {
  Image,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Divider,
} from "@nextui-org/react";

import Drawer from "@/components/drawers/ExampleDrawer";
import { MapPin, MapPinned, Clock1, TicketIcon } from "lucide-react";
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import Wrapper from "../_components/Providers";
import BlurredEdgeHero from "@/components/Hero/BluredEdgeHero";
import { getServerAuthSession } from "@/server/auth";
import MapAccordian from "@/components/MapAccordian/MapAccordian";
import Accordian from "@/components/MapAccordian/MapAccordian";
interface compProps {}

export default function comp({ props }: { props: compProps }) {
  const imageUrl = "/testHero.jpeg";
  // const session = await getServerAuthSession();
  // const user = session?.user
  // const event_creator = {
  //     image: ,
  //     username: creatorUsername,
  // }
  const event_creator = {
    image:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    username: "CreatorUsername",
  };
  return (
    <div className="EventWrapper bg-background w-full flex flex-col items-center ">
        <div className="w-full max-w-6xl">

        
        <BlurredEdgeHero
          src={imageUrl}
          alt={"test"}
          maxH={450}
          maxW={"6xl"}
        />
        </div>

        <div className="Event Detail Wrapper w-full max-w-6xl px-6 md:px-4 lg:px-1">

        <section
          id="Event Details Wrapper"
          className={
            "my-12 flex flex-col md:gap-4 leading-none md:grid md:grid-cols-12"
          }
        >
        <div className="mf:col-start-1 md:col-span-8 ">
            <div className="IconBar prose flex w-full flex-row text-left font-bold dark:prose-invert ">
                <p>Saturday January 27</p>
            </div>

            <article className="Heading prose lg:prose-xl prose-zinc mb-8 tracking-tighter antialiased dark:prose-invert">
                <h1 className="lg:-mb-2 -mb-1 py-0 -mt-1">"AKIMBO MODE" boxing gala</h1>
                <p className="prose-sm font-bold tracking-normal ">
                Come encourage the region's athletes during high-intensity fights
                on January 27!
                </p>
            </article>

            <div className="flex justify-center">
            <Card
                className={
                "mb-12 grid w-11/12 grid-flow-col bg-zinc-200 p-2 outline-1 outline-zinc-200 dark:bg-zinc-800 dark:outline-zinc-800"
                }
            >
                <div className={"flex flex-row items-center align-middle"}>
                <Image
                    src={event_creator.image}
                    alt={"Creator avatar"}
                    width={50}
                    height={50}
                    className={
                    "justify-self-left col-start-1 ml-2 rounded-xl shadow-lg shadow-violet-700/50"
                    }
                />
                <p className={"justify-self-left ml-4"}>
                    {event_creator.username}
                </p>
                </div>
                <div className={"flex w-full items-center justify-end"}>
                <Button className={"mr-4 w-1/2 bg-primary"}>
                    <p className={"text-zinc-200 opacity-100 dark:text-zinc-800"}>
                    Follow
                    </p>
                </Button>
                </div>
            </Card>
            </div>
            <div className="DateNTime mb-16 flex w-full flex-col text-left font-bold">
                <div className="prose mb-4 dark:prose-invert">
                    <h2>Time and Date</h2>
                </div>
                <div className="flex w-full px-2 flex-row items-center">
                    <i className="mr-1 h-[24px] w-[24px]">
                        <CalendarIcon height={20} width={20} />
                    </i>

                    <p className=" font-mono text-sm">
                        {" "}
                        Sat Jan 27 2023: 7:00pm - 10:00pm EST
                    </p>
                </div>
            </div>

            <div className="Place mb-16 flex w-full flex-col text-left font-bold">
                <div className="prose mb-4 dark:prose-invert">
                    <h2>Place</h2>
                </div>
                <div className="flex w-full flex-col items-center">
                    <div className="flex w-full flex-row items-center px-2">
                        <i className="mr-1 h-[24px] w-[24px] self-start">
                        <MapPinned height={20} width={20} />
                        </i>
                        <div className="prose w-full max-w-6xl tracking-tighter antialiased dark:prose-invert ">
                        <p className=" mb-2 font-mono text-sm font-bold">
                            480 Rue des Pins
                        </p>
                        <p className=" my-2 font-mono text-sm text-zinc-900/40 dark:text-zinc-200/40">
                            480 Rue des Pins Gatineau, QC J8L 2L3
                        </p>
                        </div>
                    </div>
                </div>
                <div className="According Wrapper mt-2 px-4 w-full max-w-11/12 flex justify-center">
                    <MapAccordian />
                </div>
            </div>

            <div
                className={"About Event flex w-full max-w-6xl flex-col space-y-4"}
            >
                <div className="prose w-full text-left tracking-tighter antialiased dark:prose-invert  ">
                    <h2>About Event</h2>
                </div>
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">

                <div className="flex items-center prose dark:prose-invert space-x-4">
                        <Card className={"h-[48px] w-[48px] flex-shrink-0"}>
                            <CardBody>
                                <Clock1 size={24} />
                            </CardBody>
                        </Card>
                        <h2 className="my-0 py-0" >4 Hours</h2>

                    </div>
                    
                    <div className="flex items-center prose dark:prose-invert space-x-4 lg:pr-8">
                        <Card className={"h-[48px] w-[48px] flex-shrink-0"}>
                            <CardBody>
                                <TicketIcon size={24} />
                            </CardBody>
                        </Card>
                        <h2 className="my-0 py-0" >Pay at Door or Digital Ticket</h2>
                    </div>
                </div>
            </div>
        </div>

            <Card className="hidden w-full max-h-48  sticky top-20 md:flex items-center md:col-span-4 my-16 md:col-start-9">
                <CardBody>
                    <Accordian/>
                </CardBody>
            </Card>

        

        <div className="w-full my-12 md:col-span-8">
         <Divider className="" />
        </div>

        <article className="prose prose-sm md:col-span-8 dark:prose-invert">
            <h1>"AKIMBO MODE" boxing gala</h1>
            <h4>Come encourage the region's athletes during high-intensity fights on January 27!</h4>
            <p> Event description</p>

        </article>

        

        </section>
        </div>
        <div className="flex justify-center w-full ">
            <Drawer />
        </div>
        
    </div>
  );
}
