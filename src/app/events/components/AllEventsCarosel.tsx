import Carosel from "./CaroselSample";
// import SideScrollRoot from "@/components/SideScroll/SideScrollRoot";
import Card from "@/components/cards/experimental/Card";
// import SideScrollComponent from "@/components/SideScroll/SideScrollComponent";
// interface compProps {

// }

export default function comp() {

    return (
        <div className="my-16 grid grid-flow-row grid-cols-12 justify-items-center gap-y-5">
        
        <div className="z-10 col-span-12 col-start-1 row-start-1 mt-16 flex flex-col ">
          <h2 className="prose mx-auto mb-8 text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#c7c4fc] to-[#E114E5] bg-clip-text text-transparent">
              All Events
            </span>
          </h2>
        </div>

        <div className="container col-span-12 sm:col-span-10 overflow-hidden sm:col-start-2 px-4 sm:px-0">
          <div className="snap-mandatory col-span-12 snap-x overflow-x-scroll space-x-8 flex flex-row flex-shrink-0">
            <div className="col-span-5 w-full flex-shrink-0">

            </div>
            <div className="snap-center touch-pan-x flex-shrink-0 col-span-5">
              <Card href="events/event" >
                  
                  {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent> */}
                </Card>
            </div>
            <div className="snap-center touch-pan-x flex-shrink-0 col-span-5">
            <Card href="events/event" >
                  
                  {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent> */}
                </Card>            </div>
            <div className="snap-center touch-pan-x flex-shrink-0 col-span-5">
            <Card href="events/event" >
                  
                  {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent> */}
                </Card>            
                </div>
            <div className="snap-center touch-pan-x flex-shrink-0  col-span-5">
            <Card href="events/event" >
                  
                  {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent> */}
                </Card>            
                </div>
            <div className="snap-center touch-pan-x flex-shrink-0 col-span-5">
            <Card href="events/event" >
                  
                  {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  </CardContent> */}
                </Card>            </div>
            <div className="col-span-5 w-full flex-shrink-0">
            </div>
          </div>
          {/* <SideScrollRoot spacing="space-x-8 w-full" >
            <SideScrollComponent>
              <img className="flex-shrink-0 w-[300px]" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
            </SideScrollComponent>
            <SideScrollComponent>
              <img className="flex-shrink-0 w-[300px]" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />

            </SideScrollComponent>
            <SideScrollComponent>
              <img className="flex-shrink-0 w-[300px]" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />

            </SideScrollComponent>
            <SideScrollComponent>
              <img className="flex-shrink-0 w-[300px]" src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />

            </SideScrollComponent>
          </SideScrollRoot> */}

        </div>

        <div className="z-10 col-span-12  col-start-1 mt-8 flex flex-col ">
          <h2 className="prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              Philanthropy Events
            </span>
          </h2>
        </div>
        
        <div className="container col-span-10 col-start-2 px-4 sm:px-0">
          <Carosel />
        </div>

        <div className="z-10 col-span-12 col-start-1 mt-8 flex flex-col ">
          <h2 className="prose mx-auto text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              Open Events
            </span>
          </h2>
        </div>
        <div className="container col-span-10 col-start-2 px-4 sm:px-0">
          <Carosel />
        </div>
      </div>
    )
}