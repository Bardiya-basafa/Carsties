'use client'
import React, { useEffect, useState } from 'react'
import Logo from "@/app/navbar/Logo";
import Search from "@/app/navbar/Search";
import LoginButton from "@/app/navbar/LoginButton";
import UserActions from "@/app/navbar/UserActions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "flowbite-react";
import { getServerSession } from '@/lib/session';
import { auth } from '@/auth';
import { Session } from 'inspector/promises';


export default function NavBar() {


    const session = useSession();
    return (
        <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
            <Logo /> <Search /> {session.data?.user ? (
                <div className={"flex items-center gap-4"}>
                    <Link href={"/auctions/create"}> <Button className="px-4 py-2 
  text-sm font-medium 
  rounded-md 
  text-white 
  bg-blue-600 
  hover:bg-blue-700 
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  transition-colors duration-200
">Create Auction</Button></Link>
                    <UserActions />
                </div>
            ) : (
                <LoginButton />
            )}
        </header>
    )
}