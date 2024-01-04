import React from "react";
import {Select, SelectItem, Avatar, Chip, SelectedItems} from "@nextui-org/react";
// import {users} from "./data";
import { Martini, UtensilsCrossed } from "lucide-react";
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
            name:"Drinks",
            icon: <Martini size={24} />,
        },
        {
            id:2,
            name:"Food",
            icon: <UtensilsCrossed size={24} />,
        }
    ]
  return (
    <Select
      
      items={paymentMethods}
      onChange={handleSelectionChange}
      label="Included Items"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select Included Items"
      labelPlacement="outside"
      classNames={{
        base: "w-sm",
        trigger: "min-h-unit-12 w-sm py-2",
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
