export const AuctionOverlay = ({ overlayText }: { overlayText: string }) => {
  return (
    <div className="pointer-events-auto absolute inset-0 z-10 bg-black/50">
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <p className="text-lg font-bold">{overlayText}</p>
      </div>
    </div>
  );
};
