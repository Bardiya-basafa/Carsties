import {Auction} from "@/types";

type Props = {
    auction: Auction;
}

import React from 'react'
import Link from "next/link";

export default function AuctionCard(props: Props) {
    return (
        <Link href={`/auctions/details/${props.auction.id}`} className={'group'}> \
            <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
                <div>
                    <CarImage/>
                    <div className="absolute bottom-2 left-2">
                        <CountDownTimer/>
                    </div>
                    <div className="absolute top-2 right-2">
                        <CurretBid
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4"></div>
        </Link>
    )
}
