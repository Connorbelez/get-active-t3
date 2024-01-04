"use client"
import { signIn } from "next-auth/react";
import {Button } from "@nextui-org/react";
export default function comp() {

    return (
        <Button
        aria-label="profile"
        onPress={()=>{void signIn("discord")}}
        variant="flat"
        color="primary"
      >
        Sign In
      </Button>
    )
}