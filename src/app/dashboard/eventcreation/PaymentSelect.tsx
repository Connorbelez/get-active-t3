"use client"
import React, {Dispatch, SetStateAction} from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

type paymentModalProps = {
	value: Set<string> | string[],
	setValue: Dispatch<SetStateAction<any>>
	name:string
	index:number
}
export default function PS({index, name, setValue, value} : paymentModalProps) {
	//const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Cash"]));

	const selectedValue = React.useMemo(
		() => Array.from(value).join(", ").replaceAll("_", " "),

		[value]
	);


	return (
		<Dropdown>
			<DropdownTrigger>
				<Button
					//@ts-ignore
					variant="bordered"
					className="capitalize"
				>
					{selectedValue}
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label="Single selection actions"
				variant="flat"
				closeOnSelect={false}
				disallowEmptySelection
				selectionMode="multiple"
				selectedKeys={value}
				//@ts-ignore

				onSelectionChange={(selectedKeys) => setValue(index, name, selectedKeys)}
			>
				<DropdownItem key="Cash">Cash</DropdownItem>
				<DropdownItem key="POS Tap">POS Tap</DropdownItem>
				<DropdownItem key="E-transfer">E-transfer</DropdownItem>
				<DropdownItem key="Stripe">Stripe</DropdownItem>
			</DropdownMenu>
		</Dropdown>

	);
}
