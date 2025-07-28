if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    a[s] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[t]) return;
    let d = {};
    const n = (e) => s(e, t),
      f = { module: { uri: t }, exports: d, require: n };
    a[t] = Promise.all(i.map((e) => f[e] || n(e))).then((e) => (c(...e), d));
  };
}
define(['./workbox-5194662c'], function (e) {
  'use strict';
  importScripts('/worker-05c779c7c88c7d38.js'),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/TA.png', revision: '67477bccc5de8a998d82271af31463d0' },
        {
          url: '/_next/static/KsaFI1RyXhwdTDVGKChuT/_buildManifest.js',
          revision: '3e8070024b9d8ce21d149533aa80d902',
        },
        {
          url: '/_next/static/KsaFI1RyXhwdTDVGKChuT/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/_next/static/chunks/1128-f574dd3750106a64.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/1286-7f9055398f640503.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/1573.ebc73de5fad67534.js', revision: 'ebc73de5fad67534' },
        { url: '/_next/static/chunks/1648.f85f9e9bc5081d52.js', revision: 'f85f9e9bc5081d52' },
        {
          url: '/_next/static/chunks/18a7c6bb-6223adbfc96666b1.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        { url: '/_next/static/chunks/2144-232897be2528d510.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/3950-814e0b423ca80b02.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/3b72e6b6.5d0b4b8456c1a13b.js', revision: '5d0b4b8456c1a13b' },
        { url: '/_next/static/chunks/402.a6cbb1f7f9d80fcb.js', revision: 'a6cbb1f7f9d80fcb' },
        {
          url: '/_next/static/chunks/40f260ba-74ccea07e881a15c.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        { url: '/_next/static/chunks/4122-4c97a4f72de3e277.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/4499-3d2955db8ef6b75b.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/4706-ffc3e5f6dfc66080.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        {
          url: '/_next/static/chunks/528424ce-438410144fcfbf92.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/559ea92e-b5c11aeb1de6b11a.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        { url: '/_next/static/chunks/5857-a7099bf89aa61c48.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/6049-370a2dbbf761683e.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/6740-7041a7acc0fcd2f8.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/6816-1d3275e79c3371ef.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/6837-6b1125c76567f40e.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        {
          url: '/_next/static/chunks/70c0886e-edb884bf53f5b730.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/750ca729-7a40b386bc29ef9e.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        { url: '/_next/static/chunks/811-011c9144cee5ade6.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/8126-412e306942b781a4.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/8430-f8a530be771ffd75.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/8559.6441da337d396174.js', revision: '6441da337d396174' },
        { url: '/_next/static/chunks/860-24dddb9f302e6e97.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/8886-534cfc64cad2def3.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/9448-02f172813ad05321.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/9580-264192fe2e28dc21.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/9863-10ecc018320f6c3b.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        { url: '/_next/static/chunks/9913-4c8709f4085ed943.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        {
          url: '/_next/static/chunks/9b402015-0fcd4e8bbaa13840.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/callback/page-247725b1cbb68a4e.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/dashboard/page-108543c11467c12b.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/handle/page-da6328ee0b485022.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-84ea926cf90b473e.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/page-111a3a77ee2bc4f6.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/mcp/page-b8587bc6c8e7f508.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/password-reset/page-87a979db16484e07.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/password-update/page-f65d49d68dbb1ec4.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset_password/page-937f3a5fbee89289.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/complete/page-8da5cc2d0efe0596.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/page-cfc7c8bbbe7baad6.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/user/dashboard/page-ae8572acd0f2d6c3.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(auth)/verify-otp/page-5a373b1e7be9d78f.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/%5BauctionId%5D/auction-detail/page-d5bb273c60708b84.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/%5BauctionId%5D/auction-edit/page-19e2c00ce8833846.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/auction-add/page-873baccf42639a6c.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/auction-list/page-42150c9779ed034e.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-listings/page-086f8f291c1ca9b1.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-participated/page-1e85c11d8ea9d73e.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-won-auctions/page-f43ed519ad941531.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/chat/%5BroomId%5D/page-776383cd4745d50f.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/chat/page-54682bea603b3621.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/cron-test/page-cbba516184a8f7e5.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/hotdeal/%5BhotdealId%5D/detail/page-b01dcff745cfff63.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/layout-f1ee3c0fc11b3c43.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/main/page-56f022134e187db5.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/page-c4fc0a5b6567793c.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/points-history/page-b747156b79c806e1.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/update/page-d43e5c2578d7b47d.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/events/page-4fd693f762bd9879.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/events/popup/page-53774ae54b835f2f.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/hot_deals/page-95791d68a879f9c7.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/page-027735a314a87ff1.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/(test)/sentry-test/page-b297a5a35582ea2c.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-0489e1d07e2d74aa.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/add/route-62e5689909f8cede.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bid/route-f4fe70424cb7633a.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bidder-name/route-88539ac67844a5fc.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/delete/%5BauctionId%5D/route-cbe112604432a328.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/detail/%5BauctionId%5D/route-04d27b9c228ffe51.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/list/route-48a5b27e57d081fe.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-listings/ended/route-d1c7b8991cbee801.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-listings/in-progress/route-b5f479800961073f.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-participated/route-b34df7e197da6cab.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-won-auctions/route-f6f9539fae40c4d4.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/product-image/route-cd7e566ecdb0b507.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auction/put/%5BauctionId%5D/route-5cc5ea2c16dc1ebd.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/callback/route-e1287fdb34d3a64f.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check-duplicate/route-2f7ab873aab82d19.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/email/route-8d36991d9802c9dc.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/username/route-e893b7c1ceb922b7.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-03ea07be48d9f2d2.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/logout/route-1b302bdb00fb342e.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/me/route-00da23a1fc1dda9d.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/password-reset/route-fd6a71ebee3a2ef3.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/password-update/route-2e44bf18f3fd9533.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/signup/route-057cc097c31599a1.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/verify-otp/route-7b03a41dec4be6a2.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/auth/webhook/route-2d30d66ffc54001a.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/chat/list/route-1837ad1855b7c3ff.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-read/route-d2643f01063414bd.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-send/route-c3a940b8bf850f5a.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-senders/route-2553ae169adddbba.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/chat/room/route-49b92a08df3139d4.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/chat/unread-count/route-3ba2488daa6edc7f.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/cron/check-auctions/route-5703415118c0ca40.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/events/popup/admin/route-238dc909e084450f.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/events/popup/client/route-7a091514eb565610.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/events/route-d59086d0f27ccb66.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/hot-deals/route-7ee12360585e31fa.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/hotdeal/%5BhotdealId%5D/detail/route-58b289446885b4c7.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/hotdeal/purchase/route-f4177b709e306332.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/notification/list/route-1fcc6bf794ccceeb.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/point/add-test/route-6b155ebca9bab0e8.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/point/deduct-test/route-7541e8e2dcfa6a49.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/point/history/route-f93a6b6a76b32e87.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/product/route-c1d8837a0d112cdc.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/profile/get/route-2957aec8cc0a2c60.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/profile/update/route-be5f8bd4e553b6ef.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/profile/upload-avatar/route-a2d070b6010b6b9b.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/push-subscribe/route-eb94353e9c2ca884.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/api/sentry-test-error/route-cb4097dd577cdd8b.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/auth/callback/route-6114ef4c7e0c8a5b.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/global-error-6c3f253aa1989c5a.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/layout-6f2806b7a92f9dca.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/app/page-a6ca2608d1e09a74.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/b2d1c282-78995f6c5a9539f2.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/framework-054327b63c9512d6.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        { url: '/_next/static/chunks/main-30a566d733493954.js', revision: 'KsaFI1RyXhwdTDVGKChuT' },
        {
          url: '/_next/static/chunks/main-app-0e9ffe62f68928da.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/pages/_app-422baed1abd5c5a1.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/pages/_error-9ad83f588f00d603.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-9b70701b2ccd342a.js',
          revision: 'KsaFI1RyXhwdTDVGKChuT',
        },
        { url: '/_next/static/css/42177ec5a5ac5460.css', revision: '42177ec5a5ac5460' },
        { url: '/_next/static/css/78102ed9fbf37bb4.css', revision: '78102ed9fbf37bb4' },
        { url: '/_next/static/css/ca809870a908c6e9.css', revision: 'ca809870a908c6e9' },
        { url: '/_next/static/css/e2a5c6a494077d62.css', revision: 'e2a5c6a494077d62' },
        {
          url: '/_next/static/media/020c46951bd94c9e-s.woff2',
          revision: 'a0ab1f3ba9c712976ecdacfb6c68bd95',
        },
        {
          url: '/_next/static/media/03dbbbe0b92fa1e9-s.woff2',
          revision: '8544345c08163a3458d3be95784b103f',
        },
        {
          url: '/_next/static/media/067c207e28daa02d-s.woff2',
          revision: '2e481192f164c65219517f1afb0bef57',
        },
        {
          url: '/_next/static/media/072179cf16506c56-s.woff2',
          revision: '1ca29a37740eb4de8d6e4d8d3f6251bf',
        },
        {
          url: '/_next/static/media/0a54d98be049381e-s.woff2',
          revision: '7e8ec3bfe7eed1badc8e8847514d4eb4',
        },
        {
          url: '/_next/static/media/11ca998efae3cd94-s.woff2',
          revision: '88041efa145d298d3d88e7c3fe50a493',
        },
        {
          url: '/_next/static/media/1ada00f9c4662520-s.woff2',
          revision: 'e9ecdcae8a8edc1a39c2f30a549e51ad',
        },
        {
          url: '/_next/static/media/1bd4b416c8a9edc8-s.woff2',
          revision: '8ef3beaad43cc20f7e09df52bc6dabf3',
        },
        {
          url: '/_next/static/media/1f294bb0d46c0f79-s.woff2',
          revision: '405258f31612bfe22bf6af67bff41ac4',
        },
        {
          url: '/_next/static/media/237aa9f7d0280d6e-s.woff2',
          revision: '90f6f17880ff9892a00901c3d1d65d0e',
        },
        {
          url: '/_next/static/media/239c7d86781f65b5-s.woff2',
          revision: 'f33cc117172151465bdb2adf79059209',
        },
        {
          url: '/_next/static/media/266d17b1e16f474d-s.woff2',
          revision: 'c08bb41fd628b461ced89bbfe1c9ead3',
        },
        {
          url: '/_next/static/media/26c7625d359ee13f-s.woff2',
          revision: 'dfac94a2e5f4a17d35c1179025f6377c',
        },
        {
          url: '/_next/static/media/274ff7c6b42f2317-s.woff2',
          revision: '5ee806ce75c09f5553e7c43ad9c61332',
        },
        {
          url: '/_next/static/media/2836a72d289d3c1b-s.woff2',
          revision: '134e21c79b71316c6035e7481107544f',
        },
        {
          url: '/_next/static/media/2b77269ee9de7197-s.woff2',
          revision: '52b5537b2841507c4d7323d8825aa150',
        },
        {
          url: '/_next/static/media/2bdfc672bc6f2f48-s.woff2',
          revision: '429930281d9a7e8a927d912c16c2b1bc',
        },
        {
          url: '/_next/static/media/2e9bac3d3f3b49ba-s.woff2',
          revision: '8addcd7ee64b044a6a8fa7e881b9b463',
        },
        {
          url: '/_next/static/media/34ad2ea93cf3ac86-s.woff2',
          revision: 'ff6ed9baa425558fbc24058730c6be7f',
        },
        {
          url: '/_next/static/media/39cd847ae768a3c6-s.woff2',
          revision: '90131899568b83627b57e104c4ba43ed',
        },
        {
          url: '/_next/static/media/3c3f736084dad553-s.woff2',
          revision: 'dcd8cdf06dca180acf306795459fb576',
        },
        {
          url: '/_next/static/media/3cc1be944175fa22-s.woff2',
          revision: '62de83964a77d2510170d83a2df3cfe4',
        },
        {
          url: '/_next/static/media/45cca0c1391027f2-s.p.woff2',
          revision: '4bc554da790fb0926475cbed6e22399d',
        },
        {
          url: '/_next/static/media/45e103cabbdcf912-s.woff2',
          revision: '399648c03c984308c6347ceb3bec0695',
        },
        {
          url: '/_next/static/media/46f7500482b99baa-s.woff2',
          revision: 'b5490732ba257b1c7c46d1823b75ff31',
        },
        {
          url: '/_next/static/media/470d0f41670a3a37-s.woff2',
          revision: '8576a5463ca3e1f16d0fbe7151158d78',
        },
        {
          url: '/_next/static/media/4add25c84286113c-s.woff2',
          revision: '0dcaa13058b90e5f0ab39942a55f739c',
        },
        {
          url: '/_next/static/media/4dcf8ffdef8c6e8d-s.woff2',
          revision: 'bc198683f862f1c05266aa757856b262',
        },
        {
          url: '/_next/static/media/4e68118c0f4b36cd-s.woff2',
          revision: 'bee54d1c4dfd9450e45c9c52a0e19988',
        },
        {
          url: '/_next/static/media/50119d84aa423e01-s.woff2',
          revision: '77cabb0a7ae478266909d246eb9e3b6b',
        },
        {
          url: '/_next/static/media/55a26284b595d874-s.woff2',
          revision: '688c9a6d66cf55171f1b4469c5f3a852',
        },
        {
          url: '/_next/static/media/55f6335489b0e791-s.woff2',
          revision: '12301d649a99d0ce8b5c8cdfba35378e',
        },
        {
          url: '/_next/static/media/57b91bf39c221c0f-s.woff2',
          revision: '3350f39cfef40b4398d75e0aeef6cd6e',
        },
        {
          url: '/_next/static/media/588804d3ec427b8a-s.woff2',
          revision: 'e0fbeeb9bae1edbc9360e3a06bc3053c',
        },
        {
          url: '/_next/static/media/59bb072b0a4af0d4-s.woff2',
          revision: 'b9f7d9ca2bc2c7b3ea9f3fa084219d86',
        },
        {
          url: '/_next/static/media/5aab28c7e733d084-s.woff2',
          revision: 'f5608c3cc20aebbf4dce453cc35a466c',
        },
        {
          url: '/_next/static/media/5bd9701809e9b3b1-s.woff2',
          revision: 'a0794274a624028683bbc6899f57a542',
        },
        {
          url: '/_next/static/media/5f07bcb9224b1bf4-s.woff2',
          revision: 'd25a29a1254c2a41bd3397fbe8168d4f',
        },
        {
          url: '/_next/static/media/6109fccb68c7ef91-s.woff2',
          revision: '50e5c12220f3e3bc431541c62ae8d1c8',
        },
        {
          url: '/_next/static/media/62c7dab4cd928fa3-s.woff2',
          revision: 'c51010709336703f04e1063a495ed802',
        },
        {
          url: '/_next/static/media/64c365e5eea3bceb-s.woff2',
          revision: '64be0809ef200758a53da4b5cc897ee5',
        },
        {
          url: '/_next/static/media/65119ea652c34dc5-s.woff2',
          revision: '07d5cecd355fd55a7c345db40f8e52e3',
        },
        {
          url: '/_next/static/media/65c4faf424b14e39-s.woff2',
          revision: '60436780f2ed79a7227dd9678624dd63',
        },
        {
          url: '/_next/static/media/6714d4bc43270b26-s.woff2',
          revision: '0515c109b8b547968df142f3305a4bee',
        },
        {
          url: '/_next/static/media/6c9c425ccd8d82a8-s.woff2',
          revision: '28f83a983f046a180b5138e5299394f2',
        },
        {
          url: '/_next/static/media/6ed8e415052af782-s.woff2',
          revision: '602628eab17a32e46bf2a7a140d8eee9',
        },
        {
          url: '/_next/static/media/723ee4db144a4843-s.woff2',
          revision: 'ed4aa9cdd332248bb041a85ca39ffe86',
        },
        {
          url: '/_next/static/media/724803dfdf8f94d6-s.woff2',
          revision: 'da38897d11ea368e4fff4f8b6b3fba59',
        },
        {
          url: '/_next/static/media/7371b5eb2b380826-s.woff2',
          revision: 'c7bb5485b9375f2ec264c23e93392546',
        },
        {
          url: '/_next/static/media/740094a2fbba3646-s.woff2',
          revision: 'ef6d5d488b53e9275550436c1cfbebf8',
        },
        {
          url: '/_next/static/media/7508857832a474e7-s.woff2',
          revision: '0c6fc8011c8673e5bb2aab52ad8ffc6d',
        },
        {
          url: '/_next/static/media/78beec79f49102e0-s.woff2',
          revision: 'fe1ceafd3dfc69de3f22ef665bd1cf20',
        },
        {
          url: '/_next/static/media/795510a158c72702-s.woff2',
          revision: '6ddc9ad7f0e28d143261de315d293d2c',
        },
        {
          url: '/_next/static/media/7bde5418c77516fe-s.woff2',
          revision: '4b1c7b21073c55da548364864a3c52b8',
        },
        {
          url: '/_next/static/media/7bf4721b17c90bb9-s.woff2',
          revision: '70b10b0994bb750fb3f1701fbb2f9cbf',
        },
        {
          url: '/_next/static/media/856696a964f1ca66-s.woff2',
          revision: '4f8dee2578310e75443ecaf3e17ab407',
        },
        {
          url: '/_next/static/media/85719754983fa3ae-s.woff2',
          revision: 'ed5c2badd176783d857805cbc79e03bd',
        },
        {
          url: '/_next/static/media/8983548b952a6637-s.woff2',
          revision: '9790961073c98943915298a35e94d1ff',
        },
        {
          url: '/_next/static/media/89c927d185a3ce0e-s.woff2',
          revision: '29671775a48f7b90eac956dcd6299e4e',
        },
        {
          url: '/_next/static/media/8a4615270e781fbd-s.woff2',
          revision: '943996e445cde8002cd26dd731123211',
        },
        {
          url: '/_next/static/media/8e6c3f8fa568ca26-s.woff2',
          revision: '1372d086d4802870e5f583c63ee615c0',
        },
        {
          url: '/_next/static/media/8e74e876bc98de65-s.woff2',
          revision: '3e7c7ba614c60066a11a7cb555c49d38',
        },
        {
          url: '/_next/static/media/8ff8298e80f4d6be-s.woff2',
          revision: '259cfe7637cce293f92bc5499367f2a0',
        },
        {
          url: '/_next/static/media/91267aa546c4a12e-s.woff2',
          revision: 'acfd604571f28d1faec7b2f585a1f4df',
        },
        {
          url: '/_next/static/media/95ed080df25833fb-s.woff2',
          revision: '836d14736b8a5da79ae9c7149c39894a',
        },
        {
          url: '/_next/static/media/9641a13eeef8f24f-s.woff2',
          revision: 'e76eaff15faf13bda84fb770c7376ea0',
        },
        {
          url: '/_next/static/media/9c5d9dc5d7926213-s.woff2',
          revision: '6b8206a4761c5661a8f9ae1055fc27d3',
        },
        {
          url: '/_next/static/media/9c66200ef5e648da-s.woff2',
          revision: '922b55ba9925a02655fc166436a909fd',
        },
        {
          url: '/_next/static/media/9c8fcb0b471a86b7-s.woff2',
          revision: 'c034944b24812ea7b0bd23b564f205e9',
        },
        {
          url: '/_next/static/media/a0365f2460fe0559-s.woff2',
          revision: '4a493992ca432b0668a694f9c58e7dcf',
        },
        {
          url: '/_next/static/media/a2cbe8545b19ead8-s.woff2',
          revision: 'ad9aaf05209f0776f4003dc38b0cccac',
        },
        {
          url: '/_next/static/media/a41b0c1cd75dab4a-s.woff2',
          revision: 'fea404df40e3bc85789a37c9c66aebec',
        },
        {
          url: '/_next/static/media/a823e5e1467f9eea-s.woff2',
          revision: 'f7e11370cce8188d285e7435eb47f007',
        },
        {
          url: '/_next/static/media/ac1bbb4e5a71541d-s.woff2',
          revision: '981ed86dc6aa0fb3af52b1f889ae5dc5',
        },
        {
          url: '/_next/static/media/ac993f7dd3619e88-s.woff2',
          revision: 'ae71ff50edec9b59551af90fa79fc6dd',
        },
        {
          url: '/_next/static/media/b0fa9e2a1839f933-s.woff2',
          revision: '3b2d885e018b715f1b60f841ff31c2db',
        },
        {
          url: '/_next/static/media/b1558ce32b4e391f-s.woff2',
          revision: '9aaae1c8d17d96db376c588774a73814',
        },
        {
          url: '/_next/static/media/b5b5fec85c127da2-s.woff2',
          revision: '2d2c53ee0a504c010edc23e58374e2fa',
        },
        {
          url: '/_next/static/media/b7f156a3200f29b8-s.woff2',
          revision: '8adc3054d2669f8cab9ac2607ab13817',
        },
        {
          url: '/_next/static/media/b990a077f9fe361e-s.woff2',
          revision: '0ac39c71ebb604e0dffbe37d559e1a64',
        },
        {
          url: '/_next/static/media/bb45fa228e2432f6-s.woff2',
          revision: '85a10b8fe98be16b76dca1c6cee18221',
        },
        {
          url: '/_next/static/media/bd0d618ae69a2f66-s.woff2',
          revision: 'c7a4ae48876d94cf55943753b484fac5',
        },
        {
          url: '/_next/static/media/bd104c7a061b03f4-s.woff2',
          revision: '3ad342867c16b75b707f23dcd91a536a',
        },
        {
          url: '/_next/static/media/bd973175db31e3db-s.woff2',
          revision: 'cf60fda95796184081a56425b69aa7b7',
        },
        {
          url: '/_next/static/media/bdfbf78d21336532-s.woff2',
          revision: '0a4a5836d38a3f299b66db719ea1b7e5',
        },
        {
          url: '/_next/static/media/c0911fe26a1d7c65-s.woff2',
          revision: 'd45f0b47b942a52a7b53cff112d43d4d',
        },
        {
          url: '/_next/static/media/c0a31e16475426bb-s.woff2',
          revision: 'd857eb4c5a24d60f3bd74a60d6dcc682',
        },
        {
          url: '/_next/static/media/c23599eea06087ad-s.woff2',
          revision: '01e398963b8808c9fe2eaf7ae1f85c1d',
        },
        {
          url: '/_next/static/media/c28cb730c42ef1d6-s.woff2',
          revision: '78aa8b9dcd045fb83211c8e63a397a76',
        },
        {
          url: '/_next/static/media/c4ad30b0e30a9918-s.woff2',
          revision: '6f10196146335d31cceda327335a5dfe',
        },
        {
          url: '/_next/static/media/c8a4fe591f627e8d-s.woff2',
          revision: 'b65b68d487e19fd34d7c764c35592509',
        },
        {
          url: '/_next/static/media/cad6a495f6881999-s.woff2',
          revision: 'f015cd3a1682a54b3b17cbc5a8644cd7',
        },
        {
          url: '/_next/static/media/cb4b041861a8a390-s.woff2',
          revision: '9b3b2bea16443d9d0e1cbf8a958966cc',
        },
        {
          url: '/_next/static/media/cc47bf154475de2b-s.woff2',
          revision: 'd24f69bda4adbf648c6903eb94096d7e',
        },
        {
          url: '/_next/static/media/cf1ed07d36c925c7-s.woff2',
          revision: 'd288d4c35180c76640a69776a3208cd9',
        },
        {
          url: '/_next/static/media/cff5778ca282ec76-s.woff2',
          revision: '00d4395346cbd21dfb909286b7bbb09e',
        },
        {
          url: '/_next/static/media/d081be4378c13f10-s.woff2',
          revision: '081eca8998ab6fc831b2dd0fb1b954a4',
        },
        {
          url: '/_next/static/media/d28105c2714c6b8e-s.woff2',
          revision: '18ab7653eccf65565348b4d614c2fedc',
        },
        {
          url: '/_next/static/media/d2edd2f0dadbe410-s.woff2',
          revision: 'fabe0f5a4986657a5d529ede922d5c20',
        },
        {
          url: '/_next/static/media/d33d9bc07c8a848b-s.woff2',
          revision: '32e72cabe599ba0f8ffff66e6890b1ac',
        },
        {
          url: '/_next/static/media/d5ad0d63bc06c348-s.woff2',
          revision: '2ed6411b6b106795de586813d79631e4',
        },
        {
          url: '/_next/static/media/d989f80d4970c965-s.woff2',
          revision: '9694d6e857fd571cb0fdafc4d6258b8e',
        },
        {
          url: '/_next/static/media/d9f0dfad1a609b96-s.woff2',
          revision: 'adc28e01052a5a5a419fab3e6dacaad8',
        },
        {
          url: '/_next/static/media/da50ed8e5a547421-s.woff2',
          revision: '3a262f071222d466b4d87d0581fcbe30',
        },
        {
          url: '/_next/static/media/da8b2ae779bc629e-s.woff2',
          revision: '4466d3b099fddd879aaa62e205d06f6d',
        },
        {
          url: '/_next/static/media/dc3521727fdeab55-s.woff2',
          revision: '2cd2f3876bf44890d5c243291bcbf06c',
        },
        {
          url: '/_next/static/media/de55424a3bb9dbf4-s.woff2',
          revision: '6e6df38136fbeebe61b8428872e88ecd',
        },
        {
          url: '/_next/static/media/df2272531fb6f7d1-s.woff2',
          revision: 'f5d22b93744ef836acc458b34234ace2',
        },
        {
          url: '/_next/static/media/e11544179b5cde4b-s.woff2',
          revision: 'c7d5eec73754295ff68e46c7c6f6b430',
        },
        {
          url: '/_next/static/media/e2a7488a6124eb55-s.woff2',
          revision: 'dfc6889df588149d5003d9fc26fcc240',
        },
        {
          url: '/_next/static/media/e59b636b6c2c02b9-s.woff2',
          revision: '8d3431102e14f12a76ab552913a168ee',
        },
        {
          url: '/_next/static/media/e8eb5ef92db1992d-s.woff2',
          revision: '5028a59e9cad94dd759b0c6574e4dfc1',
        },
        {
          url: '/_next/static/media/eee2ca118e25e6e1-s.woff2',
          revision: '41440cec8b319c148162826ae376c43e',
        },
        {
          url: '/_next/static/media/f2d54562d6dd1bf9-s.woff2',
          revision: 'f30ca7319a08674db58e53612ded6f43',
        },
        {
          url: '/_next/static/media/f385789fad3ded7c-s.woff2',
          revision: '594443e7b1f711f7de7edafd7a76f6c0',
        },
        {
          url: '/_next/static/media/f651f91b241cbfe2-s.woff2',
          revision: '8e99859e172af4f424950cbee1e2e535',
        },
        {
          url: '/_next/static/media/f6dc971681358635-s.woff2',
          revision: '3fdcf6d0623c2fd9c90eff18dfcb5075',
        },
        {
          url: '/_next/static/media/f83637dc978f29fa-s.woff2',
          revision: 'a2d621e17f15ab322a0fc41f3ed0737d',
        },
        {
          url: '/_next/static/media/f846fb1644f1e567-s.woff2',
          revision: 'bda9d56f897579673f0f67e0ee1eb388',
        },
        {
          url: '/_next/static/media/f9638adf79e99717-s.woff2',
          revision: '02bef2db5c0e9d9adddc6ab36b8d5074',
        },
        {
          url: '/_next/static/media/faa213b35a0991ad-s.woff2',
          revision: '0c5debe9792bd6cf5ed051bfb9a53cff',
        },
        {
          url: '/_next/static/media/fcccd54ec792b179-s.woff2',
          revision: 'dfc4838e1367f4ad3635c913b954461b',
        },
        {
          url: '/_next/static/media/fdec3d835a61ce25-s.woff2',
          revision: '5e8f4a09da746cfca2c4acb21ef53950',
        },
        {
          url: '/_next/static/media/ffc2e3dbe32724e2-s.woff2',
          revision: '168ee87727f0250b0818b46ba8f283e9',
        },
        { url: '/category-images/book.avif', revision: 'a436647ef5d8ecdf3a62ceffe8769bd3' },
        { url: '/category-images/category_all.svg', revision: '0ab8c5c10873a85a12d115cd59bd773b' },
        { url: '/category-images/clock.avif', revision: 'cbd1122395850894d53b44642e42d187' },
        { url: '/category-images/clothes.avif', revision: 'fe03fd198585fe1471ee60a2e4b84d80' },
        { url: '/category-images/cosmetics.avif', revision: '9fea72e8b7b1a34380199f6a969baf92' },
        { url: '/category-images/dumbbell.avif', revision: '823372987d590278e260675025472683' },
        { url: '/category-images/etc.svg', revision: '7bc5a0ae668c2133ce7ff5fa378939a2' },
        { url: '/category-images/kitchen.avif', revision: '32024b5a7c65c13d0c6d2017561d3a8e' },
        {
          url: '/category-images/office-supplies.avif',
          revision: '1211c4064a23cda98d94649cdfc2b1da',
        },
        { url: '/category-images/refrigerator.avif', revision: '8ab38e6637873d31a3560e0a591b31f0' },
        { url: '/category-images/sofa.avif', revision: 'f28cca32bb961d503ae330b1fb3111ff' },
        { url: '/circles.svg', revision: '0c6a2a083822c7a8e9863df11deeacc0' },
        { url: '/icon192.png', revision: '8da59bb530f3da3ab4ae57497aaebd7d' },
        { url: '/icon512.png', revision: 'e89ac80029754768794413623b8250d4' },
        { url: '/images/avatar.png', revision: 'ea59b2ac143feaf24a9f4f37fd2df08c' },
        { url: '/maik-narrow.jpg', revision: '7afc1ba27c182dbd27039498c9270cf8' },
        { url: '/maik.jpg', revision: 'eaa9dca4da4e7a7abe4da3f4dcef2fba' },
        { url: '/manifest.json', revision: '526e94baf8b879517198445b90fbe465' },
        { url: '/mock-image/images (1).jpg', revision: '0adefa4c0c28da81e6a0df2fd8a8ffbb' },
        { url: '/mock-image/images.jpg', revision: 'cac9b5d93a4bdc6eec33a93018000b2e' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/turborepo.svg', revision: 'd0f8a73e3bc1041867fa305389852319' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
        { url: '/worker-05c779c7c88c7d38.js', revision: '9a41da9c08057bbe2851de35baffad7d' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: function (e) {
              return _ref.apply(this, arguments);
            },
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var a = e.sameOrigin,
          s = e.url.pathname;
        return !(!a || s.startsWith('/api/auth/callback') || !s.startsWith('/api/'));
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var a = e.request,
          s = e.url.pathname,
          i = e.sameOrigin;
        return (
          '1' === a.headers.get('RSC') &&
          '1' === a.headers.get('Next-Router-Prefetch') &&
          i &&
          !s.startsWith('/api/')
        );
      },
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var a = e.request,
          s = e.url.pathname,
          i = e.sameOrigin;
        return '1' === a.headers.get('RSC') && i && !s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var a = e.url.pathname;
        return e.sameOrigin && !a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
//# sourceMappingURL=sw.js.map
