if (!self.define) {
  let e,
    a = {};
  const i = (i, c) => (
    (i = new URL(i + '.js', c).href),
    a[i] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = a), document.head.appendChild(e);
        } else (e = i), importScripts(i), a();
      }).then(() => {
        let e = a[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, s) => {
    const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (a[t]) return;
    let n = {};
    const f = (e) => i(e, t),
      d = { module: { uri: t }, exports: n, require: f };
    a[t] = Promise.all(c.map((e) => d[e] || f(e))).then((e) => (s(...e), n));
  };
}
define(['./workbox-5194662c'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/chunks/2168-9b48f5a50e0b074f.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/2170-313cdbda92a5d4f6.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/2378-1da4bd4da3b200ac.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/2927-bb21e0bf902af200.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/3185-dbaa4c31c073fcc7.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        {
          url: '/_next/static/chunks/3b72e6b6-87e762a87472e0b7.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        { url: '/_next/static/chunks/402.378e63b76067c224.js', revision: '378e63b76067c224' },
        {
          url: '/_next/static/chunks/40f260ba-cc1c21722868ce43.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/559ea92e-05128022a2c38113.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        { url: '/_next/static/chunks/5857-0dbcaee22ea5629f.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/6373-c3b4ab385557b1de.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/6740-9ab1824c0ec7a1d7.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        {
          url: '/_next/static/chunks/70c0886e-1eba05ad2035788a.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        { url: '/_next/static/chunks/7209-cb0e68821c2b2018.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        {
          url: '/_next/static/chunks/750ca729-57402c6acfc8f22a.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        { url: '/_next/static/chunks/8083-a51a8a7ee2ffcc39.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/8559.369c9d64a9f2c59b.js', revision: '369c9d64a9f2c59b' },
        { url: '/_next/static/chunks/9580-6224902327d6ae49.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/9590-963aee4caf15873a.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/9863-3bad89feadf734b2.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        { url: '/_next/static/chunks/9913-ec8b67eaa0264ffc.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        {
          url: '/_next/static/chunks/9b402015-e2f5b17127510af0.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/callback/page-88e287c8c0bf0bce.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/dashboard/page-457fb52e8a7a027a.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/handle/page-b68576e48dce76e0.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-1e2cb16f66be6907.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/page-3d2c76284c484319.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/mcp/page-e2173365687218ab.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/reset_password/page-04c020947386c3ad.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/complete/page-45772af9a859762a.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/page-aa5f72a3c3d580a8.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(auth)/user/dashboard/page-aff9ebae49409a84.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/%5BauctionId%5D/auction-detail/page-03850f5a4a7075d4.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/auction-add/page-7d0c93efdf438ae8.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/auction-list/page-e8821545ac4e8c7f.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-listings/page-dcdef72a1aaee9f7.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-participated/page-cfa9321c79b521ed.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/auction/my-won-auctions/page-4cf069e08ba7697f.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/chat/%5BroomId%5D/page-dcc6b28a91cbff0a.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/chat/page-3b2d166b3dc95415.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/layout-7925e35cc9729577.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/main/page-d8ce132e43782134.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/charge-history/page-18baa3c4609c6ea0.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/page-45bf73f753492b36.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/update/page-9892a0e3669152b7.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/(main)/test/page-20dfa5b5ee3d04a1.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-d956c215e791838c.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/add/route-39e2014c52561530.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bid/route-d70b3d5f5ead3acc.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/bidder-name/route-99aac4c15b5b51ff.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/detail/%5BauctionId%5D/route-feb3057cea4fba87.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/list/route-940a47b8c970ca02.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-participated/route-c25c3807cd40a42f.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/my-won-auctions/route-609819b1f3bc3d3d.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auction/product-image/route-71e87d384ca45ce3.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check-duplicate/route-8b92f51de1f7db8a.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/email/route-4f034b9a80862b19.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check/username/route-d06b98a08964b50d.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-3aad384149c84727.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/logout/route-a88efede143bd4ea.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/me/route-d5b944608b20bc3c.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/signup/route-b890de18123f046e.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/auth/webhook/route-f41c8173193b2844.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/chat/list/route-31e47f90c4e45908.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-read/route-1034bb2412695b7d.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-send/route-b3fc3a7ef22fe4e4.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/chat/message-senders/route-1758661fa40b0a41.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/chat/room/route-a90294dca39f6881.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/product/route-9b9c2847bd813e7d.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/profile/get/route-b0330b39d65b1953.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/profile/update/route-de8374e2400e3397.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/api/profile/upload-avatar/route-12abb9e1562b9aa7.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/layout-b7c4a5ccba13dc51.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/app/page-dff6fc3bec1af25a.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/b2b66d86-b1c82a9c0642eaad.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/b2d1c282-de98b46af71a6615.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/framework-eb72e5257b5184e1.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        { url: '/_next/static/chunks/main-7c30fc2e326e1784.js', revision: 'oOrEieuz7Z-niJ6OZHa_V' },
        {
          url: '/_next/static/chunks/main-app-1309502cb2021e1d.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/pages/_app-afc208e6f3b9ce91.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/pages/_error-9bb98705986a38c5.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-24c0e5e2b16ce89c.js',
          revision: 'oOrEieuz7Z-niJ6OZHa_V',
        },
        { url: '/_next/static/css/71695a0aaba6382f.css', revision: '71695a0aaba6382f' },
        { url: '/_next/static/css/7ac7798a703e506d.css', revision: '7ac7798a703e506d' },
        { url: '/_next/static/css/c80faa398e4b892a.css', revision: 'c80faa398e4b892a' },
        { url: '/_next/static/css/ca809870a908c6e9.css', revision: 'ca809870a908c6e9' },
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
        {
          url: '/_next/static/oOrEieuz7Z-niJ6OZHa_V/_buildManifest.js',
          revision: 'bd5b0de789e79b6d957c6de4d1033b2c',
        },
        {
          url: '/_next/static/oOrEieuz7Z-niJ6OZHa_V/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/circles.svg', revision: '0c6a2a083822c7a8e9863df11deeacc0' },
        { url: '/icon192.png', revision: '8da59bb530f3da3ab4ae57497aaebd7d' },
        { url: '/icon512.png', revision: 'e89ac80029754768794413623b8250d4' },
        { url: '/images/avatar.png', revision: 'ea59b2ac143feaf24a9f4f37fd2df08c' },
        { url: '/maik-narrow.jpg', revision: '7afc1ba27c182dbd27039498c9270cf8' },
        { url: '/maik.jpg', revision: 'eaa9dca4da4e7a7abe4da3f4dcef2fba' },
        { url: '/manifest.json', revision: 'e918bbf1d5edd92dee9df562ce2072a7' },
        { url: '/mock-image/images (1).jpg', revision: '0adefa4c0c28da81e6a0df2fd8a8ffbb' },
        { url: '/mock-image/images.jpg', revision: 'cac9b5d93a4bdc6eec33a93018000b2e' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/turborepo.svg', revision: 'd0f8a73e3bc1041867fa305389852319' },
        { url: '/vercel.svg', revision: '61c6b19abff40ea7acd577be818f3976' },
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
          i = e.url.pathname;
        return !(!a || i.startsWith('/api/auth/callback') || !i.startsWith('/api/'));
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
          i = e.url.pathname,
          c = e.sameOrigin;
        return (
          '1' === a.headers.get('RSC') &&
          '1' === a.headers.get('Next-Router-Prefetch') &&
          c &&
          !i.startsWith('/api/')
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
          i = e.url.pathname,
          c = e.sameOrigin;
        return '1' === a.headers.get('RSC') && c && !i.startsWith('/api/');
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
