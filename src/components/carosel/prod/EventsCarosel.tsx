"use client"
// import { Card, CardContent } from "@/../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Card from "@/components/cards/prod/EventCard"
import {Event} from "@prisma/client"

export default function CarouselSize({CardArray}:{CardArray:Event[]}) {
  const className = CardArray.length > 2 ? "lg:basis-1/2 xl:basis-1/3" : ""
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="lg:max-w-11/12 md:max-w-10/12"
    >
      <CarouselContent>
        {CardArray.map((eventData, index) => (
          <CarouselItem key={index} className={className} >
            <div className="flex aspect-square items-center justify-center ">
              <Card event={eventData} >
                
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
