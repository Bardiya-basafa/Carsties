import Listings from "@/app/auctions/Listings";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";
import Link from "next/link";

export default async function Home() {
    const session = await auth();
    return (
        // <div>
        //     <SessionProvider>
        //         <Listings/> </SessionProvider>
        // </div>

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                        Welcome to MyApp </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        A modern application built with Next.js 15 and .NET API with complete authentication system. </p>{session ? (
                    <div className="space-y-4">
                        <p className="text-lg text-gray-700">
                            Welcome back, <span className="font-semibold">{session.user?.name}</span>! </p>
                        <div className="space-x-4">
                            <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"> Go to Dashboard </Link>
                            <Link href="/search" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium border border-blue-600"> Search Products </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link href="/auth/signin" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"> Sign In </Link>
                        <Link href="/auth/signup" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium border border-blue-600"> Sign Up </Link>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}
