"use client"

import {Input} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

import {Switch} from "@nextui-org/switch";
import {Divider} from "@nextui-org/divider";
import { button as buttonStyles } from "@nextui-org/theme";
import PaymentSelect from "./PaymentSelect"

// type formProps = {
// 	ticketTiers: {name: string, price: string, items: string, logo: string, drinksIncluded: boolean, paymentType: string[] | Set<string>}[]
// 	setTicketTiers: Dispatch<SetStateAction<{name: string, price: string, items: string, logo: string, drinksIncluded: boolean, paymentType: Set<string> | string[] }[]>>
// 	formSubmit:any
// }

//@ts-ignore
export default function DynamicForm({ticketTiers, setTicketTiers, formSubmit} : any) {
	// const [ticketTiers, setTicketTiers] = useState([
	// 	{ name: "", price: "", items: "", logo: "", drinksIncluded: false, paymentType: "" },
	// ]);

//@ts-ignore
	const handleChange = (index, e) => {
		const { name, value, checked } = e.target;
		const updatedTicketTiers = [...ticketTiers];
		updatedTicketTiers[index] = {
			...updatedTicketTiers[index],
			[name]: name === "drinksIncluded" ? checked : value,
		};
		setTicketTiers(updatedTicketTiers);
	};
	//@ts-ignore
	const handlePaymentSelectChange = (index, name, selectedKeys) => {
		const updatedTicketTiers = [...ticketTiers];
		updatedTicketTiers[index] = {
			...updatedTicketTiers[index],
			[name]: selectedKeys,
		};
		setTicketTiers(updatedTicketTiers);
	};
	//@ts-ignore
	const handleSwitchChange = (index,name,checked) => {
		const updatedTicketTiers = [...ticketTiers];
		updatedTicketTiers[index] = {
			...updatedTicketTiers[index],
			[name]: checked,
		};
		setTicketTiers(updatedTicketTiers);
	};


	const handleAddTier = () => {
		setTicketTiers([...ticketTiers, { name: "", price: "", items: "", logo: "", drinksIncluded: false, paymentType: new Set(["Cash"]) }]);
	};
//@ts-ignore
	const handleRemoveTier = (index) => {
		const updatedTicketTiers = [...ticketTiers];
		updatedTicketTiers.splice(index, 1);
		setTicketTiers(updatedTicketTiers);
	};



	return (
		<form onSubmit={formSubmit}>
			{/*@ts-ignore*/}
			{ticketTiers.map((tier, index) => (
				<div key={index} className="grid grid-cols-3 grid-flow-row auto-rows-max gap-5">
					<div className={"col-span-3 pt-7"}>
						<Input
                        isRequired
							type="text"
							name="name"
							variant={"bordered"}
							radius={"full"}
							color={'primary'}
							labelPlacement={"outside"}
							label={"Ticket Tier Name"}
							className={"focus-within:-translate-y-0.5 focus-within:duration-300"}
							value={tier.name}

							onChange={(e:any) => handleChange(index, e)}
							// placeholder="Ticket Tier Name"
						/>
					</div>

					<div  className={"col-span-1"}>
						<Input
                            isRequired
							type="number"
							name="price"
							label="Price"
							placeholder="0.00"
							variant={"bordered"}
							radius={"full"}
							color={'primary'}
							className={"focus-within:-translate-y-0.5 focus-within:duration-300"}
							value={tier.price}


							startContent={
								<div className="pointer-events-none flex items-center">
									<span className="text-default-400 text-small">$</span>
								</div>
							}
							onChange={(e:any) => handleChange(index, e)}
						/>
					</div>

					<div>
						<Input
							type="url"
							label="Ticket Image"
							name="logo"
							placeholder="imageurl.com"
							// labelPlacement="outside"
							variant={"bordered"}
							radius={"full"}
							color={'primary'}
							value={tier.logo}
							onChange={(e:any) => handleChange(index, e)}
							startContent={
								<div className="pointer-events-none flex items-center">
									<span className="text-default-400 text-small">https://</span>
								</div>
							}
						/>
					</div>
					<div className={"flex items-center justify-center"}>
						<Switch

							name={`drinksIncluded`}
							size="md"
							//ToDo: determine type for react aria on change event
							onValueChange={(e:any) => handleSwitchChange(index, "drinksIncluded" ,e)}
						>Drinks Included</Switch>
					</div>
					<div className={"col-span-3 pt-6"}>
						<Input
							type="text"
							name="items"
							variant={"bordered"}
							radius={"full"}
							color={'primary'}
							labelPlacement={"outside"}
							label={"Additional Items Included"}
							className={"focus-within:-translate-y-0.5 focus-within:duration-300"}
							value={tier.items}
							onChange={(e:any) => handleChange(index, e)}
						/>
					</div>
					<div className={"col-span-3"}>
						<PaymentSelect
                            isRequired
							index={index}
							name="paymentType"
							value={tier.paymentType}
							//@ts-ignore
							setValue={handlePaymentSelectChange}
						/>
						<label className={"ml-3 text-slate-700/50 dark:text-slate-300/60"}>Select Payment Type</label>
					</div>

					<div className={"py-5"}>
						{ticketTiers.length > 1 && (
							<Button
								type="button"
								onPress={() => handleRemoveTier(index)}
								className={buttonStyles({ variant: "bordered", radius: "full", color:"danger" })}
							>
								Remove Tier
							</Button>
						)}
					</div>
					<Divider className="my-7 col-span-3 " />

				</div>
			))}
			<div className={"py-5"}>
				<Button
					type="button"
					onPress={handleAddTier}
					className={buttonStyles({ variant: "bordered", radius: "full", color:"primary" })}

				>
					Add Ticket Tier
				</Button>
			</div>
		<Button
			type={"submit"}
			variant={"ghost"}


		>
			Save Tickets
		</Button>
		</form>
	);
}


