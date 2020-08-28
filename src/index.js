/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:34:28
 * @modify date 2020-08-28 23:22:09
 * @desc [description]
 */
import 'regenerator-runtime';
import './styles/Index.scss';

import './scripts/components';

/* body
    noscript
    #root
        header (app-bar)---------------------|-----> satu komponen
        main (main-container)----------------|-----> satu komponen
            .hero (hero-element)-------------|----------------------> imported komponen
            .content (article-container)-----|----------------------> imported komponen
                article (card-element)-------|----------------------> imported komponen
            footer (foot-bar)----------------|----------------------> imported komponen
        aside (side-bar)---------------------|-----> satu komponen
*/

import App from "./scripts/App.js";
document.addEventListener("DOMContentLoaded", App);