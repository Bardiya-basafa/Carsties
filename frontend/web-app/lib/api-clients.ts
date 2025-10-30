// lib/api-client.ts
import {auth} from "@/auth";

export async function getApiClient() {
    const session = await auth();

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (session?.accessToken) {
        headers["Authorization"] = `Bearer ${session.accessToken}`;
    }

    return {
        async get(url: string) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
                method: "GET",
                headers,
            });
            return response.json();
        },

        async post(url: string, data: any) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
                method: "POST",
                headers,
                body: JSON.stringify(data),
            });
            return response.json();
        },

        async put(url: string, data: any) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
                method: "PUT",
                headers,
                body: JSON.stringify(data),
            });
            return response.json();
        },

        async delete(url: string) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
                method: "DELETE",
                headers,
            });
            return response.json();
        },
    };
}