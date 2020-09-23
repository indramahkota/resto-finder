/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { resolve, join } = require('path');

module.exports = {
  name: "Resto Finder",
  short_name: "Resto Finder",
  description: "Resto Finder - Resto Finder - Provides various information on the best restaurants around you",
  gcm_sender_id: "792532488211",
  start_url: "/",
  display: "standalone",
  background_color: "#FFFFFF",
  theme_color: "#F6CD61",
  fingerprints: true,
  ios: true,
  icons: [
    {
      src: resolve("manifest/icons/icon_57x57.png"),
      destination: join("static", "icons"),
      sizes: "57x57",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_72x72.png"),
      destination: join("static", "icons"),
      sizes: "72x72",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_76x76.png"),
      destination: join("static", "icons"),
      sizes: "76x76",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_96x96.png"),
      destination: join("static", "icons"),
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: resolve("manifest/icons/icon_120x120.png"),
      destination: join("static", "icons"),
      sizes: "120x120",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_144x144.png"),
      destination: join("static", "icons"),
      sizes: "144x144",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_152x152.png"),
      destination: join("static", "icons"),
      sizes: "152x152",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_180x180.png"),
      destination: join("static", "icons"),
      sizes: "180x180",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_192x192.png"),
      destination: join("static", "icons"),
      sizes: "192x192",
      type: "image/png",
      ios: true,
    },
    {
      src: resolve("manifest/icons/icon_256x256.png"),
      destination: join("static", "icons"),
      sizes: "256x256",
      type: "image/png",
    },
    {
      src: resolve("manifest/icons/icon_384x384.png"),
      destination: join("static", "icons"),
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: resolve("manifest/icons/icon_512x512.png"),
      destination: join("static", "icons"),
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
    }
  ],
};
