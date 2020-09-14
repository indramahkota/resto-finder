import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import Utils from '../../globals/appUtilities';
import AppConfig from '../../globals/appConfig';

@customElement('app-bar')
export default class AppBar extends CommonElement {
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

    private _header: HTMLElement | null = null;

    private _currScrollPos = 0;
    private _lastScrollPos = 0;
    private _ticking = false;

    private _onScrollHandler = () => {
        this._currScrollPos = window.scrollY;

        window.setTimeout(() => {
            this._lastScrollPos = window.scrollY;
        }, 50);

        if (!this._ticking) {
            window.requestAnimationFrame(() => {
                this.hideOrShowHeader();
                this._ticking = false;
            });
            this._ticking = true;
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

    dataShouldUpdate(hash: string): void {
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

    connectedCallback(): void {
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

    hideOrShowHeader(): void {
        if(this._currScrollPos < 120) {
            this._header?.classList.remove('hide');
            return;
        }

        const hideHeader = this._currScrollPos - this._lastScrollPos;
        if(hideHeader > 0) {
            this._isOpen = false;
            this._header?.classList.add('hide');
        } else if(hideHeader < -10){
            this._header?.classList.remove('hide');
        }
    }

    disconnectedCallback(): void {
        window.removeEventListener('scroll', this._onScrollHandler, false);
        super.disconnectedCallback();
    }

    firstUpdated(): void {
        this._header = document.getElementById("rstf-header");
    }

    render(): TemplateResult {
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