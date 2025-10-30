import { Bid } from "@/types";
import { create } from "zustand";

type State = {
    bids: Bid[]
    open: boolean
}

type Actions = {
    setBids: (bids: Bid[]) => void
    addBid: (bid: Bid) => void
    setOpen: (value: boolean) => void
}

export const useBidStore = create<State & Actions>((set) => ({
    bids: [],
    open: true,
    setBids: (bids: Bid[]) => {
        set(() => ({
            bids
        }))
    },
    addBid: (bid: Bid) => {
        set((state) => {
            // Check if bid already exists
            const bidExists = state.bids.find(x => x.id === bid.id);
            if (bidExists) {
                console.log("Bid already exists:", bid.id);
                return { bids: state.bids }; // Return unchanged
            }

            console.log("Adding new bid to store:", bid.id, bid.amount);
            // Add new bid to the beginning of the array
            return { bids: [bid, ...state.bids] };
        })
    },
    setOpen: (value: boolean) => {
        set(() => ({
            open: value
        }))
    }
}))