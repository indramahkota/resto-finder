/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:34:28
 * @modify date 2020-08-30 18:50:41
 * @desc [description]
 */

import 'regenerator-runtime';
import './styles/Index.scss';

import { html, render } from 'lit-html';
import Utils from './scripts/globals/appUtilities';
import AppConfig from './scripts/globals/appConfig';

import "./scripts/App";

window.addEventListener('DOMContentLoaded', () => {
    if (Utils.getLCS(AppConfig.LCS_THEME) === 'dark') {
        window.document.body.classList.add('dark');
    } else {
        window.document.body.classList.remove('dark');
    }

    const App = () => html`
        <a id="skip-to-content" class="skip-link" href="#content">Skip to Content</a>
        <rstf-app></rstf-app>
    `;

    render(App(), document.body);
});