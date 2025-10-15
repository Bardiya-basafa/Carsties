// components/layout/navigation.tsx
'use client';

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            MyApp
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-gray-900">
                            Home
                        </Link>
                        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                            Dashboard
                        </Link>
                        {session && (
                            <Link href="/search" className="text-gray-600 hover:text-gray-900">
                                Search
                            </Link>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center">
                        {status === "loading" ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ) : session ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center space-x-3 focus:outline-none"
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {session.user?.name?.charAt(0).toUpperCase() ||
                            session.user?.email?.charAt(0).toUpperCase()}
                      </span>
                                        </div>
                                        <div className="text-left hidden md:block">
                                            <p className="text-sm font-medium text-gray-900">
                                                {session.user?.name || "User"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {session.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Your Profile
                                            </Link>
                                            <Link
                                                href="/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Settings
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    signOut({ callbackUrl: "/" });
                                                }}
                                                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/auth/signin"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}