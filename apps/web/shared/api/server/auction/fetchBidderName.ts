export const fetchBidderName = async (
  bidderCache: React.MutableRefObject<Map<string, { username: string }>>,
  bidder_id: string
) => {
  if (bidderCache.current.has(bidder_id)) {
    return bidderCache.current.get(bidder_id);
  }
  try {
    const res = await fetch(`/api/auction/bidder-name?bidderId=${bidder_id}`);
    if (!res.ok) return undefined;
    const { username } = await res.json();
    const user = { username };
    bidderCache.current.set(bidder_id, user);
    return user;
  } catch {
    return undefined;
  }
};
