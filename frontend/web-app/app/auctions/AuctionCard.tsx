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
        <Link href={`/auctions/details/${props.auction.id}`} className={'group'}>
            <div className="w-full  bg-gray-200 aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
                <div className='relative h-64'>
                    <CarImage imageUrl={props.auction.imageUrl}/>
                    <div className="absolute bottom-2 left-2">
                        <CountDownTimer auctionEnd={props.auction.auctionEnd}/>
                    </div>
                    <div className="absolute top-3 right-4">
                        <CurrentBid reservePrice={props.auction.reservePrice} amount={props.auction.currentHighBid}/>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className="text-gray-700">{props.auction.make} {props.auction.model}</h3>
                <p className="font-semibold text-sm">{props.auction.year}</p>
            </div>
        </Link>
    )
}
