/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:36:26
 * @modify date 2020-08-30 13:13:12
 * @desc [description]
 */

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
            _toggleDark: {type: Boolean}
        };
    }

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();
        this._navData = AppConfig.APP_NAV_DATA;
        this._title = AppConfig.APP_NAME;
        this._pageActive = window.location.hash;

        this._isDrawerOpen = false;
        if(window.localStorage.getItem(AppConfig.LOCAL_STORAGE_NAME_FOR_DRAWER) === 'open') {
            this._isDrawerOpen = true;
        }

        this._isLightTheme = true;
        if(window.localStorage.getItem(AppConfig.LOCAL_STORAGE_NAME_FOR_THEME) === 'dark') {
            this._isLightTheme = false;
        }
    }

    onHamburgerClick() {
        this._isDrawerOpen = !this._isDrawerOpen;
        if(this._isDrawerOpen) {
            window.localStorage.setItem(AppConfig.LOCAL_STORAGE_NAME_FOR_DRAWER, "open");
        } else {
            window.localStorage.setItem(AppConfig.LOCAL_STORAGE_NAME_FOR_DRAWER, "close");
        }
    }

    onNavigateClick(event) {
        this._pageActive =  event.path[0].hash;
        if(this._isDrawerOpen)
            this.onHamburgerClick();
    }

    onSwitchChange(event) {
        if(event.currentTarget.checked) {
            window.document.body.classList.remove('dark');
            window.localStorage.setItem(AppConfig.LOCAL_STORAGE_NAME_FOR_THEME, "light");
        } else {
            window.document.body.classList.add('dark');
            window.localStorage.setItem(AppConfig.LOCAL_STORAGE_NAME_FOR_THEME, "dark");
        }
    }

    render() {
        const { _title, _navData, _isLightTheme, _isDrawerOpen } = this;
        return html`
            <header class="header">
                <a href="/" class="header__logo">${_title}</a>

                <label class="switch">                    
                    <input @change="${this.onSwitchChange}" type="checkbox" ?checked=${_isLightTheme}>
                    <span class="slider round"></span>
                    <span>Gelap</span>
                </label>

                <button id="header-hamburger" class="hamburger__btn ${_isDrawerOpen ? 'change' : ''}" @click="${this.onHamburgerClick}">
                    <span class="hamburger__icon"></span>
                </button>

                <nav class="navigation__drawer ${_isDrawerOpen ? 'change' : ''}">
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