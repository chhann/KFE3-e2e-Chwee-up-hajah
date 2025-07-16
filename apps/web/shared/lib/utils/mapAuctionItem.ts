export function mapAuctionItem(item: any) {
  return {
    id: item.auction_id,
    myBidPrice: item.my_bid_price,
    myWonPrice: item.my_won_price,
    bidStartPrice: item.start_price,
    bidCurrentPrice: item.current_price,
    bidCount: item.bid_count,
    status: item.status,
    imageSrc: item.thumbnail,
    title: item.product.name,
    category: item.product.category,
    description: item.product.description,
    badgeVariant: item.badge_variant,
    seller: {
      username: item.seller.username,
      address: item.seller.address,
    },
    locationName: item.seller.address,
    startTime: item.start_time,
    endTime: item.end_time,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}
