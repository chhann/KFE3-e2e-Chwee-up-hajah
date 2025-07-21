'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const HotDealChart = () => {
  // 목 데이터
  const data = [
    { quantity: 0, price: '150,000원' },
    { quantity: 0, price: '140,000원' },
    { quantity: 18, price: '130,000원' },
    { quantity: 15, price: '120,000원' },
    { quantity: 10, price: '110,000원' },
    { quantity: 3, price: '90,000원' },
    { quantity: 2, price: '80,000원' },
    { quantity: 5, price: '70,000원' },
    { quantity: 10, price: '60,000원' },
    { quantity: 1, price: '50,000원' },
  ];
  return (
    <div className="h-64 w-full">
      <h2 className="mb-2 text-lg font-[var(--font-semibold)]">구매 차트</h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* XAxis: 구매 가격 */}
          <XAxis dataKey="price" label={{ position: 'insideBottom', offset: 0 }} />
          {/* YAxis: 구매 수량 */}
          <YAxis dataKey="quantity" hide />
          <Tooltip />

          {/* Line: 수량 vs 가격 */}
          <Line dataKey="quantity" stroke="#ef4444" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
