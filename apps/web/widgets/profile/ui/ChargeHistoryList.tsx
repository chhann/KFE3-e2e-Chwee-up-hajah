export const ChargeHistoryList = () => {
  const items = [
    {
      id: 1,
      date: '2025/03/02',
      price: 30000,
      paymentInfo: '토스페이먼츠',
    },
    {
      id: 2,
      date: '2025/03/02',
      price: 30000,
      paymentInfo: '토스페이먼츠',
    },
    {
      id: 3,
      date: '2025/03/02',
      price: 30000,
      paymentInfo: '토스페이먼츠',
    },
  ];

  return (
    <section aria-labelledby="charge-history-title">
      <h2 id="charge-history-title" className="sr-only">
        충전 내역
      </h2>

      {items.length === 0 ? (
        <p className="py-8 text-center text-gray-500">충전 내역이 없습니다.</p>
      ) : (
        <ul role="list" className="space-y-[30px]">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-[6px] bg-white px-2 py-4 shadow-[5px_5px_16px_0px_rgba(0,0,0,0.1)]"
              role="listitem"
            >
              <article>
                <h2 className="sr-only">충천 내역</h2>
                <time dateTime={item.date.replace(/\//g, '-')} className="text-xs">
                  {item.date}
                </time>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold">
                      <span className="sr-only">충전 금액: </span>
                      {item.price.toLocaleString()}원
                    </p>
                    <p className="text-xs">
                      <span className="sr-only">결제 수단: </span>
                      결제정보: {item.paymentInfo}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
