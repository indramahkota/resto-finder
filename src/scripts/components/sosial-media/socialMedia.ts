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

render(html`
    <sosial-media .data=${{object data}}></sosial-media>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

@customElement('social-media')
class SocialMedia extends CommonElement {
    @property({ type: Array, attribute: true })
    data = AppConfig.APP_SOCIAL_MEDIA;

    render() {
        return html`
            <div class="social__media">
                <ul>
                    ${
                        this.data.map((sm) =>
                            html`
                                <li>
                                    <a style="background-color: ${sm.color}" aria-label="This is the ${sm.isEmail ? "Email" : "Social media page" } who created this website." href="${sm.url}" target="_blank" rel="noopener noreferrer">
                                        <i class="${sm.icon}"></i>
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