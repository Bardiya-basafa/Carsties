import React from 'react'
import Logo from "@/app/navbar/Logo";
import Search from "@/app/navbar/Search";
import LoginButton from "@/app/navbar/LoginButton";
import {getCurrentUser} from "@/app/actions/authActions";
import UserActions from "@/app/navbar/UserActions";


export default async function NavBar() {
    const user = await getCurrentUser();
    return (
        <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
            <Logo/> <Search/> {user ? (<UserActions user={user}/>) : (<LoginButton/>)}
        </header>
    )
}