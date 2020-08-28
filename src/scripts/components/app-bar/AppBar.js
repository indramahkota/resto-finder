import { html } from 'lit-html';
import CommonElement from '../_base_/CommonElement.js';
import style from './AppBar.scss';
import responsive from './AppBarResponsive.scss';
import AppConfig from '../../globals/app-config.js';

class AppBar extends CommonElement {
    static get properties() {
        return {
            _title: { type: String },
            _isDrawerOpen: { type: Boolean }
        };
    }

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();
        this._title = AppConfig.APP_NAME;
        this._isDrawerOpen = false;
    }

    onHamburgerClick() {
        this._isDrawerOpen = !this._isDrawerOpen;
    }

    render() {
        const { _title } = this;
        return html`
            <header class="header">
                <a href="/" class="header__logo">
                    <span class="logo__name">${_title}</span>
                </a>

                <button id="header-hamburger" class="hamburger__btn ${this._isDrawerOpen ? 'change' : ''}" @click="${this.onHamburgerClick}">
                    <span class="hamburger__icon"></span>
                </button>

                <ul class="header__menu">
                    <li>
                        <a href="#find">Find Resto</a>
                    </li>
                    <li>
                        <a href="#suggestion">Our Suggestion</a>
                    </li>
                    <li>
                        <a href="#my">My Favorites</a>
                    </li>
                </ul>
            </header>
        `;
    }
}

customElements.define('app-bar', AppBar);