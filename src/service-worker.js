/* eslint-disable no-undef */

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from "workbox-expiration";
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

/* Icons: CacheFirst */
registerRoute(
    new RegExp(/\.(?:eot|ttf|woff|woff2)$/),
    new CacheFirst({
        cacheName: 'font-icons',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 Tahun
            })
        ]
    })
);

/* Image: CacheFirst */
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Hari
            })
        ]
    })
);

const base_url = 'https://dicoding-restaurant-api.el.r.appspot.com/';

/* API: StaleWhileRevalidate */
registerRoute(
    ({ request }) => (request.url.indexOf(base_url + 'list') > -1),
    new StaleWhileRevalidate({
        cacheName: "api-stalewhilerevalidate",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24, // 24 Jam
                maxEntries: 100
            }),
        ],
    })
);

/* API: NetworkFirst */
registerRoute(
    ({ request }) => (request.url.indexOf(base_url + 'detail') > -1),
    new NetworkFirst({
        cacheName: "api-networkfirst",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24, // 24 Jam
                maxEntries: 100
            }),
        ],
    })
);

skipWaiting();
clientsClaim();

self.addEventListener("push", e => {
    let body;

    if (e.data) {
        body = e.data.text();
    } else {
        body = "Push message no payload";
    }

    let options = {
        body: body,
        icon: "static/icons/icon_144x144.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
    };

    e.waitUntil(self.registration.showNotification("Push Notification", options));
});

precacheAndRoute(self.__WB_MANIFEST, { ignoreUrlParametersMatching: [/.*/] });