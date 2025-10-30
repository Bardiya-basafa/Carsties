'use client'
import {Button} from "flowbite-react";
import {useSession} from "next-auth/react";
import toast from "react-hot-toast";
import {useEffect} from "react";
import {deleteAuction} from "@/app/actions/auctionActions";
import {useRouter} from "next/navigation";

type Props = {
    auctionId: string;
    sellerEmail: string;
}
export default function DeleteButton({auctionId, sellerEmail}: Props) {

    const session = useSession();
    const router = useRouter();

    async function handleClick() {
        if (session.data?.user?.email !== sellerEmail) {
            toast.error("You don't have permission to delete this user!");
        }
        const res = await deleteAuction(auctionId);
        if (res) {
            toast.success("Auction has been deleted!");
            router.push("/");
            return;

        }
        toast.error("Cant delete auction");
        router.refresh();

    }

    return (
        <Button onClick={handleClick}> Delete Auction </Button>
    )
}