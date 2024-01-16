import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Switch,
  Input,
  Link,
} from "@nextui-org/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TicketType } from "@prisma/client";
import { ticketFormSchema } from "./EventForm";
import PaymentSelect from "./PaymentSelect";
import TicketInlcudedSelect from "./TicketIncludedSelect";
// import { Input } from "@/components/ui/input";
interface compProps {
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  isOpen: boolean;
  ticketData: any;
  setTicketData: any
}

// export const ticketFormSchema = z.object({
//     ticketTitle: z.string()
//         .min(5, "Too short")
//         .max(50, "Too long"),

//     ticketPrice: z.number(),
//     foodIncluded: z.boolean(),
//     drinkIncluded: z.boolean(),
//     paymentTypes: z.array(z.string()), //ToDo: change this to enum with dropdown
//     ticketDescription: z.object({
//         description: z.string(),
//     }),

// })

export default function comp({
  onOpen,
  onOpenChange,
  isOpen,
  ticketData,
  setTicketData,

}: compProps) {
  const form = useForm<z.infer<typeof ticketFormSchema>>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      ticketTitle: "",
      ticketPrice: "0",
      ticketDescription: "",
      paymentTypes: "",
      freeTicket: false,
      payAtDoorTicket: false,
      itemsIncluded: "",
    },
    
  });

  const onSubmit = (data: z.infer<typeof ticketFormSchema>) => {
    //console.log("TICKET SUBMIT!!!")
    //console.log(data);
    //console.log(data);
    //console.log("STATE")
    //console.log(ticketData);
    //console.log(ticketData);
    setTicketData(prev => prev ? [...prev, data] : [data]);

  
    //console.log("TICKET SUBMIT!!!")
    //console.log(data);
    //console.log(data);
};
  return (
      <Modal
      size={"2xl"}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
            <>
            <Form {...form}>
            <form
            onSubmit={(e)=>{
           
                //console.log("SUBMITTING")

                const res = form.handleSubmit(onSubmit)
                //console.log(res)
                e.preventDefault();
                e.bubbles = false;
                // onClose();
                return res;
            }}
            className="flex w-full flex-col justify-center space-y-4 p-8"
            >
            <ModalHeader className="flex flex-col gap-1">Ticket Creation</ModalHeader>
            <ModalBody>

                  <FormField
                    control={form.control}
                    name="ticketTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Title</FormLabel>
                        <FormControl>
                          {/* <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}> */}
                          <Input {...field} />
                          {/* </AddressAutofill> */}
                        </FormControl>
                        <FormDescription>
                          Displayed Ticket Title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <FormField
                    control={form.control}
                    name="ticketDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket D</FormLabel>
                        <FormControl>
                          {/* <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}> */}
                          <Input {...field} />
                          {/* </AddressAutofill> */}
                        </FormControl>
                        <FormDescription>
                          Displayed Ticket D
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <div className="flex space-x-4 sm:space-x-6 items-center">
                  <FormField
                    control={form.control}
                    name="ticketPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Price</FormLabel>
                        <FormControl>
                          {/* <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}> */}
                          <Input onChange={field.onChange}
                                className={""}
                                type="number"  
                                value={field.value}
                                startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                                }
                          />
                          {/* </AddressAutofill> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="freeTicket"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <FormLabel className="">
                          Free Ticket
                        </FormLabel>
                        <FormControl>
                          <Switch
                            name="freeTicket"
                            // label="Private Event?"
                            // onChange={field.onChange}
                            checked={field.value}
                            onChange={field.onChange}

                            //   {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payAtDoorTicket"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <FormLabel className="">
                          Pay At The Door?
                        </FormLabel>
                        <FormControl>
                          <Switch
                            name="payAtDoorTicket"
                            // label="Private Event?"
                            // onChange={field.onChange}
                            checked={field.value}
                            onChange={field.onChange}

                            //   {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div>
                <div className="grid grid-cols-2 gap-4">

                    <FormField
                        control={form.control}
                        name="paymentTypes"
                        render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Ticket Description</FormLabel> */}
                            <FormControl>
                                <PaymentSelect selectedPaymentMethods={field.value} handleSelectionChange={field.onChange}/>
                            </FormControl>
                            {/* <FormDescription>
                            Displayed Ticket Information
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="itemsIncluded"
                        render={({ field }) => (
                        <FormItem>
                            {/* <FormLabel>Ticket Description</FormLabel> */}
                            <FormControl>
                                <TicketInlcudedSelect selectedPaymentMethods={field.value} handleSelectionChange={field.onChange}/>
                            </FormControl>
                            {/* <FormDescription>
                            Displayed Ticket Information
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

      
  
              {/* <div className="flex justify-between px-1 py-2">
                <Checkbox
                  classNames={{
                    label: "text-small",
                  }}
                >
                  Remember me
                </Checkbox>
                <Link color="primary" href="#" size="sm">
                  Forgot password?
                </Link>
              </div> */}

            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={(e)=>{
                  onSubmit(form.getValues())
                  onClose();
                }
                }>
                Submit
              </Button>
            </ModalFooter>
            
            </form>
        </Form>
          </>
        )}
      </ModalContent>
    </Modal>

  );
}
