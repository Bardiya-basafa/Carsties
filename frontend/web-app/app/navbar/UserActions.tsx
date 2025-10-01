'use client'
import {Button, Dropdown} from "flowbite-react";
import Link from "next/link";
import {User} from "next-auth";

type Props = {
    user: User;
}
export default function UserActions({user}: Props) {
    return (
        <Dropdown inline label={`welcome ${user.name}`} className={'cursor-pointer'}>

        </Dropdown>
    )
}