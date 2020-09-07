/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:34:28
 * @modify date 2020-08-30 18:50:41
 * @desc [description]
 */

import 'regenerator-runtime';
import './styles/Index.scss';
import './scripts/components';

import { html, render } from 'lit-html';
import Utils from './scripts/globals/appUtilities';
import AppConfig from './scripts/globals/appConfig';
import EventType from './scripts/globals/eventType';

window.addEventListener('DOMContentLoaded', () => {
    if (Utils.getLCS(AppConfig.LCS_THEME) === 'dark') {
        window.document.body.classList.add('dark');
    } else {
        window.document.body.classList.remove('dark');
    }

    render(html`
        <a id="skip-to-content" class="skip-link" href="#content">Skip to Content</a>
        <app-bar></app-bar>
        <section id="content">
            <app-content></app-content>
        </section>
        <section id="indramahkota">
            <my-profile></my-profile>
        </section>
        <foot-bar></foot-bar>
    `, document.body);

    window.addEventListener(EventType.LOGO_CLICKED, (event: Event) => {
        document.querySelector('app-content')?.greetingElement?.scrollIntoView();
        document.querySelector('app-bar')?.dataShouldUpdate((event as CustomEvent).detail.hash);
    });
    window.addEventListener(EventType.NAVIGATION_CLICKED, (event: Event) => {
        switch ((event as CustomEvent).detail.hash) {
            case '#find':
                document.querySelector('app-content')?.findElement?.scrollIntoView();
                break;

            default:
                break;
        }
    });
});
