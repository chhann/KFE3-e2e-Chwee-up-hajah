export const BannerBackground = () => {
  // 예시 사용자 이름입니다. 실제로는 props나 다른 상태 관리 라이브러리에서 가져와야 합니다.
  const userName = '홍길동';

  return (
    <div
      style={{
        width: 'calc(100% + 2rem)',
        height: '300px',
        backgroundColor: '#484848',
        marginLeft: '-1rem',
        marginRight: '-1rem',
        position: 'relative', // 자식 요소를 절대 위치로 지정하기 위해 필요
        color: 'white',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '1rem', // (main)/layout.tsx의 px-4와 정렬을 맞추기 위함
          textAlign: 'left',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>반가워요, {userName}님👋</h1>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>좋은 하루 보내세요!</p>
      </div>
    </div>
  );
};
