'use client'

import {Button} from "flowbite-react";
import Link from "next/link";

export default function LoginButton() {
    return (
        <Link href="/auth/signin"> <Button outline > Login </Button> </Link>
    )
}