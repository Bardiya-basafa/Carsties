'use client'
import {FieldValues, useForm} from "react-hook-form";
import toast from "react-hot-toast";
import {numberWithCommas} from "@/app/lib/numberWithCommas";
import {useBidStore} from "@/hooks/useBidStore";
import {createAuction, placeBidForAuction} from "@/app/actions/auctionActions";
import React, {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {reset} from "next/dist/lib/picocolors";

type Props = {
    auctionId: string;
    highBid: number;
}

export default function BidForm({highBid, auctionId}: Props) {

    const router = useRouter()
    const pathname = usePathname()
    const {data: session} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        auctionId: "",
        amount: 0,
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setIsSubmitting(true)
        if (!session) {
            router.push("/auth/signin")
            return;
        }

        formData.auctionId = auctionId;
        if (formData.amount <= highBid) {

            setIsSubmitting(false)
            return toast.error('Bid must be at least $' + numberWithCommas(highBid + 1));
        }


        try {
            const result = await placeBidForAuction(formData)

            if (result.error) {
                throw result.error;
            }



            // Optional: Show success message
            toast.success('Bid placed successfully!');

        } catch (err: any) {
            toast.error(err.message || 'Failed to place bid')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        router.back()
    }


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error &&
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>}
            <div className="space-y-4">
                {/* Year and Mileage */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700"> Bid Amount </label>
                        <input id="amount" name="amount" type="number" required value={formData.amount} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="at least 1$"/>
                    </div>
                </div>
                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                    <button type="button" onClick={handleCancel} className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
        </form>

    )
}
