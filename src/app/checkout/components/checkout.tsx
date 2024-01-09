"use client"
import React, { use, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
// import { api} from "@/trpc/react"
import {env} from "@/env"
const stripePromise = loadStripe("pk_test_51NONQvAXXlLBfJHexvf9ugcgekjtDMxhZcVjcq4k0XuJp8oKT4mjPhkaawCeP9YbmjZPyegw25JoLTbApTSWaG6s00wjhlDdBN");
import { useSearchParams } from 'next/navigation'
// import { get } from 'http';
// import { StripeEvent } from '../page';

export default function App() {
  const [clientSecret, setClientSecret] = useState('');
  const [tempClientSecret, setTempClientSecret] = useState();
  const [doneLoading, setDoneLoading] = useState(false);
  const searchParams = useSearchParams();
  if(!searchParams) return null;
  const ticketId = searchParams.get('id');
  // const eventId = searchParams.get('eventid');
  // const eventName = searchParams.get('eventname');
  //ToDo Convert to use trpc
  if(!ticketId) throw new Error('NO TICKET ID IN URL');
  useEffect(() => {

    console.log('TICKET FROM USE EFFECT: ', ticketId )
    if(!ticketId) throw new Error('NO TICKET ID IN URL');
    void fetch("/api/checkout_sessions", {
      method: "POST",
        body: JSON.stringify({ticketId: ticketId}),
    })
      .then((res) => {
        console.log('res from fetch')
        console.log(res)
        console.table(res)
        return res
      })
      .then((data) => {
        return data.json().then((dataJson) => {
          // console.log('client Secret: ')
          // console.log(dataJson.clientSecret)
          setTempClientSecret(dataJson.clientSecret)
        })
      })
      .then(() => setDoneLoading(true))
      // .then((data) => setClientSecret(data.clientSecret));
  }, [ticketId]);

  useEffect(() => {
    console.log('tempClientSecret')
    console.log(tempClientSecret)
    if(tempClientSecret) setClientSecret(tempClientSecret)
  }, [tempClientSecret]);

  if (clientSecret.length < 5 || !doneLoading) {
    return (<>Still loading...</>)
  }

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}