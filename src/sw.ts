import { register } from "./scripts/globals/registerSw";
import { getNotificationSubscription, requestNotificationPermission } from "./scripts/globals/requestNotification";

window.addEventListener("load", async () => {
    await register('./sw.js');
});

window.addEventListener('DOMContentLoaded', async () => {
    await requestNotificationPermission();
    await getNotificationSubscription();
});