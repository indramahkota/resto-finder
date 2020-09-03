/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-01 17:49:40
 * @modify date 2020-09-01 17:50:42
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';
import AppConfig from './scripts/globals/appConfig';

render(html`
    <foot-bar
        text=${AppConfig.TEXT_FOOTER} >
    </foot-bar>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

import style from './foot-bar.scss';

@customElement('foot-bar')
class FootBar extends CommonElement {
    @property({ type: String, attribute: true })
    text: string;

    static get styles() {
        return [...super.styles, style];
    }

    constructor() {
        super();
        this.text = AppConfig.TEXT_FOOTER;
    }

    render() {
        return html`
            <footer class="footer">
                <p tabindex="0">${this.text}</p>
            </footer>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'foot-bar': FootBar;
    }
}