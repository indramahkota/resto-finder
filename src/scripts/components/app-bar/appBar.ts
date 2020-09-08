/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-08-26 21:36:26
 * @modify date 2020-08-30 13:13:12
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';
import { INavigation } from './scripts/interfaces/interfaces';
import AppConfig from './scripts/globals/appConfig';

const menuData: INavigation[] = AppConfig.APP_NAV_DATA;
render(html`
    <app-bar
        .navLogo=${data}
        .navData=${data}
        .iconNavData=${data} >
    </app-bar>
`, document.body); */

import { html, nothing } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import Utils from '../../globals/appUtilities';
import AppConfig from '../../globals/appConfig';
import { IIconNavigation, INavigation } from '../../interfaces/interfaces';

@customElement('app-bar')
class AppBar extends CommonElement {
    @property({ type: Object, attribute: true })
    navLogo = AppConfig.APP_LOGO_NAVIGATION;

    @property({ type: Array, attribute: true })
    navData = AppConfig.APP_NAVIGATION;

    @property({ type: Object, attribute: true })
    iconNavData = AppConfig.APP_ICON_NAVIGATION;

    @internalProperty()
    private _icoNavFocus = false;

    @internalProperty()
    private _darkMode = AppConfig.SUPPORT_DARK_MODE;

    @internalProperty()
    private _isLight = true;

    @internalProperty()
    private _isOpen = false;

    private _onLogoClickHandler() {
        this._icoNavFocus = false;
        this.dataShouldUpdate(this.navLogo.url);
    }

    private _onIconNavClickHandler() {
        this.dataShouldUpdate(this.iconNavData.url);
        this._icoNavFocus = !this._icoNavFocus;
        if (this._isOpen)
            this._onHamburgerClickHandler();
    }

    private _onHamburgerClickHandler() {
        this._isOpen = !this._isOpen;
        if (this._isOpen) {
            Utils.setLCS(AppConfig.LCS_DRAWER, "open");
        } else {
            Utils.setLCS(AppConfig.LCS_DRAWER, "close");
        }
    }

    private _onNavigationClickHandler(event: Event) {
        const path = event.composedPath();
        const hash = (path[0] as HTMLAnchorElement).hash
        this.dataShouldUpdate(hash);

        this._icoNavFocus = false;
        if (this._isOpen)
            this._onHamburgerClickHandler();
    }

    private _onSwitchChangeHandler(event: Event) {
        const path = event.composedPath();
        const input = (path[0] as HTMLInputElement);

        if (input.checked) {
            window.document.body.classList.remove('dark');
            Utils.setLCS(AppConfig.LCS_THEME, "light");
        } else {
            window.document.body.classList.add('dark');
            Utils.setLCS(AppConfig.LCS_THEME, "dark");
        }
        input.blur();
    }

    dataShouldUpdate(hash: string) {
        this.navData = this.navData.map(nav => {
            if (nav.url !== hash) {
                nav['isActive'] = false;
                return nav;
            }
            else {
                nav['isActive'] = true;
                return nav;
            }
        })
    }

    setNavLogo(data: INavigation) {
        const oldVal = this.navLogo;
        this.navLogo = data;
        this.requestUpdate('navLogo', oldVal);
    }

    setNavData(data: INavigation[]) {
        const oldVal = this.navData;
        this.navData = data;
        this.requestUpdate('navData', oldVal);
    }

    setIconNavData(data: IIconNavigation) {
        const oldVal = this.iconNavData;
        this.iconNavData = data;
        this.requestUpdate('iconNavData', oldVal);
    }

    connectedCallback() {
        super.connectedCallback();
        if (Utils.getLCS(AppConfig.LCS_THEME) === 'dark') {
            this._isLight = false;
        }
        if (Utils.getLCS(AppConfig.LCS_DRAWER) === 'open') {
            this._isOpen = true;
        }
        if (window.location.hash === this.iconNavData.url)
            this._icoNavFocus = true;
        if (window.location.hash !== '')
            this.dataShouldUpdate(window.location.hash);
    }

    render() {
        return html`
            <header class="header">
                <a href="${this.navLogo.url}" @click="${this._onLogoClickHandler}" class="header__logo">${this.navLogo.name}</a>

                ${
                    this._darkMode ? html`
                        <div class="toggle__container">
                            <label class="toggle__label">
                                <input aria-label="This input for Toggle Dark or Light Mode" @change="${this._onSwitchChangeHandler}" type="checkbox" ?checked=${this._isLight}>
                                <span class="slider round"></span>
                                <div class="toggle__icon">
                                    <i class="fas fa-sun"></i>
                                    <i class="fas fa-moon"></i>
                                </div>
                            </label>
                        </div>
                    ` : nothing
                }

                <button aria-label="Toggle Menu Button" class="header__button ${this._isOpen ? 'change' : ''}" @click="${this._onHamburgerClickHandler}">
                    <span class="humburger"></span>
                </button>

                <nav class="header__drawer ${this._isOpen ? 'change' : ''}">
                    <ul>
                        ${this.navData.map(nav =>
                                html`
                                    <li>
                                        <a href="${nav.url}" @click="${this._onNavigationClickHandler}"
                                            class="${ nav.isActive ? 'active' : ''}">
                                            ${nav.name}
                                            <span class="chevron"></span>
                                        </a>
                                    </li>
                                `
                            )
                        }

                        <li>
                            <a href="${this.iconNavData.url}" class="anchor__icon__container ${this._icoNavFocus ? 'active' : ''}" @click="${this._onIconNavClickHandler}">
                                <img class="anchor__icon" src='${this.iconNavData.imageUrl}' alt='${this.iconNavData.imageAlt}'/>
                                <p class="anchor__name">${this.iconNavData.name}</p>
                                <span class="chevron"></span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'app-bar': AppBar;
    }
}