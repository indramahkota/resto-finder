import { html, render } from 'lit-html';

import AppConfig from './globals/appConfig';
import Utils from './globals/appUtilities';

import(
    /* webpackPreload: true */
    '../styles/Index.scss');

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