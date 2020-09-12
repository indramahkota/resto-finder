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