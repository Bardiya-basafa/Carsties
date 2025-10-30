"use client"

import React, {useRef} from "react"

import {useState} from "react"
import {useRouter, usePathname} from "next/navigation"
import {createAuction} from "@/app/actions/auctionActions";
import {useSession} from "next-auth/react";
import {saveFile} from "@/app/auctions/create/UploadImage";

export default function CreateAuctionPage() {
    const router = useRouter()
    const pathname = usePathname()
    const {data: session} = useSession();
    const [error, setError] = useState("")
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)

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
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError("Please select a valid image file")
            return
        }

        // Validate file size (e.g., 5MB max)
        if (file.size > 25 * 1024 * 1024) {
            setError("Image size should be less than 25MB")
            return
        }

        setUploadingImage(true)
        setError("")

        try {
            // Create preview
            const previewUrl = URL.createObjectURL(file)
            console.log("previewUrl", previewUrl)
            setImagePreview(previewUrl)
            setUploadingImage(false)


        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to process image")
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            setImagePreview(null)
        } finally {
            setUploadingImage(false)
        }
    }


    const handleRemoveImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview)
        }
        setImagePreview(null)
        setFormData(prev => ({...prev, imageUrl: ""}))
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

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
        setUploadingImage(false);
        if (!session) {
            router.push("/auth/signin")
            return;
        }
        console.log("this is the session" + JSON.stringify(session))
        try {
            const file = fileInputRef.current?.files?.[0]

            formData.imageUrl = await saveFile(file) as string;
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setIsSubmitting(false)
        }

        try {
            console.log("Form submitted:", formData)

            formData.seller = session.user.email;
            formData.auctionEnd = new Date(formData.auctionEnd).toISOString();
            const res = await createAuction(formData);
            console.log("created auction", res)
            if (res) {
                router.push(`/auctions/details/${res.auction.id}`);
                return;
            }

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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {pathname === "/auctions/create" ? "Create Auction" : "Update Auction"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {pathname === "/auctions/create" ? "List your vehicle for auction" : "Update your vehicle details"}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        {/* Make, Model, Color, Year, Mileage fields remain the same */}
                        <div>
                            <label htmlFor="make" className="block text-sm font-medium text-gray-700"> Make </label>
                            <input id="make" name="make" type="text" required value={formData.make} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Toyota"/>
                        </div>
                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700"> Model </label>
                            <input id="model" name="model" type="text" required value={formData.model} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Camry"/>
                        </div>
                        <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700"> Color </label>
                            <input id="color" name="color" type="text" required value={formData.color} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Silver"/>
                        </div>
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
                        {/* Image Upload Section */} {pathname === "/auctions/create" && (
                        <>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700"> Vehicle Image </label>
                                <input ref={fileInputRef} id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" disabled={uploadingImage}/>
                                <p className="mt-1 text-xs text-gray-500">
                                    Upload a clear image of your vehicle (max 5MB) </p>{imagePreview && (
                                <div className="mt-4 relative">
                                    <img src={imagePreview} alt="Vehicle preview" className="w-full h-48 object-cover rounded-md border"/>
                                    <button type="button" onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">
                                        ×
                                    </button>
                                </div>
                            )} {uploadingImage && (
                                <div className="mt-2 flex items-center text-sm text-blue-600">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing image... </div>
                            )}
                            </div>
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
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={handleCancel} className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting || uploadingImage } className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
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
        </div>)
}

