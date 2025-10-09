import {Auction} from "@/types";

type Props = {
    auction: Auction;
}

import React from 'react'
import Link from "next/link";
import CarImage from "@/app/auctions/CarImage";
import CountDownTimer from "@/app/auctions/CountDownTimer";
import CurrentBid from "@/app/auctions/CurrentBid";

export default function AuctionCard(props: Props) {
    return (
        <Link href={`/auctions/details/${props.auction.id}`} className={'group'}> \
            <div className="w-full bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
                <div>
                    <CarImage imageUrl={props.auction.imageUrl}/>
                    <div className="absolute bottom-2 left-2">
                        <CountDownTimer auctionEnd={props.auction.auctionEnd}/>
                    </div>
                    <div className="absolute top-2 right-2">
                        <CurrentBid reservePrice={props.auction.reservePrice} amount={props.auction.soldAmount}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4"></div>
        </Link>
    )
}
