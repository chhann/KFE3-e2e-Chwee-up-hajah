import { adminClient } from '@/app/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const { auction_id, auction_data, product_data } = body;

  if (!auction_id || !auction_data || !product_data) {
    return NextResponse.json(
      { error: 'auction_id, auction_data, product_data가 모두 필요합니다.' },
      { status: 400 }
    );
  }

  const { error } = await adminClient.rpc('update_auction_and_product', {
    p_auction_id: auction_id,
    p_auction_data: auction_data,
    p_product_data: product_data,
  });

  if (error) {
    console.error('경매 수정 오류:', error);
    return NextResponse.json({ error: '업데이트에 실패했습니다.', detail: error }, { status: 500 });
  }

  // 검색 테이블 수동 동기화 추가
  const { error: syncError } = await adminClient.rpc('sync_auction_search_manual', {
    p_auction_id: auction_id,
  });

  if (syncError) {
    console.error('검색 테이블 동기화 오류:', syncError);
    // 에러가 나도 메인 업데이트는 성공했으므로 경고만 로그
  }

  return NextResponse.json({
    message: '경매 및 상품 정보가 성공적으로 업데이트되었습니다.',
    auction_id,
  });
}
