import { Dispatch, SetStateAction, createContext } from "react";
import React from "react";

export default function OrdersLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (

      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        {/* <nav></nav> */}
        {children}

        
      </section>

  )
}