import React from "react";
import {Select, SelectItem, Avatar, Chip, SelectedItems} from "@nextui-org/react";
// import {users} from "./data";
import { CreditCard, Banknote } from "lucide-react";
// type PaymentMethod = {
//     id:number;
//     name: string;
//     icon: React.JSX.Element;
// };
import {PaymentMethod} from "@/app/dashboard/components/EventCreationForm/EventForm"
interface PaymentSelectProps {
    selectedPaymentMethods: string;
    handleSelectionChange:any
}

export default function App({selectedPaymentMethods, handleSelectionChange}: PaymentSelectProps) {
    const paymentMethods =[
        {
            id:1,
            name:"Stripe",
            icon: <CreditCard size={24} />,
        },
        {
            id:2,
            name:"Cash",
            icon: <Banknote size={24} />,
        }
    ]
  return (
    <Select
        
      items={paymentMethods}
      onChange={handleSelectionChange}
      label="Payment Types"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select a payment type"
      labelPlacement="outside"
      classNames={{
        base: "w-sm",
        trigger: "min-h-unit-12 py-2",
      }}
      renderValue={(items: SelectedItems<PaymentMethod>) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item.data?.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(method) => (
        <SelectItem key={method.name} textValue={method.name}>
          <div className="flex gap-2 items-center">
            {method.icon}
            <div className="flex flex-col">
              <span className="text-small">{method.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
