import { adminClient } from '@/app/admin';

// 등급별 적립률 매핑
const TIER_RATES: Record<string, number> = {
  숲: 0.04, // 4%
  나무: 0.02, // 2%
  새싹: 0.015, // 1.5%
  씨앗: 0.01, // 1%
};

export const calculateAndAddPoints = async (
  userId: string,
  transactionAmount: number
): Promise<{ status: number; data?: { earnedPoints: number }; error?: string }> => {
  try {
    // 1. 사용자 정보 조회
    const { data: user, error: fetchUserError } = await adminClient
      .from('user')
      .select('points, tier')
      .eq('user_id', userId)
      .single();

    if (fetchUserError || !user) {
      return { status: 401, error: '사용자를 찾을 수 없습니다' };
    }

    // 2. 현재 등급의 적립률로 포인트 계산
    const currentTier = user.tier || '씨앗';
    const accrualRate = TIER_RATES[currentTier] || 0.01; // 기본값은 씨앗 등급의 1%
    const earnedPoints = Math.floor(transactionAmount * accrualRate);

    // 3. 새 포인트 총합 계산
    const newTotalPoints = (user.points || 0) + earnedPoints;

    // 4. db 업데이트
    const { error: updateError } = await adminClient
      .from('user')
      .update({ points: newTotalPoints })
      .eq('user_id', userId);

    if (updateError) {
      return {
        status: 500,
        error: '포인트 업데이트 중 오류가 발생했습니다',
      };
    }

    return { status: 200, data: { earnedPoints } };
  } catch (error) {
    console.error('Error calculating and adding points:', error);
    return {
      status: 500,
      error: '포인트 적립 처리 중 오류가 발생했습니다',
    };
  }
};
