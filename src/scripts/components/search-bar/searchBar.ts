import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import CommonElement from '../_base_/commonElement';

@customElement('search-bar')
export default class SearchBar extends CommonElement {

    render(): TemplateResult {
        return html`
            <div class="search__floater">
                <div class="search__anchor">
                    <form id="search-form" action="get">
                            <input type="text" class="search__bar" placeholder="Search Resto">
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