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

import { html, TemplateResult } from 'lit-html';
import { customElement, property, internalProperty } from 'lit-element';

import "../resto-card/restoCard";
import "../hero-element/heroElement";
import "../restocard-shimmer/restoCardShimmer";

import AppConfig from '../../globals/appConfig';
import CommonElement from '../_base_/commonElement';
import RemoteDataSource from '../../data/sources/remote/remoteDataSource';
import { IRestaurants } from '../../interfaces/interfaces';
// import LocalDataSource from '../../data/sources/local/localDataSource';

@customElement('resto-container')
export default class RestoContainer extends CommonElement {
    @property({ type: String, attribute: true })
    title = 'RESTAURANTS';

    @property({ type: String, attribute: true })
    url: string = AppConfig.JSON_RESTO_DATA_URL;

    @internalProperty()
    private _dataJson: IRestaurants | null = null;
    
    connectedCallback(): void {
        super.connectedCallback();
        /* LocalDataSource.getJsonData<IRestaurants>(this.url)
            .then(re => this._dataJson = re)
            .catch(er => console.log(er)); */

        RemoteDataSource.getAllRestaurant<IRestaurants>()
            .then(re => this._dataJson = re)
            .catch(er => console.log(er));
    }

    //<resto-card .data=${res}></resto-card>
    //

    /* ${
                        this._dataJson?.restaurants.map(res => html`
                            <resto-card .data=${res}></resto-card>
                        `)
                    } */
    render(): TemplateResult {
        return html`
            <div class="resto__container">
                <h1 tabindex="0" class="resto__title">${this.title}</h1>
                <div class="resto__items">
                    ${
                        this._dataJson !== null ?
                            this._dataJson.restaurants.map(res => html`
                                <resto-card .data=${res}></resto-card>
                            `) : html`
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                                <restocard-shimmer></restocard-shimmer>
                            `
                    }
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'resto-container': RestoContainer;
    }
}