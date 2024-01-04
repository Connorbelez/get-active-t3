import SignInButton from "./SignInButton";
import { getServerAuthSession } from "@/server/auth";
import DropDownM from "./DropDownMenu";
import {

  DropdownTrigger,
  Dropdown,

  Avatar,
} from "@nextui-org/react";
import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
// import {useSession} from "next-auth/react";
// import { Link } from "@nextui-org/link";
// import { signIn } from "next-auth/react";
// import { Button } from "@nextui-org/button";

export default async function NavAvatar() {
  const session = await getServerAuthSession();
  // const session = useSession();
  const user = session?.user;
  const userEmail = user?.email;
  const username = user?.name;
  const userImage = user?.image;
  // const userEmail = "casd@gmail.com"
  // const username = "cbizy"
  // const userImage = ""

  if (!user) {
    return (
      <NavbarContent aria-label="Open Profile Actions" justify="end">
        <NavbarItem aria-label="Open Profile Actions">
          <SignInButton />
        </NavbarItem>
      </NavbarContent>
    );
  }

  return (
    <NavbarContent justify="end">
      <Dropdown aria-label="dropdown" placement="bottom-end">
        <NavbarItem aria-label="Open Profile Actions">
          <DropdownTrigger aria-label="Open Profile Actions">
            <Avatar
              aria-label="Open Profile Actions"
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
       <DropDownM userEmail={userEmail} username={username} />
      </Dropdown>
    </NavbarContent>
  );
}
