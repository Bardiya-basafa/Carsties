type Props = {
    auction: any
}

import React from 'react'

export default function AuctionCard(props: Props) {
    return (
        <div>{props.auction.make}</div>
    )
}
