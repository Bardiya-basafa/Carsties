'use server'
import {PagedResult} from "@/types";
import {auth} from "@/app/auth";

export async function getCurrentUser() {
    try {
        const session = await auth();
        if (!session) {
            return null;
        }
        return session.user;
    } catch (error) {
        console.log(error);
        return null;
    }
}