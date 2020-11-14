import { html, nothing, TemplateResult } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import Utils from '../../../globals/appUtilities';
import AppConfig from '../../../globals/appConfig';
import { INavigation } from '../../../interfaces/interfaces';
import CommonElement from '../_base_/commonElement';
import IScrollEffect from '../_base_/interfaces/IScrollEffect';

// import './app-bar.scss';

@customElement('app-bar')
export default class AppBar extends CommonElement implements IScrollEffect {
    _ticking = false;
    _currentScrollPosition = 0;
    _lastScrollPosition = 0;
    _onScrollHandler = (): void => {
        this._currentScrollPosition = window.scrollY;
        window.setTimeout(() => {
            this._lastScrollPosition = window.scrollY;
        }, 50);
        if (!this._ticking) {
            window.requestAnimationFrame(() => {
                this._hideOrShowHeader();
                this._ticking = false;
            });
            this._ticking = true;
        }
    };

    @property({ type: String })
    title = AppConfig.APP_NAME;

    @property({ type: Array })
    navData = AppConfig.APP_NAVIGATION;

    @property({ type: Object })
    iconNavData = AppConfig.APP_ICON_NAVIGATION;

    @internalProperty()
    _iconNavFocus = false;

    @internalProperty()
    _isDrawerOpen = false;

    @internalProperty()
    _isThemeLight = true;

    @internalProperty()
    _showHeader = true;

    @internalProperty()
    _darkMode = AppConfig.SUPPORT_DARK_MODE;

    _onResizeHandler = (): void => {
        this._hideOrShowHeader();
        this._isDrawerOpen = false;
        Utils.setLCS(AppConfig.LCS_DRAWER, 'close');
    }

    _hideOrShowHeader(): void {
        if (this._currentScrollPosition < 120) {
            this.showHeader();
            return;
        }
        const hideHeader = this._currentScrollPosition - this._lastScrollPosition;
        if (hideHeader > 0) {
            this._isDrawerOpen = false;
            Utils.setLCS(AppConfig.LCS_DRAWER, 'close');
            this.hideHeader();
        } else if (hideHeader < -10) {
            this.showHeader();
        }
    }

    _onIconNavClickHandler(): void {
        this.dataShouldUpdate(this.iconNavData.url);
        this._iconNavFocus = true;
        if (this._isDrawerOpen) {
            this._onHamburgerClickHandler();
        }
    }

    _onHamburgerClickHandler(): void {
        this._isDrawerOpen = !this._isDrawerOpen;
        if (this._isDrawerOpen) {
            Utils.setLCS(AppConfig.LCS_DRAWER, 'open');
        } else {
            Utils.setLCS(AppConfig.LCS_DRAWER, 'close');
        }
    }

    _onNavigationClickHandler(event: Event): void {
        const path = event.composedPath();
        const { hash } = path[0] as HTMLAnchorElement;
        this.dataShouldUpdate(hash);

        this._iconNavFocus = false;
        if (this._isDrawerOpen) {
            this._onHamburgerClickHandler();
        }
    }

    _onSwitchChangeHandler(event: Event): void {
        const path = event.composedPath();
        const input = path[0] as HTMLInputElement;
        if (input.checked) {
            window.document.body.classList.remove('dark');
            Utils.setLCS(AppConfig.LCS_THEME, 'light');
        } else {
            window.document.body.classList.add('dark');
            Utils.setLCS(AppConfig.LCS_THEME, 'dark');
        }
    }

    hideHeader(): void {
        this._showHeader = false;
    }

    showHeader(): void {
        this._showHeader = true;
    }

    dataShouldUpdate(hash: string): void {
        this.navData = this.navData.map(nav => {
            nav.isActive = nav.url === hash || false;
            return nav;
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
        if (Utils.getLCS(AppConfig.LCS_THEME) === 'dark')
            this._isThemeLight = false;
        if (Utils.getLCS(AppConfig.LCS_DRAWER) === 'open')
            this._isDrawerOpen = true;
        if (window.location.hash === this.iconNavData.url)
            this._iconNavFocus = true;
        if (window.location.hash !== '')
            this.dataShouldUpdate(window.location.hash);

        window.addEventListener('resize', this._onResizeHandler, false);
        window.addEventListener('scroll', this._onScrollHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('resize', this._onResizeHandler, false);
        window.removeEventListener('scroll', this._onScrollHandler, false);
        super.disconnectedCallback();
    }

    renderToggle(): TemplateResult {
        return html`
            <label class='toggleLabel'>
                <input aria-label='This input for Toggle Dark or Light Mode' @change='${this._onSwitchChangeHandler}' type='checkbox' ?checked=${this._isThemeLight}>
                <span class='slider round'></span>
                <div class='toggleIcon'>
                    <i class='fas fa-sun'></i>
                    <i class='fas fa-moon'></i>
                </div>
            </label>
        `;
    }

    renderNavList(nav: INavigation): TemplateResult {
        return html`
            <li>
                <a href='${nav.url}' @click='${this._onNavigationClickHandler}'
                    class='${nav.isActive ? 'active' : ''}'>
                    ${nav.name}
                    <span class='chevron'></span>
                </a>
            </li>
        `;
    }

    render(): TemplateResult {
        return html`
            <div class=${this._showHeader ? 'headerContainer' : 'headerContainer hide'}>
                <header class='header'>
                    <a href='/' class='headerLogo'>${this.title}</a>

                    ${this._darkMode ? this.renderToggle() : nothing}

                    <button aria-label='Toggle Menu Button' class='headerButton ${this._isDrawerOpen ? 'change' : ''}' @click='${this._onHamburgerClickHandler}'>
                        <span class='humburger'></span>
                    </button>

                    <nav class='headerNavigation ${this._isDrawerOpen ? 'change' : ''}'>
                        <ul>
                            ${this.navData.map(nav => this.renderNavList(nav))}

                            <li>
                                <a href='${this.iconNavData.url}' class='anchorIconContainer ${this._iconNavFocus ? 'active' : ''}' @click='${this._onIconNavClickHandler}'>
                                    <img class='anchorIcon' src='${this.iconNavData.imageUrl}' alt='${this.iconNavData.imageAlt}'/>
                                    <p class='anchorName'>${this.iconNavData.name}</p>
                                    <span class='chevron'></span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'app-bar': AppBar;
    }
}