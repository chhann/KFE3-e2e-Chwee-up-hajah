'use client';

import toast from 'react-hot-toast';

export default function ToastTestPage() {
  const notify = () => toast('토스트 메시지 테스트입니다.');
  const notifySuccess = () => toast.success('성공! 잘 되는 것을 확인했습니다.');
  const notifyError = () => toast.error('실패! 잘 되는 것을 확인했습니다.');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
      <h1>React Hot Toast 테스트</h1>
      <button onClick={notify}>기본 토스트 띄우기</button>
      <button onClick={notifySuccess}>성공 토스트 띄우기</button>
      <button onClick={notifyError}>실패 토스트 띄우기</button>
    </div>
  );
}
