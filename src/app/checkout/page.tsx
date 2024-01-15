
// import { getServerAuthSession } from "@/server/auth";
import dynamic from "next/dynamic";
// import Checkout from "@/app/checkout/components/checkout"
const Checkout = dynamic(() => import('@/app/checkout/components/checkout'), { ssr: false });
export interface StripeEvent {
  id : string,
}

export default async function comp(
  {
    searchParams,
  }: {
    searchParams: StripeEvent;
  }
) {
//   const session = getServerAuthSession()
  // const ticketId = searchParams.id;
  // const data = await api.ticket.getTicketAndEventById.query({ticketId: ticketId});
  return (
    <section className={"w-full h-full"}>
      <Checkout  />
    </section>
  )
}