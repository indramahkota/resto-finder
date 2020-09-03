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
    <sosial-media .data=${menuData}></sosial-media>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import { ISocialMedia } from '../../interfaces/interfaces';
import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

import style from './social-media.scss';
import Utils from '../../globals/appUtilities';

@customElement('social-media')
class SocialMedia extends CommonElement {
    @property({ type: Array, attribute: true })
    data: Array<ISocialMedia>;

    static get styles() {
        return [...super.styles, style];
    }

    constructor() {
        super();
        this.data = AppConfig.APP_SOCIAL_MEDIA;
    }

    render() {
        return html`
            <div class="social__media">
                <ul>
                    ${
                        this.data.map((sm) =>
                            html`
                                <li>
                                    <a aria-label="This is the ${sm.isEmail ? "Email" : "Social media page" } who created this website." href="${sm.url}" class="${sm.name}" target="_blank" rel="noopener noreferrer">
                                        ${Utils.genSVG(sm.icon)}
                                    </a>
                                </li>
                            `
                        )
                    }
                </ul>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'social-media': SocialMedia;
    }
}