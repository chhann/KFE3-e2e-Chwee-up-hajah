import { adminClient } from '@/app/admin';
import { getAuctionStatus } from '@/shared/lib/utils/auctionStatus';
import { NextRequest, NextResponse } from 'next/server';

const PAGE_SIZE = 5; // 페이지당 아이템 수

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const search = searchParams.get('search')?.trim() || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE; // range는 to를 포함하지 않으므로 + PAGE_SIZE

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
        return NextResponse.json({ data: [], nextPage: null });
      }
    }

    // 페이지네이션 적용 (limit보다 하나 더 가져와서 다음 페이지 여부 확인)
    query = query.range(from, to);

    const { data, error } = await query;
    if (error) throw error;

    let nextPage: number | null = null;
    if (data && data.length > PAGE_SIZE) {
      nextPage = page + 1;
      data.pop(); // 마지막 아이템은 다음 페이지 확인용이므로 제거
    }

    const result = (data || []).map((item: any) => ({
      ...item,
      status: getAuctionStatus(item),
    }));

    return NextResponse.json({ data: result, nextPage });
  } catch (err) {
    console.error('서버 에러:', err);
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다' }, { status: 500 });
  }
}
