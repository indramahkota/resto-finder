import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import CommonElement from '../_base_/commonElement';

@customElement('search-bar')
export default class SearchBar extends CommonElement {
    private searchBar: HTMLElement | null = null;

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
                this.hideOrShowsearchBar();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    hideOrShowsearchBar(): void {
        if(this.current_scroll_position < ((3/4) * window.screen.height)) {
            this.searchBar?.classList.add('hide');
            return;
        }

        const hidesearchBar = this.current_scroll_position > this.last_known_scroll_position;
        if(hidesearchBar) {
            this.searchBar?.classList.remove('hide');
        } else {
            this.searchBar?.querySelectorAll('input').forEach(elm => elm.blur());
            this.searchBar?.classList.add('hide');
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