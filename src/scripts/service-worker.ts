// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// import { registerRoute } from "workbox-routing";
// import { CacheFirst } from "workbox-strategies";
// import { ExpirationPlugin } from "workbox-expiration";
// // import { precacheAndRoute } from 'workbox-precaching';
// import { clientsClaim, skipWaiting } from 'workbox-core';

// /* ref: destination: https://fetch.spec.whatwg.org/#concept-request-destination */
// registerRoute(
//   ({request}) => request.destination === 'script' ||
//                  request.destination === 'style',
//   new CacheFirst({
//     cacheName: 'sources',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200]
//       }),
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 365 * 24 * 60 * 60 // 1 Tahun
//       })
//     ]
//   })
// );

// registerRoute(
//   new RegExp(/\.(?:eot|ttf|woff|woff2)$/),
//   new CacheFirst({
//     cacheName: 'font-icons',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200]
//       }),
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 365 * 24 * 60 * 60 // 1 Tahun
//       })
//     ]
//   })
// );

// registerRoute(
//   ({request}) => request.destination === 'image',
//   new CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new CacheableResponsePlugin({
//         statuses: [0, 200]
//       }),
//       new ExpirationPlugin({
//         maxEntries: 60,
//         maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Hari
//       })
//     ]
//   })
// );

// /* ref: https://developers.google.com/web/tools/workbox/guides/codelabs/webpack */
// skipWaiting();
// clientsClaim();

// // precacheAndRoute(self.__WB_MANIFEST, { ignoreUrlParametersMatching: [/.*/] });

// // precacheAndRoute(self.__)