import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';
import mapboxgl from "mapbox-gl";

import CommonElement from '../_base_/commonElement';

@customElement('resto-map')
export default class RestoMap extends CommonElement {

    render(): TemplateResult {
        return html`
            <div id="rstfmap" style="width:90%;height:450px;margin:20px auto;border-radius:8px;"></div>
        `;
    }

    firstUpdated(): void {
        mapboxgl.accessToken = 'pk.eyJ1IjoiaW5kcmFtYWhrb3RhIiwiYSI6ImNqbmV0ZXY1MDEzaHQzcXBsZW9qeGlwOG0ifQ.PMT988D2Cjhph1mY9e92wQ';
        new mapboxgl.Map({
            container: 'rstfmap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.5, 40],
            zoom: 9
        });
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'resto-map': RestoMap;
    }
}