/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-27 21:49:01
 * @modify date 2020-08-30 13:15:52
 * @desc [description]
 */

import { html } from 'lit-html';
import CommonElement from '../_base_/CommonElement.js';
import style from './HeroElement.scss';
import responsive from './HeroElementResponsive.scss';
import AppConfig from '../../globals/app-config.js';
import bgImageHero from '../../../assets/images/heros/hero-image.jpg';

class HeroElement extends CommonElement {
    static get properties() {
        return {
            _backgroundImage: {type: String},
            _greeting: { type: String },
            _appName: {type: String}
        };
    }

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();
        this._backgroundImage = bgImageHero;
        this._greeting = AppConfig.TEXT_GREETING;
        this._appName = AppConfig.APP_NAME;
    }

    /* CSS Gradient Generator https://cssgradient.io/ */
    render() {
        const { _greeting, _appName, _backgroundImage } = this;
        return html`
            <div class="hero__background" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.1) 80%), url('${_backgroundImage}')">
                <div class="hero__placeholder">
                    <h2>${_greeting}</h2>
                    <h1>${_appName}</h1>
                </div>
            </div>
        `;
    }
}

customElements.define('hero-element', HeroElement);