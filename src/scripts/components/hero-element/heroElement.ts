/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-27 21:49:01
 * @modify date 2020-08-30 13:15:52
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';
import AppConfig from './scripts/globals/appConfig';

render(html`
    <hero-element
        background=${AppConfig.APP_HERO_IMAGE}
        greeting=${AppConfig.TEXT_GREETING}
        name=${AppConfig.APP_NAME}
    </hero-element>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

import style from './hero-element.scss';
import responsive from './hero-element-responsive.scss';

@customElement('hero-element')
class HeroElement extends CommonElement {
    @property({ type: String, attribute: true })
    background: string;

    @property({ type: String, attribute: true })
    greeting: string;

    @property({ type: String, attribute: true })
    name: string;

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();
        this.background = AppConfig.APP_HERO_IMAGE;
        this.greeting = AppConfig.TEXT_GREETING;
        this.name = AppConfig.APP_NAME;
    }

    /* CSS Gradient Generator https://cssgradient.io/ */
    render() {
        return html`
            <div class="hero__background" style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.1) 80%), url('${this.background}')">
                <div class="hero__placeholder">
                    <h2>${this.greeting}</h2>
                    <h1>${this.name}</h1>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'hero-element': HeroElement;
    }
}