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

/* body
    noscript
    header (app-bar) & aside (side-bar)----------|-----> satu komponen
        .content
            hero (hero-element)------------------|-----> satu komponen
            main --------------------------------|
                article (card-element)-----------|-----> satu komponen
            footer (foot-bar)--------------------|-----> satu komponen
*/

// import App from "./scripts/App.js";
// document.addEventListener("DOMContentLoaded", App);

import AppConfig from './scripts/globals/appConfig';
if (window.localStorage.getItem(AppConfig.LCS_THEME) === 'dark') {
    window.document.body.classList.add('dark');
} else {
    window.document.body.classList.remove('dark');
}