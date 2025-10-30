'use client'
import {Auction} from "@/types";
import {Table, TableBody, TableCell, TableRow} from "flowbite-react";
import {useEffect, useState} from "react";

type Props = {
    auction: Auction
}


export default function DetailedSpecs({auction}: Props) {


    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    return (

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Seller
                    </td>
                    <td className="px-6 py-4">
                        {auction.seller}
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Make
                    </td>
                    <td className="px-6 py-4">
                        {auction.make}
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Model
                    </td>
                    <td className="px-6 py-4">
                        {auction.model}
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Year manufactured
                    </td>
                    <td className="px-6 py-4">
                        {auction.year}
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Mileage
                    </td>
                    <td className="px-6 py-4">
                        {auction.mileage}
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        Has reserve price?
                    </td>
                    <td className="px-6 py-4">
                        {auction.reservePrice > 0 ? 'Yes' : 'No'}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}