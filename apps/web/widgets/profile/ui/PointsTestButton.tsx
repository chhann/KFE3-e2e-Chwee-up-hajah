'use client';
import { calculateAndAddPoints } from '@/shared/lib/points/calculateAndAddPoints';
import { deductPointsWithHistory } from '@/shared/lib/points/deductPointsWithHistory';
import React, { useState } from 'react';

export const PointsTestButtons = () => {
  // 포인트 적립 테스트
  const handleAddPoints = async () => {
    try {
      const result = await calculateAndAddPoints(
        '12553475-43da-4689-a2e2-38e61a3ce989', // 유저 아이디
        50000, // 거래 금액 (5만원)
        'test-auction-id', // 경매 아이디
        'seller' // seller | 'buyer'
      );
      alert(`포인트 적립 성공: ${result}`);
    } catch (error) {
      console.error('포인트 적립 오류:', error);
    }
  };

  // 포인트 차감 테스트
  const handleDeductPoints = async () => {
    try {
      const result = await deductPointsWithHistory(
        '12553475-43da-4689-a2e2-38e61a3ce989',
        '악성후기',
        undefined,
        '테스트용 포인트 차감'
      );

      alert(`포인트 차감 성공: ${result}`);
    } catch (error) {
      console.error('포인트 차감 오류:', error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h2 className="mb-6 text-2xl font-bold">포인트 시스템 테스트</h2>

      {/* 테스트 버튼들 */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={handleAddPoints}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          (<>💰 포인트 적립 테스트</>)
        </button>

        <button
          onClick={handleDeductPoints}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          (<>⚠️ 포인트 차감 테스트</>)
        </button>
      </div>

      {/* 테스트 정보 */}
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <h3 className="mb-2 font-semibold">테스트 정보</h3>
        <ul className="space-y-1 text-sm">
          <li>
            <strong>적립 테스트:</strong> 거래금액 50,000원, 판매자 역할
          </li>
          <li>
            <strong>차감 테스트:</strong> 500포인트 고정 차감, 악성후기 사유
          </li>
          <li>
            <strong>테스트 유저:</strong> 12553475-43da-4689-a2e2-38e61a3ce989
          </li>
        </ul>
      </div>
    </div>
  );
};
