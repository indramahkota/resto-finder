/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-01 20:13:05
 * @modify date 2020-09-01 20:13:07
 * @desc [description]
 */


/*
// Penggunaan
import {html, render} from 'lit-html';
import AppConfig from './scripts/globals/appConfig';

render(html`
    <sosial-media
        .data=${menuData}
    </sosial-media>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import { ISosialMedia } from '../../interfaces/interfaces';
import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

import style from './sosial-media.scss';

@customElement('sosial-media')
class SosialMedia extends CommonElement {
    @property({ type: Array, attribute: true })
    data: Array<ISosialMedia>;

    static get styles() {
        return [...super.styles, style];
    }

    constructor() {
        super();
        this.data = AppConfig.APP_SOSIAL_MEDIA;
    }

    render() {
        return html`
            
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'sosial-media': SosialMedia;
    }
}