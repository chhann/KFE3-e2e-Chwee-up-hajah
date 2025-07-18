'use client';
import { useEffect, useState } from 'react';

export const NotificationPermissionButton = () => {
  // const [permission, setPermission] = useState(Notification.permission);

  // const requestPermission = async () => {
  //   const result = await Notification.requestPermission();
  //   setPermission(result);
  //   console.log('🔔 알림 권한 응답:', result);
  // };

  return (
    <div className="p-4">
      {/* {permission === 'default' && (
        <button onClick={requestPermission} className="px-4 py-2 bg-blue-500 text-white rounded">
          알림 허용하기
        </button>
      )}
      {permission === 'granted' && <p>✅ 알림 권한이 허용됨</p>}
      {permission === 'denied' && <p>🚫 알림 권한이 거부됨 (브라우저 설정에서 변경 필요)<button onClick={requestPermission} className="px-4 py-2 bg-blue-500 text-white rounded">
          알림 허용하기
        </button></p>} */}
    </div>
  );
};
