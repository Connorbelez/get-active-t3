"use client"
import { signIn } from "next-auth/react";
import {Button } from "@/components/ClientNextUI";
export default function comp() {

    return (
        <Button
        aria-label="profile"
        onPress={()=>{void signIn()}}
        variant="flat"
        color="primary"
      >
        Sign In
      </Button>
    )
}