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
    header (app-bar) & aside (side-bar)--|-----> satu komponen
    hero (hero-element)------------------|-----> satu komponen
    main --------------------------------|
        article (card-element)-----------|-----> satu komponen
    footer (foot-bar)--------------------|-----> satu komponen
*/

import App from "./scripts/App.js";
document.addEventListener("DOMContentLoaded", App);