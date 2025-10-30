import Heading from "@/app/components/Heading";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import CarImage from "@/app/auctions/CarImage";
import BidList from "@/app/auctions/details/[id]/BidList";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import CountDownTimer from "@/app/auctions/CountDownTimer";
import DeleteButton from "@/app/auctions/details/[id]/DeleteButton";
import {getCurrentUser} from "@/app/actions/authActions";
import {getDetailedViewData} from "@/app/actions/auctionActions";
import {auth} from "@/auth";
import {redirect} from "next/navigation";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";


export default async function Details({params}: { params: Promise<{ id: string }> }) {
    const session = await auth()

    if (!session) {
        toast.error("Please sign in to continue");
        redirect("/auth/signin");
    }
    const awaitedParams = await params;


    const data = await getDetailedViewData(awaitedParams.id);
    const user = await getCurrentUser();
    const isSeller = user?.email === data.seller;


    return (
        <div>
            <div className="flex justify-between">
                <div className="flex items-center gap-3">
                    <Heading title={`${data.make} ${data.model}`}/> {user?.email === data.seller && (<div></div>)}
                </div>
                <div className="flex gap-3">
                    <h3 className="text-2xl font-semibold">Time remaining:</h3>
                    <CountDownTimer auctionEnd={data.auctionEnd}/> {isSeller && (
                    <div className="flex gap-2">
                        <DeleteButton auctionId={data.id} sellerEmail={data.seller}/>
                    </div>
                )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-3">
                <div className="w-full bg-gray-200 aspect-h-10 aspect-w-16 rounded-lg overflow-hidden">
                    <CarImage imageUrl={data.imageUrl}/>
                </div>
                <BidList user={user} auction={data}/>
            </div>
            <div className="mt-3 grid grid-cols-1 rounded-lg">
                <time dateTime="2016-10-25" suppressHydrationWarning />
                <DetailedSpecs auction={data}/>
            </div>
        </div>
    )
}