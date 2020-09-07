/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-03 13:00:26
 * @modify date 2020-09-03 13:00:26
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';

render(html`
    <resto-container url=${url}></resto-container>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import "../resto-card/restoCard";
import "../hero-element/heroElement";

import AppConfig from '../../globals/appConfig';
import CommonElement from '../_base_/commonElement';
import { IRestaurants } from '../../interfaces/interfaces';
import LocalDataSource from '../../data/sources/local/localDataSource';

import style from './resto-container.scss';
import responsive from './resto-container-responsive.scss';

@customElement('resto-container')
export default class RestoContainer extends CommonElement {
    @property({ type: String, attribute: true })
    url: string = AppConfig.JSON_RESTO_DATA_URL;

    @internalProperty()
    protected _dataJson: IRestaurants | null = null;

    static get styles() {
        return [...super.styles, style, responsive];
    }

    connectedCallback() {
        super.connectedCallback();
        LocalDataSource.getJsonData<IRestaurants>(this.url)
            .then(re => this._dataJson = re)
            .catch(er => console.log(er));
    }

    render() {
        return html`
            <div class="resto__container">
                <h1 tabindex="0" class="resto__title">RESTAURANTS</h1>
                <div class="resto__items">
                    ${this._dataJson?.restaurants.map(res => html`
                        <resto-card .data=${res}></resto-card>
                    `)}
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'resto-container': RestoContainer;
    }
}