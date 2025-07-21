import { adminClient } from '@/app/admin';

export const calculateAndAddPoints = async (
  userId: string,
  transactionAmount: number,
  transactionId?: string,
  userRole?: 'seller' | 'buyer'
): Promise<{
  status: number;
  data?: {
    earnedPoints: number;
  };
  error?: string;
}> => {
  try {
    const { data, error } = await adminClient.rpc('add_points_with_history', {
      p_user_id: userId,
      p_transaction_amount: transactionAmount,
      p_transaction_id: transactionId,
      p_user_role: userRole,
      p_earning_type: 'transaction',
    });

    if (error) {
      console.error('RPC 호출 실패:', error);
      return { status: 500, error: 'RPC 호출 중 오류가 발생했습니다' };
    }

    if (data?.status === 200) {
      return {
        status: 200,
        data: {
          earnedPoints: data.data.earned_points,
        },
      };
    } else {
      return {
        status: data?.status || 500,
        error: data?.error || '알 수 없는 오류가 발생했습니다',
      };
    }
  } catch (error) {
    console.error('포인트 적립 처리 중 오류:', error);
    return {
      status: 500,
      error: '포인트 적립 처리 중 오류가 발생했습니다',
    };
  }
};
