"use client"
import {  DropdownItem,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	Avatar,} from "@nextui-org/react";
import {NavbarContent, NavbarItem} from "@nextui-org/navbar";
import {useSession} from "next-auth/react";
import {Link} from "@nextui-org/link";
import {signIn, signOut} from "next-auth/react";
import {Button} from "@nextui-org/button";
export function NavAvatar() {
	const {data: session} = useSession();
	const user = session?.user;
	const username = user?.name;
	const userEmail = user?.email;
	const userImage = user?.image;

	if (!session) {
		return (
			<NavbarContent justify="end">
				<NavbarItem>
					<Button
						onPress={() => signIn("discord")}
						variant="flat" color="primary"
					>
						Sign In
					</Button>
				</NavbarItem>
			</NavbarContent>
		)
	}

	return (
		<NavbarContent justify="end">
			<Dropdown placement="bottom-end">
				<NavbarItem >
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform"
							color="secondary"
							name={username || ""}
							size="sm"
							src={userImage || ""}
						/>
					</DropdownTrigger>
				</NavbarItem>
				<DropdownMenu aria-label="Profile Actions" variant="flat">
					<DropdownItem key="info" className="h-14 gap-2 pointer-events-none">
						<p className="font-semibold">Signed in as</p>
						<p className="font-semibold">{userEmail}</p>
					</DropdownItem>
					<DropdownItem key="profile" className="h-10 gap-2">
						<Link color={"primary"} href={`/profile/${username}`}>
							<svg width="15" height="15"  viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
							<p >Profile</p>

						</Link>
					</DropdownItem>

					<DropdownItem key="logout" color="danger" onClick={() => signOut()}>
						<Link color={"danger"} onClick={() => signOut()}>
							Log Out
						</Link>

					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</NavbarContent>
	)
}