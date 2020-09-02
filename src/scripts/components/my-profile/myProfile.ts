
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
    <sosial-media
        .data=${menuData}
    </sosial-media>
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
            <social-media></social-media>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-profile': MyProfile;
    }
}