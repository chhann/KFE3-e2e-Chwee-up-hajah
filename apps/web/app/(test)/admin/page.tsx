import Link from 'next/link';

const AdminPage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <Link href="/admin/hot_deals" className="bg-primary-50">
        핫딜 페이지로 이동
      </Link>
      <Link href="/admin/events" className="bg-primary-100">
        이벤트 페이지로 이동
      </Link>
      <Link href="/admin/events/popup" className="bg-primary-200">
        이벤트 팝업 페이지로 이동
      </Link>
    </div>
  );
};

export default AdminPage;
