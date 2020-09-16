import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import CommonElement from '../_base_/commonElement';

@customElement('search-bar')
export default class SearchBar extends CommonElement {
    private searchBar: HTMLElement | null = null;

    private _currScrollPos = 0;
    private _ticking = false;

    private _onScrollHandler = () => {
        this._currScrollPos = window.scrollY;

        if (!this._ticking) {
            window.requestAnimationFrame(() => {
                this.hideOrShowsearchBar();
                this._ticking = false;
            });
            this._ticking = true;
        }
    }

    hideOrShowsearchBar(): void {
        if(this._currScrollPos < ((3/4) * window.screen.height)) {
            this.searchBar?.classList.add('hide');
            return;
        } else {
            this.searchBar?.classList.remove('hide');
        }
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('scroll', this._onScrollHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('scroll', this._onScrollHandler, false);
        super.disconnectedCallback();
    }

    firstUpdated(): void {
        this.searchBar = document.getElementById("search-bar");
    }

    render(): TemplateResult {
        return html`
            <div id="search-bar" class="search__floater hide">
                <div class="search__anchor">
                    <form id="search-form" action="get">
                        <input aria-label="Search to Find Resto" type="text" class="search__bar" placeholder="Find Resto">
                        <input class="search__submit" type="submit">
                        <div class="search__toggler"></div>
                    </form>
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'search-bar': SearchBar;
    }
}