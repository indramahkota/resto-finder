import { html, render } from 'lit-html';

import AppConfig from './globals/appConfig';
import Utils from './globals/appUtilities';
import registerSw from './globals/registerSw';
import { getNotificationSubscription, requestNotificationPermission } from './globals/requestNotification';
import './views/RstfApp';

window.addEventListener('DOMContentLoaded', () => {
    if (Utils.getLCS(AppConfig.LCS_THEME) === 'dark') {
        window.document.body.classList.add('dark');
    } else {
        window.document.body.classList.remove('dark');
    }

    render(html`
        <a id='skip-to-content' class='skip-link' href='#content'>Skip to Content</a>
        <rstf-app></rstf-app>
    `, document.body);
});

window.addEventListener("load", async () => {
    await registerSw();
    await requestNotificationPermission();
    await getNotificationSubscription();
});