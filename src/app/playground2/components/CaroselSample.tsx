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
      className="w-9/12 max-w-lg mx-auto"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="" >
            <div className=" flex aspect-square items-center justify-center p-4">
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
