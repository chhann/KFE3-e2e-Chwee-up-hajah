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
        product:product_id!inner(
          name,
          category,
          description
        ),
        seller:seller_id!inner(
          username,
          address
        ),
        prod_filter:product_id(),
        seller_filter:seller_id()
      `
      )
      .order('end_time', { ascending: false });

    // 검색어가 있을 때만 필터링 적용
    if (search) {
      query = query
        .ilike('prod_filter.name', `%${search}%`)
        .ilike('seller_filter.address', `%${search}%`)
        .or('prod_filter.not.is.null,seller_filter.not.is.null');
    }

    const { data, error } = await query;

    if (error) throw error;

    // status 계산 및 덮어쓰기
    const result = (data || []).map((item: any) => {
      const { status: oldStatus, ...rest } = item;
      return { ...rest, status: getAuctionStatus(item) };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error('서버 에러:', err); // catch 블록 에러 로그 강화
    return NextResponse.json({ error: '데이터를 불러오지 못했습니다' }, { status: 500 });
  }
}
