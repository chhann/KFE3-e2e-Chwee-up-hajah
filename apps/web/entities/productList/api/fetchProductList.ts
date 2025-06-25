import { supabase } from '../../../lib/supabase/supabase';

export type SortOption = 'popular' | 'latest' | 'endingSoon';

export const fetchProductList = async (sort: SortOption) => {
  let query = supabase.from('view_products_list').select('*');

  switch (sort) {
    case 'popular':
      query = query.order('bid_count', { ascending: false });
      break;
    case 'latest':
      query = query.order('start_time', { ascending: false });
      break;
    case 'endingSoon':
      query = query.order('end_time', { ascending: true });
      break;
    default:
      break;
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
};
