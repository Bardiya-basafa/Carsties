namespace Shared.ContractMessages.Bid;

public class BidPlaced {

    public string Id { get; set; }

    public Guid AuctionId { get; set; }

    public string Bidder { get; set; }

    public DateTime BidDate { get; set; }

    public int Amount { get; set; }

    public string BidStatus { get; set; }

}
