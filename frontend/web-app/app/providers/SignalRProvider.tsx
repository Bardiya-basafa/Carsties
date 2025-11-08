'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { useAuctionStore } from "@/hooks/useActionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, AuctionFinished, Bid } from "@/types";
import { User } from "next-auth";
import toast from "react-hot-toast";
import AuctionCreatedToast from "@/app/components/AuctionCreatedToast";
import { getDetailedViewData } from "@/app/actions/auctionActions";
import AuctionFinishedToast from "@/app/components/AuctionFinishedToast";
import { useSession } from "next-auth/react";


type Props = {
    children: ReactNode;
}
const SignalRProvider = ({ children }: Props) => {
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const { data: session, status } = useSession();

    // Use a ref to track the current session
    const sessionRef = useRef(session);

    // Update ref when session changes
    useEffect(() => {
        sessionRef.current = session;
    }, [session]);
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`http://localhost:6001/notification`)
            .withAutomaticReconnect()
            .build()
        setConnection(newConnection);
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on('BidPlaced', (bid: Bid) => {
                        if (bid.bidStatus.includes('Accepted')) {
                            setCurrentPrice(bid.auctionId, bid.amount);
                        }
                        console.log("adding new bid" + JSON.stringify(bid));
                        addBid(bid)
                    })
                    connection.on('AuctionCreated', (auction: Auction) => {
                        const currentSession = sessionRef.current;
                        if (currentSession?.user?.email as string !== auction.seller) {
                            console.log("session email " + currentSession?.user?.email as string);
                            console.log("auction seller" + auction.seller)
                            return toast(<AuctionCreatedToast auction={auction} />,
                                { duration: 10000 });
                        }
                    })

                    connection.on('AuctionFinished', (auctionFinished: AuctionFinished) => {
                        const auction = getDetailedViewData(auctionFinished.auctionId);
                        return toast.promise(auction, {
                            loading: 'Loading...',
                            success: (auction) =>
                                <AuctionFinishedToast finishedAuction={auctionFinished} auction={auction} />,
                            error: (err) => 'Auction Finished',
                        }, { success: { duration: 10000, icon: null } });
                    })

                })
                .catch(err => console.log(err));
        }
        return () => {
            connection?.stop()
        }
    }, [connection, setCurrentPrice, addBid]);
    return (
        children
    )
}
export default SignalRProvider
