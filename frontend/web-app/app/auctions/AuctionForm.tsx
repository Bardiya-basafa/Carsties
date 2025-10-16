//
// type Props = {
//     auction?: Auction
// }
// export default function AuctionForms(props: Props) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const {control, handleSubmit, setFocus, reset, formState: {isSubmitting, isValid, isDirty}} = useForm({
//         mode: "onTouched",
//     });
//     useEffect(() => {
//         if (props.auction) {
//             const {make, model, color, mileage, year} = props.auction;
//             reset({make, model, color, mileage, year});
//         }
//         setFocus('make');
//     }, [setFocus, reset, props.auction]);
//
//     async function onSubmit(data: FieldValues) {
//         try {
//             let id = '';
//             let res;
//             if (pathname === '/auctions/create') {
//                 res = await createAuction(data);
//                 id = res.id;
//             } else {
//                 if (props.auction) {
//                     res = await updateAuction(data, props.auction.id);
//                     id = props.auction.id;
//                 }
//             }
//             if (res.error) {
//                 throw res.error;
//             }
//             router.push(`/auctions/details/${id}`)
//         } catch (error: any) {
//             toast.error(error.status + ' ' + error.message)
//         }
//     }
//
//
//     return (
//         <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
//             <input label="Make" name="make" control={control} rules={{required: 'Make is required'}}/>
//             <input label="Model" name="model" control={control} rules={{required: 'Model is required'}}/>
//             <input label="Color" name="color" control={control} rules={{required: 'Color is required'}}/>
//             <div className="grid grid-cols-2 gap-3">
//                 <input label="Year" name="year" control={control} type="number" rules={{required: 'Year is required'}}/>
//                 < label="Mileage" name="mileage" control={control} type="number" rules={{required: 'Model is required'}}/>
//             </div>
//             {pathname === '/auctions/create' &&
//                 <>
//                     <Input label="Image URL" name="imageUrl" control={control} rules={{required: 'Image URL is required'}}/>
//                     <div className="grid grid-cols-2 gap-3">
//                         <Input label="Reserve Price (enter 0 if no reserve)" name="reservePrice" control={control} type="number" rules={{required: 'Reserve price is required'}}/>
//                         <DateInput label="Auction end date/time" name="auctionEnd" control={control} dateFormat="dd MMMM yyyy h:mm a" showTimeSelect rules={{required: 'Auction end date is required'}}/>
//                         <input/>
//                     </div>
//                 </>}
//             <div className="flex justify-between">
//                 <Button outline color="gray">Cancel</Button>
//                 <Button isProcessing={isSubmitting} disabled={!isValid} type="submit" outline color="success">Submit</Button>
//             </div>
//         </form>
//
//     )
// }
"use client"

import type React from "react"

import {useState} from "react"
import {useRouter, usePathname} from "next/navigation"
import {createAuction} from "@/app/actions/auctionActions";
import {useSession} from "next-auth/react";

export default function CreateAuctionPage() {
    const router = useRouter()
    const pathname = usePathname()
    const {data: session} = useSession();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        make: "",
        model: "",
        color: "",
        year: "",
        mileage: "",
        imageUrl: "",
        reservePrice: "",
        auctionEnd: "",
        seller: "",
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
        console.log("this is the session" + JSON.stringify(session))

        try {
            // Your submission logic here
            console.log("Form submitted:", formData)

            formData.seller = session.user.email;
            formData.auctionEnd = new Date(formData.auctionEnd).toISOString();
            const res = await createAuction(formData);
            console.log("created auction", res)
            if (res) {
                router.push(`/auctions/details/${res.auction.id}`);
                return;
            }

            // Example: await submitAuction(formData);
            // router.push('/auctions');
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Auction</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">List your vehicle for auction</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error &&
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">{error}</div>}
                    <div className="space-y-4">
                        {/* Make */}
                        <div>
                            <label htmlFor="make" className="block text-sm font-medium text-gray-700"> Make </label>
                            <input id="make" name="make" type="text" required value={formData.make} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Toyota"/>
                        </div>
                        {/* Model */}
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700"> Model </label>
                            <input id="model" name="model" type="text" required value={formData.model} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Camry"/>
                        </div>
                        {/* Color */}
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700"> Color </label>
                            <input id="color" name="color" type="text" required value={formData.color} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Silver"/>
                        </div>
                        {/* Year and Mileage */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium text-gray-700"> Year </label>
                                <input id="year" name="year" type="number" required value={formData.year} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="2023"/>
                            </div>
                            <div>
                                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700"> Mileage </label>
                                <input id="mileage" name="mileage" type="number" required value={formData.mileage} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="50000"/>
                            </div>
                        </div>
                        {/* Conditional fields for /auctions/create */} {pathname === "/auctions/create" && (
                        <>
                            {/* Image URL */}
                            <div>
                                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700"> Image URL </label>
                                <input id="imageUrl" name="imageUrl" type="url" required value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="https://example.com/image.jpg"/>
                            </div>
                            {/* Reserve Price and Auction End */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="reservePrice" className="block text-sm font-medium text-gray-700"> Reserve Price </label>
                                    <input id="reservePrice" name="reservePrice" type="number" required value={formData.reservePrice} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="0"/>
                                    <p className="mt-1 text-xs text-gray-500">Enter 0 if no reserve</p>
                                </div>
                                <div>
                                    <label htmlFor="auctionEnd" className="block text-sm font-medium text-gray-700"> Auction End Date/Time </label>
                                    <input id="auctionEnd" name="auctionEnd" type="datetime-local" required value={formData.auctionEnd} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                                </div>
                            </div>
                        </>
                    )}
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
                </form>
            </div>
        </div>
    )
}

