import { calculateAndAddPoints } from '@/shared/lib/points/calculateAndAddPoints';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 거래 완료 시
    const { userId } = await req.json();
    const result = await calculateAndAddPoints(
      userId,
      55000, // 거래 금액
      '0c74f0cf-f837-4ff3-93df-3d51abe36ec5', // 경매 id
      'seller' // seller | buyer
    );
    if (result.status === 200) {
      const { earnedPoints } = result.data!;
      console.log(`${earnedPoints}P 적립`);
      return NextResponse.json({ status: 'success', points: earnedPoints });
    } else {
      console.error(result.error);
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error in points add test API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
