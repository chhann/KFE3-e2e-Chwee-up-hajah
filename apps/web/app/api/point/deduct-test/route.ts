import { deductPointsWithHistory } from '@/shared/lib/points/deductPointsWithHistory';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    // 예시 1)
    // const result = await deductPointsWithHistory(userId, '악성후기');

    // 예시 2)
    // const result = await deductPointsWithHistory(
    //   userId,
    //   '위반행위',
    //   undefined,
    //   '부적절한 위반행위 감지 포인트 차감'
    // );

    // 예시 3)
    // const result = await deductPointsWithHistory(
    //   userId,
    //   '부정거래',
    //   '0c74f0cf-f837-4ff3-93df-3d51abe36ec5'
    // );

    // 예시 4)
    const result = await deductPointsWithHistory(userId, '포인트 차감');
    if (result.status === 200) {
      const { deductedPoints } = result.data!;
      console.log(`${deductedPoints}P 적립`);
      return NextResponse.json({ status: 'success', points: deductedPoints });
    } else {
      console.error(result.error);
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error in points deduct test API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
