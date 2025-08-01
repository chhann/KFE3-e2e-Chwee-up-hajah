self.addEventListener('push', function (event) {
  event.waitUntil(
    (async () => {
      try {
        const data = event.data?.json();
        // console.log('🔔 알림 데이터:', data);
        await self.registration.showNotification(data.title, {
          body: data.body,
          icon: '/TA.webp',
          data: { url: data.url },
        });
      } catch (err) {
        console.error('❌ 알림 표시 실패:', err);
      }
    })()
  );
});

// 클릭 시 이동
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const url = event.notification.data?.url || '/';

  event.waitUntil(clients.openWindow(url));
});
