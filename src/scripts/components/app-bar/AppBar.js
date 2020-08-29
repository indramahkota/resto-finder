import { html } from 'lit-html';
import CommonElement from '../_base_/CommonElement.js';
import style from './AppBar.scss';
import responsive from './AppBarResponsive.scss';
import AppConfig from '../../globals/app-config.js';
class AppBar extends CommonElement {
    static get properties() {
        return {
            _title: { type: String },
            _isDrawerOpen: { type: Boolean },
            _pageActive: { type: String },
            _navData: { type: Array },
        };
    }

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();
        this._navData = AppConfig.APP_NAV_DATA;
        this._title = AppConfig.APP_NAME;
        this._isDrawerOpen = false;
        this._pageActive = window.location.hash;
    }

    onHamburgerClick() {
        this._isDrawerOpen = !this._isDrawerOpen;
    }

    onNavigateClick(event) {
        this._pageActive =  event.path[0].hash;
    }

    render() {
        const { _title, _navData } = this;
        //fungsi render dipanggil setiap ada perubahan properties
        return html`
            <header class="header">
                <a href="/" class="header__logo">${_title}</a>

                <button id="header-hamburger" class="hamburger__btn ${this._isDrawerOpen ? 'change' : ''}" @click="${this.onHamburgerClick}">
                    <span class="hamburger__icon"></span>
                </button>

                <nav class="navigation__drawer ${this._isDrawerOpen ? 'change' : ''}">
                    <ul>
                        ${
                            _navData.map((nav, i) =>
                                html`
                                <li>
                                    <a href="${nav.url}" @click="${this.onNavigateClick}"
                                        class="${ (i === 0 && this._pageActive === '') || this._pageActive === nav.url ? 'active' : ''}">
                                        ${nav.name}
                                        <span class="chevron"></span>
                                    </a>
                                </li>`
                            )
                        }
                    </ul>
                </nav>
            </header>
        `;
    }
}

customElements.define('app-bar', AppBar);