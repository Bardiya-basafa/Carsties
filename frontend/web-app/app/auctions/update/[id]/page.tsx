import { getDetailedViewData } from "@/app/actions/auctionActions";
import AuctionForm from "@/app/auctions/AuctionForm";
import Heading from "@/app/components/Heading";

export default async function Update({params}: { params: Promise<{ id: string }> }) {
    const awaitedParams = await params;
    const data = await getDetailedViewData(awaitedParams.id);
    return (
        <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
            <Heading title="Update your auction" subtitle="Please update the details of your car"/>
            <AuctionForm/>
        </div>
    )
}