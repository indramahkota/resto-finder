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
        .navData=${data}
        .iconNavData=${data} >
    </app-bar>
`, document.body); */

import { html, nothing } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import Utils from '../../globals/appUtilities';
import AppConfig from '../../globals/appConfig';

@customElement('app-bar')
class AppBar extends CommonElement {
    @property({ type: String, attribute: true })
    title = AppConfig.APP_NAME;

    @property({ type: Array, attribute: true })
    navData = AppConfig.APP_NAVIGATION;

    @property({ type: Object, attribute: true })
    iconNavData = AppConfig.APP_ICON_NAVIGATION;

    @internalProperty()
    private _iconNavFocus = false;

    @internalProperty()
    private _darkMode = AppConfig.SUPPORT_DARK_MODE;

    @internalProperty()
    private _isLight = true;

    @internalProperty()
    private _isOpen = false;

    private header: HTMLElement | null = null;

    private current_scroll_position = 0;
    private last_known_scroll_position = 0;
    private ticking = false;

    private _onScrollHandler = () => {
        this.current_scroll_position = window.scrollY;

        window.setTimeout(() => {
            this.last_known_scroll_position = window.scrollY;
        }, 150);

        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.hideOrShowHeader();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    private _onIconNavClickHandler() {
        this.dataShouldUpdate(this.iconNavData.url);
        this._iconNavFocus = !this._iconNavFocus;
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
        const { hash } = path[0] as HTMLAnchorElement;
        this.dataShouldUpdate(hash);

        this._iconNavFocus = false;
        if (this._isOpen)
            this._onHamburgerClickHandler();
    }

    private _onSwitchChangeHandler(event: Event) {
        const path = event.composedPath();
        const input = path[0] as HTMLInputElement;

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

    connectedCallback() {
        super.connectedCallback();
        if (Utils.getLCS(AppConfig.LCS_THEME) === 'dark') {
            this._isLight = false;
        }
        if (Utils.getLCS(AppConfig.LCS_DRAWER) === 'open') {
            this._isOpen = true;
        }
        if (window.location.hash === this.iconNavData.url)
            this._iconNavFocus = true;
        if (window.location.hash !== '')
            this.dataShouldUpdate(window.location.hash);

        window.addEventListener('scroll', this._onScrollHandler, false);
    }

    hideOrShowHeader() {
        if(this.current_scroll_position < 120) {
            this.header?.classList.remove('hide');
            return;
        }
        const hideHeader = this.current_scroll_position > this.last_known_scroll_position;
        if(hideHeader) {
            this._isOpen = false;
            this.header?.classList.add('hide');
        } else {
            this.header?.classList.remove('hide');
        }
    }

    disconnectedCallback() {
        window.removeEventListener('scroll', this._onScrollHandler, false);
        super.disconnectedCallback();
    }

    firstUpdated() {
        this.header = document.getElementById("rstf-header");
    }

    render() {
        return html`
            <header id="rstf-header" class="header">
                <a href="/" class="header__logo">${this.title}</a>

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
                            <a href="${this.iconNavData.url}" class="anchor__icon__container ${this._iconNavFocus ? 'active' : ''}" @click="${this._onIconNavClickHandler}">
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