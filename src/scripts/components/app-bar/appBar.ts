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
        title=${menuData[1].name}
        .data=${menuData}
        active=${menuData[1].url}>
    </app-bar>
`, document.body); */

import { html, nothing } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import { INavigation } from '../../interfaces/interfaces';
import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

import style from './app-bar.scss';
import responsive from './app-bar-responsive.scss';

@customElement('app-bar')
class AppBar extends CommonElement {
    @property({ type: String, attribute: true })
    title: string;

    @property({ type: Array, attribute: true })
    data: Array<INavigation>;

    @property({ type: String, attribute: true })
    active: string;
    
    @internalProperty()
    protected _darkMode: boolean;

    @internalProperty()
    protected _isLight = true;

    @internalProperty()
    protected _isOpen = false;

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();

        this.title = AppConfig.APP_NAME;
        this.data = AppConfig.APP_NAV_DATA;
        this.active = window.location.hash;
        
        this._darkMode = AppConfig.SUPPORT_DARK_MODE;
        if(window.localStorage.getItem(AppConfig.LCS_DRAWER) === 'open') {
            this._isOpen = true;
        }
        if(window.localStorage.getItem(AppConfig.LCS_THEME) === 'dark') {
            this._isLight = false;
        }
    }

    protected _onHamburgerClick() {
        this._isOpen = !this._isOpen;
        if(this._isOpen) {
            window.localStorage.setItem(AppConfig.LCS_DRAWER, "open");
        } else {
            window.localStorage.setItem(AppConfig.LCS_DRAWER, "close");
        }
    }

    protected _onNavigateClick(event: Event) {
        const path = event.composedPath();
        this.active = (path[0] as HTMLAnchorElement).hash;
        if(this._isOpen)
            this._onHamburgerClick();
    }

    protected _onSwitchChange(event: Event) {
        const path = event.composedPath();
        if((path[0] as HTMLInputElement).checked) {
            window.document.body.classList.remove('dark');
            window.localStorage.setItem(AppConfig.LCS_THEME, "light");
        } else {
            window.document.body.classList.add('dark');
            window.localStorage.setItem(AppConfig.LCS_THEME, "dark");
        }
    }

    render() {
        return html`
            <header class="header">
                <a href="/" class="header__logo">${this.title}</a>

                ${this._darkMode ? html`
                        <label class="toggle__switch">                    
                            <input @change="${this._onSwitchChange}" type="checkbox" ?checked=${this._isLight}>
                            <span class="slider round"></span>
                        </label>
                    ` : nothing
                }

                <button id="header-hamburger" class="hamburger__btn ${this._isOpen ? 'change' : ''}" @click="${this._onHamburgerClick}">
                    <span class="hamburger__icon"></span>
                </button>

                <nav class="navigation__drawer ${this._isOpen ? 'change' : ''}">
                    <ul>
                        ${
                            this.data.map((nav, i) =>
                                html`
                                    <li>
                                        <a href="${nav.url}" @click="${this._onNavigateClick}"
                                            class="${ (i === 0 && this.active === '') || this.active === nav.url ? 'active' : ''}">
                                            ${nav.name}
                                            <span class="chevron"></span>
                                        </a>
                                    </li>
                                `
                            )
                        }
                    </ul>
                </nav>
            </header>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      'app-bar': AppBar;
    }
}