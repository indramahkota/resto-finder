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
import AppConfig from './scripts/globals/appConfig';

if (window.localStorage.getItem(AppConfig.LCS_THEME) === 'dark') {
    window.document.body.classList.add('dark');
} else {
    window.document.body.classList.remove('dark');
}

//this will replace <noscript> tag if javascript allowed otherwise will show <noscript> element.
render(html`
    <a class="skip-link" href="#content">Skip to Content</a>
    <app-bar></app-bar>
    <div id='content'>
        <hero-element></hero-element>
        <main>
            <foot-bar></foot-bar>
        </main>
    </div>
`, document.body);