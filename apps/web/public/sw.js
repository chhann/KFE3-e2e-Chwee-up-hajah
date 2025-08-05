if (!self.define) {
  let s,
    e = {};
  const t = (t, n) => (
    (t = new URL(t + '.js', n).href),
    e[t] ||
      new Promise((e) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = t), (s.onload = e), document.head.appendChild(s);
        } else (s = t), importScripts(t), e();
      }).then(() => {
        let s = e[t];
        if (!s) throw new Error(`Module ${t} didn’t register its module`);
        return s;
      })
  );
  self.define = (n, a) => {
    const c = s || ('document' in self ? document.currentScript.src : '') || location.href;
    if (e[c]) return;
    let i = {};
    const f = (s) => t(s, c),
      r = { module: { uri: c }, exports: i, require: f };
    e[c] = Promise.all(n.map((s) => r[s] || f(s))).then((s) => (a(...s), i));
  };
}
define(['./workbox-5194662c'], function (s) {
  'use strict';
  importScripts('/worker-ad2e33b728cb6542.js'),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        { url: '/TA.webp', revision: 'e22e6bfa2984e0703f81fc1a52da83b3' },
        { url: '/TA_192x192.webp', revision: '6dd96846afed5ef232f33dc97f45a462' },
        { url: '/TA_512x512.webp', revision: '5799dcb070bce79087b9817fb6783e31' },
        { url: '/TA_Main.webp', revision: '6188c073f2cc50a545aece9e7e3b3c35' },
        { url: '/TA_Main_Wide.webp', revision: '7ed7896bd9c71c43cd6f6ce6a45ac855' },
        { url: '/_next/static/chunks/1704.64fc32059273f99d.js', revision: '64fc32059273f99d' },
        { url: '/_next/static/chunks/1832.7f664de39a3e87c4.js', revision: '7f664de39a3e87c4' },
        { url: '/_next/static/chunks/1999-225e746969d304ed.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/3125.4c25df206025e3a9.js', revision: '4c25df206025e3a9' },
        { url: '/_next/static/chunks/3359-a621a8d9f4f1d5ff.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/3458.0a6c534378d020fe.js', revision: '0a6c534378d020fe' },
        { url: '/_next/static/chunks/402.1d7b45b540586d3d.js', revision: '1d7b45b540586d3d' },
        { url: '/_next/static/chunks/4050.9d23398928c3aa09.js', revision: '9d23398928c3aa09' },
        { url: '/_next/static/chunks/4467-55ddba07d62fa386.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/4499-2c597c0f520da7e7.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/4715.6b0be2ccfdc3e8f6.js', revision: '6b0be2ccfdc3e8f6' },
        { url: '/_next/static/chunks/4848-53dc14d6816aad80.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/4884-f886abd5c26c0333.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/5217-275dcd64bee0cad1.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/5617-d43eccbeb2542f2b.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/5702-2f81012011c76704.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/5857-0163f1e99b03e04c.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/6052-de8e268cb0400705.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/6080-fd3640923e7dadbf.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/641.7e7df9f491cc188f.js', revision: '7e7df9f491cc188f' },
        { url: '/_next/static/chunks/6740-ee56575ce3408185.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/6816-1d3275e79c3371ef.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        {
          url: '/_next/static/chunks/70c0886e-02a175e950e93713.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        { url: '/_next/static/chunks/7510-699144cd6baeef4a.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/7825-57becaa5b64fb5e9.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/7952-70b2dabb24d2fb71.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/8399.2d201ddaea2e2cf4.js', revision: '2d201ddaea2e2cf4' },
        { url: '/_next/static/chunks/8559.a22e61154e7e639a.js', revision: 'a22e61154e7e639a' },
        { url: '/_next/static/chunks/9580-264192fe2e28dc21.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        { url: '/_next/static/chunks/9845.ea95efa4939a601a.js', revision: 'ea95efa4939a601a' },
        { url: '/_next/static/chunks/9863-10ecc018320f6c3b.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        {
          url: '/_next/static/chunks/app/(auth)/callback/page-44627acf6952611d.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/dashboard/page-f8b85c34fa92bb38.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/handle/page-8150f24f0021f678.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-bc13ef8fa2362e11.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/page-1b10b1fb09157035.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/mcp/page-dcec4eae8300084d.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/password-reset/page-669637d32c937cf7.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/password-update/page-a87edd6fbcfb986c.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset_password/page-bfaa86776adb30f8.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/complete/page-58645791e8dad8e8.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/page-799cb1414ef100b9.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/user/dashboard/page-1259100786ff8185.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(auth)/verify-otp/page-bf1c46fa52855356.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/%5BauctionId%5D/auction-detail/page-0c6e622d0066eb81.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/auction-list/page-c523994d1c4e2a94.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-listings/page-86105230ba360407.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-participated/page-9c332190b15eaef9.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-won-auctions/page-6ce94b64c08d148d.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/cron-test/page-ac1b0b817d450907.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/hotdeal/%5BhotdealId%5D/detail/page-6db79f3036fa7cf3.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/hotdeal/page-6a8ab4d66e35876b.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/layout-0a5cfb79026c9dde.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/main/page-959e7a89fafedc32.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/page-8a2788b10d0c3594.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/auction/%5BauctionId%5D/auction-edit/page-cc6c0c507367f651.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/auction/auction-add/page-08c5675599442c8a.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/chat/%5BroomId%5D/page-432563d3cefbc72d.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/chat/page-365729758d556941.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/layout-019715bf3b6fb8ff.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/profile/points-history/page-e019261689d94404.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(no-footer)/profile/update/page-3d9af27dcb1d593b.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/events/page-dca330fccdbb20da.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/events/popup/page-7d9b85bd820f065b.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/hot_deals/page-a807ef495573ad62.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/(test)/admin/page-49271b69493ef506.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ae1b7bafe83c96c9.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/add/route-ff7d6a1d92e0147f.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bid/route-f02d4e58bee65650.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bidder-name/route-6c76e6ada58a0c76.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/delete/%5BauctionId%5D/route-d3fcf571b9bde505.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/detail/%5BauctionId%5D/route-eda247a87481990f.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/list/route-6fbcc1698c914c4c.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-listings/closed/route-7ff0f274adb21713.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-listings/in-progress/route-2cd3cba8261e5b0a.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-participated/route-75b17054118294d2.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-won-auctions/route-af19874b1219d6ff.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/product-image/route-b3931a7ba1c06d49.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auction/put/%5BauctionId%5D/route-f0991a99f4114cc8.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/callback/route-7224bc1de4211786.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check-duplicate/route-ea707dd77fcd38de.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/email/route-eca77c6620fd18f9.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/username/route-d42fdaa2a23e9477.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-1f3d76096c80ccd6.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/logout/route-5f072b76a70fef45.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/me/route-14c6563e7b446c9d.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/password-reset/route-f4bf11be0d13e2d7.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/password-update/route-cd1a927342a24ef6.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/signup/route-a87b2eaa87a1589c.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/verify-otp/route-44aed149e7c80f63.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/auth/webhook/route-24997dc91f069424.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/confirm-completion/route-fc1b27297c58e979.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/list/route-616047fb6155bb2b.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-read/route-82beda6750254a81.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-send/route-744c5899042df16f.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-senders/route-8cfe9f95771b2ccf.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/reject-completion/route-04d9a1e6569ed679.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/request-completion/route-c2766ccc8564eb98.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/room-header/route-42614d0c85e5c11d.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/room/route-83332e5ff805b32a.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/chat/unread-count/route-fc2fadba83ad2482.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/cron/check-auctions/route-26bdd1949262fc25.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/cron/daily-deal-notifications/route-cf16cf9b58f3eb79.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/cron/hot-deal-notifications/route-fbec4caac132d5b4.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/events/popup/admin/route-fb1c040a89df8c95.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/events/popup/client/route-ba8596d765333f40.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/events/route-7dcca11fd0caac27.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/hot-deals/route-046de369aa7775d5.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/hotdeal/%5BhotdealId%5D/detail/route-3d72396a83244831.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/hotdeal/purchase/route-7ee4909538572478.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/notification/list/route-099b018c87211b98.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/point/add-test/route-1a747cdefccd29be.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/point/deduct-test/route-26ae758f952ea805.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/point/history/route-d4ea9666f68e413f.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/product/route-5cad01c6f0336d40.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/profile/get/route-58f098e7a2df2003.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/profile/update/route-682a2adffd77adbc.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/profile/upload-avatar/route-984a5b7482308deb.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/push-subscribe/route-eb2b8dac9a582c52.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/push-unsubscribe/route-04df4983e593b60d.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/api/sentry-test-error/route-a33e931507a2c93f.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/auth/callback/route-2f61882f800de634.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/global-error-a2a6be483584fb49.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/layout-831060e2dc96af42.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/app/page-ef2c3c32cc845d3a.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/framework-d4d46041637eb4e8.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/main-app-868a7939c5cd9a34.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        { url: '/_next/static/chunks/main-ee37b73b4eae1957.js', revision: 'lc3EMtV9fnKJssPqfXJ7H' },
        {
          url: '/_next/static/chunks/pages/_app-aa03a9da44808316.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/pages/_error-c41aaf33a44392d7.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-fee73d3d0dea0947.js',
          revision: 'lc3EMtV9fnKJssPqfXJ7H',
        },
        { url: '/_next/static/css/78102ed9fbf37bb4.css', revision: '78102ed9fbf37bb4' },
        { url: '/_next/static/css/a36fc7a9dff3100c.css', revision: 'a36fc7a9dff3100c' },
        {
          url: '/_next/static/lc3EMtV9fnKJssPqfXJ7H/_buildManifest.js',
          revision: 'fb4cd059df24a66158b60a9d2b7cc530',
        },
        {
          url: '/_next/static/lc3EMtV9fnKJssPqfXJ7H/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/fonts/NotoSansKR-Bold.woff2', revision: 'ec7996330d12923118980d26ff2105f0' },
        { url: '/fonts/NotoSansKR-ExtraBold.woff2', revision: '98c4bb366c023278546423f66cf4432a' },
        { url: '/fonts/NotoSansKR-Light.woff2', revision: 'd03c8afa84a744d87d2cb1025595079c' },
        { url: '/fonts/NotoSansKR-Medium.woff2', revision: '752100059e6eab3a19f412a2bb351009' },
        { url: '/fonts/NotoSansKR-Regular.woff2', revision: 'd404a3dff48294ca716458a15a6628f8' },
        { url: '/fonts/NotoSansKR-SemiBold.woff2', revision: '99f3ed950c0fbcd5227c5e56962c9bb7' },
        { url: '/hotdealItem1.webp', revision: 'e69ef95aa7b8806b8adde3e928e16f6d' },
        { url: '/hotdealItem2.webp', revision: 'dccdf259c63e513f76166d0b214c4a0d' },
        { url: '/manifest.json', revision: 'b1fe32fa78d0fdbaaa2e2310594540e2' },
        { url: '/worker-ad2e33b728cb6542.js', revision: '65ba7d434efb418f83e25e5ff65deba2' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      '/',
      new s.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: function (s) {
              return _ref.apply(this, arguments);
            },
          },
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new s.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/static.+\.js$/i,
      new s.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new s.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp4|webm)$/i,
      new s.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.sameOrigin,
          t = s.url.pathname;
        return !(!e || t.startsWith('/api/auth/callback') || !t.startsWith('/api/'));
      },
      new s.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new s.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.request,
          t = s.url.pathname,
          n = s.sameOrigin;
        return (
          '1' === e.headers.get('RSC') &&
          '1' === e.headers.get('Next-Router-Prefetch') &&
          n &&
          !t.startsWith('/api/')
        );
      },
      new s.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.request,
          t = s.url.pathname,
          n = s.sameOrigin;
        return '1' === e.headers.get('RSC') && n && !t.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        var e = s.url.pathname;
        return s.sameOrigin && !e.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'pages',
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET'
    ),
    s.registerRoute(
      function (s) {
        return !s.sameOrigin;
      },
      new s.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET'
    );
});
//# sourceMappingURL=sw.js.map
