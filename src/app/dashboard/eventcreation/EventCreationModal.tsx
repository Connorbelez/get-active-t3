"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {title} from "@/ui/primitives/text";

export default function App({onCreate, formData}:{onCreate:any,formData:any})  {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    if(formData.ticketDataCompleted === false || formData.ticketDataCompleted === false) {
        return (
            <>
                <Button onPress={onOpen} className={"w-3/4 rounded-full"} color={"primary"} variant={"ghost"}>Create Event</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {() => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Create Event</ModalHeader>
                                <ModalBody>
                                    <h1 className={`${title()} text-red-600`}>Please Complete All Fields&nbsp;</h1>


                                </ModalBody>

                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        );
    }
    return (
        <>
            <Button onPress={onOpen}>Create Event</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Event</ModalHeader>
                            <ModalBody>
                                <h1 className={`${title()} text-red-600`}>WARNING&nbsp;</h1>
                                <p>
                                    Clicking create will make the event go live.
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button type={"submit"} variant={"ghost"} className={"text-green-600"} onPress={onCreate}>
                                    Create
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
