import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';
import CommonElement from '../_base_/commonElement';
import IScrollEffect from '../_base_/interfaces/IScrollEffect';

// import './search-bar.scss';

@customElement('search-bar')
export default class SearchBar extends CommonElement implements IScrollEffect {
    _ticking = false;
    _currentScrollPosition = 0;
    _lastScrollPosition = 0;
    _onScrollHandler = () => {
        this._currentScrollPosition = window.scrollY;
        window.setTimeout(() => {
            this._lastScrollPosition = window.scrollY;
        }, 50);
        if (!this._ticking) {
            window.requestAnimationFrame(() => {
                this._hideOrShowsearchBar();
                this._ticking = false;
            });
            this._ticking = true;
        }
    };

    _hideOrShowsearchBar(): void {
        if (this._currentScrollPosition < ((3 / 4) * window.screen.height)) {
            document.getElementById('search-bar')?.classList.add('hide');
            return;
        } else {
            document.getElementById('search-bar')?.classList.remove('hide');
        }
    }

    render(): TemplateResult {
        return html`
            <div id='search-bar' class='searchFloater hide'>
                <div class='searchAnchor'>
                    <form id='search-form' action='get'>
                        <input aria-label='Search to Find Resto' type='text' class='searchBar' placeholder='Find Resto'>
                        <input class='searchSubmit' type='submit'>
                        <div class='searchToggler'></div>
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