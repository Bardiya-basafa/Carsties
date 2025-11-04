'use client'

import {Button} from "flowbite-react";
import Link from "next/link";

export default function LoginButton() {
    return (
<Link href="/auth/signin">
  <Button className="
    px-4 py-2 
    text-sm font-medium 
    border border-gray-300 
    rounded-md 
    shadow-sm 
    bg-white 
    text-gray-700 
    hover:bg-gray-50 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    transition-colors duration-200
  ">
    Login
  </Button>
</Link>    )
}