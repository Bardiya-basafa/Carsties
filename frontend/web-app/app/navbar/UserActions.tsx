'use client'
import {Dropdown, DropdownDivider, DropdownItem} from "flowbite-react";
import Link from "next/link";
import {User} from "next-auth";
import {useRouter} from "next/navigation";
import {usePathname} from "next/navigation";
import {useParamsStore} from "@/hooks/useParamsStore";
import {AiFillCar, AiFillTrophy, AiOutlineLogout} from "react-icons/ai";
import {HiCog, HiUser} from "react-icons/hi";
import {signOut, useSession} from "next-auth/react";

export default function UserActions() {
    const session = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore(state => state.setParams);

    function setWinner() {
        setParams({winner: session.data?.user.email as string, seller: undefined})
        if (pathname !== '/') router.push('/');
    }

    function setSeller() {
        setParams({seller: session.data?.user?.email as string, winner: undefined})
        if (pathname !== '/') router.push('/');
    }

    return (
        <Dropdown inline label={`Welcome ${session.data?.user?.name}`}>
            <DropdownItem icon={HiUser} onClick={setSeller}> My Auctions </DropdownItem>
            <DropdownItem icon={AiFillTrophy} onClick={setWinner}> Auctions won </DropdownItem>
            <DropdownItem icon={AiFillCar}> <Link href="/auctions/create"> Sell my car </Link> </DropdownItem>
            <DropdownItem icon={HiCog}> <Link href="/session"> Session (dev only) </Link> </DropdownItem>
            <DropdownDivider/>
            <DropdownItem icon={AiOutlineLogout} onClick={() => signOut({callbackUrl: '/'})}> Sign out </DropdownItem>
        </Dropdown>
    )
}