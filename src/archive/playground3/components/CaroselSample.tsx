"use client"
// import { Card, CardContent } from "@/../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/../components/ui/carousel"
import Card from "@/components/cards/experimental/Card"


export default function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="lg:max-w-11/12 md:max-w-10/12 flex ml-auto"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="lg:basis-1/3" >
            <div className="flex aspect-square items-center justify-center ">
              <Card props={""}>
                {/* <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent> */}
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
