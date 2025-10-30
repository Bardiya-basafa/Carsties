import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">
                            Welcome to your Dashboard, {session.user?.name}!
                        </h1>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 rounded-lg">
                                <h2 className="text-lg font-semibold text-blue-900">
                                    Welcome back!
                                </h2>
                                <p className="text-blue-700">
                                    You are signed in as: {session.user?.email}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                                    <ul className="mt-4 space-y-2">
                                        <li>
                                            <a href="/search" className="text-blue-600 hover:text-blue-500">
                                                Search Products
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/profile" className="text-blue-600 hover:text-blue-500">
                                                View Profile
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-lg font-medium text-gray-900">User Info</h3>
                                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                                        <p>ID: {session.user?.id}</p>
                                        <p>Email: {session.user?.email}</p>
                                        <p>Name: {session.user?.name || "Not set"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}