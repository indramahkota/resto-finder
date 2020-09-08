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
            <section id="greeting">
                <hero-element></hero-element>
            </section>
            <section id="find">
                <resto-container></resto-container>
            </section>
            <section id="favorites">
                <resto-container title="FAVORITES"></resto-container>
            </section>
            <section id="user">
                <my-profile></my-profile>
            </section>
            <foot-bar></foot-bar>
        </section>
        
    `, document.body);
});
