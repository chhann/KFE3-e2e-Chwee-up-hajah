export const ProgressBar = ({
  progressData,
}: {
  progressData: {
    startPrice: number;
    finalPrice: number;
    progressPercent: number;
    discount: number;
  };
}) => {
  const { startPrice, finalPrice, progressPercent, discount } = progressData;
  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-sm text-gray-600">
        <span>시작가 {startPrice.toLocaleString()}원</span>
        <span>최종가 {finalPrice.toLocaleString()}원</span>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="mt-2 text-center text-sm text-gray-700">
        {discount.toLocaleString()}원 할인
      </div>
    </div>
  );
};
