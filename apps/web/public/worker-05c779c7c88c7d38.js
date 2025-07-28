try {
  let e =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof self
              ? self
              : {},
    t = new e.Error().stack;
  t &&
    ((e._sentryDebugIds = e._sentryDebugIds || {}),
    (e._sentryDebugIds[t] = 'ff8d5281-1b1d-4b85-94af-debec9ba6003'),
    (e._sentryDebugIdIdentifier = 'sentry-dbid-ff8d5281-1b1d-4b85-94af-debec9ba6003'));
} catch (e) {}
(() => {
  'use strict';
  self.addEventListener('push', function (e) {
    e.waitUntil(
      (async () => {
        try {
          var t;
          let n = null == (t = e.data) ? void 0 : t.json();
          await self.registration.showNotification(n.title, {
            body: n.body,
            icon: '/TA.png',
            data: { url: n.url },
          });
        } catch (e) {
          console.error('❌ 알림 표시 실패:', e);
        }
      })()
    );
  }),
    self.addEventListener('notificationclick', function (e) {
      var t;
      e.notification.close();
      let n = (null == (t = e.notification.data) ? void 0 : t.url) || '/';
      e.waitUntil(clients.openWindow(n));
    });
})();
