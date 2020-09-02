
/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-01 20:10:05
 * @modify date 2020-09-02 18:36:34
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';
import AppConfig from './scripts/globals/appConfig';

render(html`
    <my-profile
        .data=${menuData}
    </my-profile>
`, document.body); */

import { html } from 'lit-html';
import { customElement } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import "../sosial-media/socialMedia";

@customElement('my-profile')
class MyProfile extends CommonElement {

    static get styles() {
        return [...super.styles];
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="profile__container">
                <h1 class="profile__title">Developer</h1>
                <div class="profile__content">
                    <h2 class="profile__name">Indra Mahkota</h2>
                    <div class="profile__location">
                        <svg viewBox="0 0 12 16" version="1.1" width="20" height="18" aria-hidden="true"><path fillRule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                        <span>Pontianak, Indonesia</span>
                    </div>
                    <div class="profile__hirable">
                        Open for opportunities: Yes
                    </div>
                    <social-media></social-media>
                    <div class="image-content-profile">
                        <img class="profile__image" src='https://avatars2.githubusercontent.com/u/34052126?u=be2dbdd5d9df2a0b1d53848b878b4171f79f9c77&v=4' alt='Indra Mahkota'/>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-profile': MyProfile;
    }
}