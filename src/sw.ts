import { register } from "./scripts/globals/registerSw";
import { getNotificationSubscription, requestNotificationPermission } from "./scripts/globals/requestNotification";

window.addEventListener("load", async () => {
    await register('./sw.js');
});

window.addEventListener('DOMContentLoaded', async () => {
    /* Belum sempat buat tombol untuk request notif menggunakan gesture */
    await new Promise(res => setTimeout(res, 3000));
    await requestNotificationPermission();
    await getNotificationSubscription();
});