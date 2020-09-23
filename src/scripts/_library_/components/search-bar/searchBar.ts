import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import ScrollEffectElement from '../_base_/scrollEffectElement';

import './search-bar.scss';

@customElement('search-bar')
export default class SearchBar extends ScrollEffectElement {
    private _searchBar: HTMLElement | null = null;
    private _ticking = false;

    private _hideOrShowsearchBar(): void {
        if (this._currScrollPos < ((3 / 4) * window.screen.height)) {
            this._searchBar?.classList.add('hide');
            return;
        } else {
            this._searchBar?.classList.remove('hide');
        }
    }

    firstUpdated(): void {
        this._searchBar = document.getElementById('search-bar');
    }

    updated(changedProperties: Map<string | number | symbol, unknown>): void {
        changedProperties.forEach((_oldValue, propName) => {
            if(propName === '_currScrollPos' || propName === '_lastScrollPos') {
                if (!this._ticking) {
                    window.requestAnimationFrame(() => {
                        this._hideOrShowsearchBar();
                        this._ticking = false;
                    });
                    this._ticking = true;
                }
            }
        });
    }

    render(): TemplateResult {
        return html`
            <div id='search-bar' class='search__floater hide'>
                <div class='search__anchor'>
                    <form id='search-form' action='get'>
                        <input aria-label='Search to Find Resto' type='text' class='search__bar' placeholder='Find Resto'>
                        <input class='search__submit' type='submit'>
                        <div class='search__toggler'></div>
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