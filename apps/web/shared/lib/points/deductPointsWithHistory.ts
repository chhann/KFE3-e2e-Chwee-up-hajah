import { adminClient } from '@/app/admin';

export const deductPointsWithHistory = async (
  userId: string,
  reason?: string,
  transactionId?: string,
  description?: string
): Promise<{
  status: number;
  data?: {
    deductedPoints: number;
  };
  error?: string;
}> => {
  try {
    const { data, error } = await adminClient.rpc('deduct_points_with_history', {
      p_user_id: userId,
      p_transaction_id: transactionId,
      p_reason: reason || '부정거래',
      p_description: description,
    });

    if (error) {
      console.error('RPC 호출 실패:', error);
      return { status: 500, error: 'RPC 호출 중 오류가 발생했습니다' };
    }

    if (data?.status === 200) {
      return {
        status: 200,
        data: {
          deductedPoints: data.data.deducted_points,
        },
      };
    } else {
      return {
        status: data?.status || 500,
        error: data?.error || '알 수 없는 오류가 발생했습니다',
      };
    }
  } catch (error) {
    console.error('포인트 차감 처리 중 오류:', error);
    return {
      status: 500,
      error: '포인트 차감 처리 중 오류가 발생했습니다',
    };
  }
};
