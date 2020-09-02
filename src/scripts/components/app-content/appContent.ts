
/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:36:00
 * @modify date 2020-09-02 15:51:57
 * @desc [description]
 */

import { html } from 'lit-html';
import { customElement } from 'lit-element';
import "../hero-element/heroElement";
import CommonElement from '../_base_/commonElement';

@customElement('app-content')
export default class AppContent extends CommonElement {

    constructor() {
        super();
    }

    render() {
        return html`
            <hero-element></hero-element>
        `;
    }

    /* //this will replace <noscript> tag if javascript allowed otherwise will show <noscript> element.
    renderDefault() {
        return html`
            <a class="skip-link" href="#content">Skip to Content</a>
            <!-- <app-bar></app-bar> -->
            
            <div id='content'>
                <hero-element></hero-element>
                <main>
                    <foot-bar></foot-bar>
                </main>
            </div>
        `;
    } */
}

declare global {
    interface HTMLElementTagNameMap {
      'app-content': AppContent;
    }
}