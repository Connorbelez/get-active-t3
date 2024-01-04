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
// import { Input } from "@/components/ui/input";
interface compProps {
  onOpen: () => void;
  onOpenChange: (open: boolean) => void;
  isOpen: boolean;
  ticketData: any;
    setTicketData: any;
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
    },
  });

  const onSubmit = (data: z.infer<typeof ticketFormSchema>) => {
    
    console.log("TICKET SUBMIT!!!")
    console.table(data);
    console.log(data);
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
                e.preventDefault();
                onSubmit(form.getValues());
                onClose();
            }}
            className="flex w-full flex-col justify-center space-y-4 p-8"
            >
            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
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
                    name="ticketDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Description</FormLabel>
                        <FormControl>
                          {/* <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string}> */}
                          <Input value={field.value} onChange={field.onChange} />
                          {/* </AddressAutofill> */}
                        </FormControl>
                        <FormDescription>
                          Displayed Ticket Information
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

  
              <div className="flex justify-between px-1 py-2">
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
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
