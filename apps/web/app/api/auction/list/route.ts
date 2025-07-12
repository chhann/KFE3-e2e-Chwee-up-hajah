import { adminClient } from '@/app/admin';
import { getAuctionStatus } from '@/shared/lib/utils/auctionStatus';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search')?.trim() || '';

  try {
    let query = adminClient
      .from('auction')
      .select(
        `
        *,
        product:product_id(
          name,
          category,
          description
        ),
        seller:seller_id(
          username,
          address
        )
      `
      )
      .order('end_time', { ascending: false });

    // 검색 테이블 활용
    if (search) {
      // 1단계: 검색 테이블에서 매칭되는 auction_id 찾기
      const { data: searchResults, error: searchError } = await adminClient
        .from('auction_search')
        .select('auction_id')
        .ilike('search_text', `%${search}%`);

      if (searchError) {
        console.error('검색 오류:', searchError);
        return NextResponse.json({ error: '검색 중 오류가 발생했습니다' }, { status: 500 });
      }

      const auctionIds = searchResults?.map((item) => item.auction_id) || [];

      // 2단계: 찾은 ID로 실제 경매 데이터 조회
      if (auctionIds.length > 0) {
        query = query.in('auction_id', auctionIds);
      } else {
        // 검색 결과가 없으면 빈 배열 반환
        return NextResponse.json([]);
      }
    }

    const { data, error } = await query;
    if (error) throw error;

    // status 계산
    const result = (data || []).map((item: any) => {
      const { status: oldStatus, ...rest } = item;
      return { ...rest, status: getAuctionStatus(item) };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error('서버 에러:', err);
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다' }, { status: 500 });
  }
}
