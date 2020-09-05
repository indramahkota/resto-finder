
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
import "../resto-container/restoContainer";
import CommonElement from '../_base_/commonElement';

@customElement('app-content')
export default class AppContent extends CommonElement {
    private _greetingElement: HTMLElement | null | undefined;
    get greetingElement() {
        return this._greetingElement;
    }

    private _findElement: HTMLElement | null | undefined;
    get findElement() {
        return this._findElement;
    }

    render() {
        return html`
            <section id="greeting">
                <hero-element></hero-element>
            </section>
            <section id="find">
                <resto-container></resto-container>
            </section>
        `;
    }

    firstUpdated() {
        this._greetingElement = this.shadowRoot?.getElementById('greeting');
        this._findElement = this.shadowRoot?.getElementById('find');
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'app-content': AppContent;
    }
}