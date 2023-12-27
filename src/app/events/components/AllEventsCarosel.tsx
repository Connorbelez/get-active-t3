import Carosel from "./CaroselSample";

interface compProps {

}

export default function comp({props}: {props: compProps}) {

    return (
        <div className="my-16 grid grid-flow-row grid-cols-12 justify-items-center gap-y-5">
        
        <div className="z-10 col-span-12 col-start-1 row-start-1 mt-16 flex flex-col ">
          <h2 className="prose mx-auto mb-8 text-4xl font-extrabold dark:prose-invert md:text-5xl">
            <span className="bg-gradient-to-r from-[#4F46E5] to-[#E114E5] bg-clip-text text-transparent">
              All Events
            </span>
          </h2>
        </div>

        <div className="container col-span-10 col-start-2 px-4 sm:px-0">
          <Carosel />
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