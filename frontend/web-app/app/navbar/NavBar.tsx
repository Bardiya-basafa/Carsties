'use client'
import React from 'react'
import Logo from "@/app/navbar/Logo";
import Search from "@/app/navbar/Search";
import LoginButton from "@/app/navbar/LoginButton";
import UserActions from "@/app/navbar/UserActions";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {Button} from "flowbite-react";


export default function NavBar() {
    const session = useSession();
    return (
        <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
            <Logo/> <Search/> {session.data?.user ? (
            <div className={"flex items-center gap-4"}>
                <Link href={"/auctions/create"}> <Button>Create Auction</Button></Link>
                <UserActions/>
            </div>
        ) : (
            <LoginButton/>
        )}
        </header>
    )
}