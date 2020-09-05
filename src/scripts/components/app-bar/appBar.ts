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
        .data=${menuData} >
    </app-bar>
`, document.body); */

import { html, nothing } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import { INavigation } from '../../interfaces/interfaces';
import CommonElement from '../_base_/commonElement';
import Utils from '../../globals/appUtilities';
import AppConfig from '../../globals/appConfig';

import style from './app-bar.scss';
import responsive from './app-bar-responsive.scss';
import EventType from '../../globals/eventType';
import AppIcons from '../../globals/appIcons';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@customElement('app-bar')
class AppBar extends CommonElement {
    @property({ type: String, attribute: true })
    title: string;

    @property({ type: Array, attribute: true })
    data: Array<INavigation>;

    @internalProperty()
    protected _darkMode: boolean;

    @internalProperty()
    protected _isLight = true;

    @internalProperty()
    protected _isOpen = false;

    private _moonIcon: Icon;
    private _sunIcon: Icon;

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();
        this.title = AppConfig.APP_NAME;
        this.data = AppConfig.APP_NAV_DATA;
        this._darkMode = AppConfig.SUPPORT_DARK_MODE;
        this._moonIcon = AppIcons.MOON;
        this._sunIcon = AppIcons.SUN;
    }

    protected _onLogoClickHandler() {
        const logoClicked = new CustomEvent(EventType.LOGO_CLICKED, {
            detail: {
                message: 'Logo Clicked',
                hash: '#greeting'
            },
            bubbles: true, 
            composed: true
        });
        this.dispatchEvent(logoClicked);
    }

    protected _onHamburgerClickHandler() {
        this._isOpen = !this._isOpen;
        if (this._isOpen) {
            Utils.setLCS(AppConfig.LCS_DRAWER, "open");
        } else {
            Utils.setLCS(AppConfig.LCS_DRAWER, "close");
        }
    }

    protected _onNavigationClickHandler(event: Event) {
        const path = event.composedPath();
        const hash = (path[0] as HTMLAnchorElement).hash
        this.dataShouldUpdate(hash);

        const navClicked = new CustomEvent(EventType.NAVIGATION_CLICKED, {
            detail: {
                message: 'Navigation Clicked',
                hash: hash
            },
            bubbles: true, 
            composed: true
        });
        this.dispatchEvent(navClicked);

        if (this._isOpen)
            this._onHamburgerClickHandler();
    }

    protected _onSwitchChangeHandler(event: Event) {
        const path = event.composedPath();
        if ((path[0] as HTMLInputElement).checked) {
            window.document.body.classList.remove('dark');
            Utils.setLCS(AppConfig.LCS_THEME, "light");
        } else {
            window.document.body.classList.add('dark');
            Utils.setLCS(AppConfig.LCS_THEME, "dark");
        }
    }

    dataShouldUpdate(hash: string) {
        this.data = this.data.map(nav => {
            if(nav.url !== hash) {
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
        if(window.location.hash !== '')
            this.dataShouldUpdate(window.location.hash);
    }

    render() {
        return html`
            <header class="header">
                <a href="#greeting" @click="${this._onLogoClickHandler}" class="header__logo">${this.title}</a>

                ${
                    this._darkMode ? html`
                        <div class="toggle__container">
                            <label class="toggle__switch">
                                <input aria-label="This input for Toggle Dark or Light Mode" @change="${this._onSwitchChangeHandler}" type="checkbox" ?checked=${this._isLight}>
                                <span class="slider round"></span>
                                ${Utils.genSVG(this._sunIcon)}
                                ${Utils.genSVG(this._moonIcon)}
                            </label>
                        </div>
                    ` : nothing
                }

                <button aria-label="Toggle Menu Button" class="hamburger__btn ${this._isOpen ? 'change' : ''}" @click="${this._onHamburgerClickHandler}">
                    <span class="hamburger__icon"></span>
                </button>

                <nav class="navigation__drawer ${this._isOpen ? 'change' : ''}">
                    <ul>
                        ${this.data.map(nav =>
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