
/**
 * @author Indra Mahkota
 * @email indramahkota1@gmail.com
 * @create date 2020-09-01 20:10:05
 * @modify date 2020-09-02 18:36:34
 * @desc [description]
 */

/*
// Penggunaan
import {html, render} from 'lit-html';
import AppConfig from './scripts/globals/appConfig';

render(html`
    <my-profile
        title='DEVELOPER'
        name='Indra Mahkota'
        location='Pontianak, Indonesia'
        hirable='Yes'
        image='image url'
    </my-profile>
`, document.body); */

import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import { Icon } from '@fortawesome/fontawesome-svg-core';
import CommonElement from '../_base_/commonElement';
import "../sosial-media/socialMedia";

import style from './my-profile.scss';
import responsive from './my-profile-responsive.scss';
import Utils from '../../globals/appUtilities';
import AppConfig from '../../globals/appConfig';
import AppIcons from '../../globals/appIcons';

@customElement('my-profile')
class MyProfile extends CommonElement {
    @property({ type: String, attribute: true })
    title: string;

    @property({ type: String, attribute: true })
    name: string;

    @property({ type: String, attribute: true })
    location: string;

    @property({ type: String, attribute: true })
    hirable: string;

    @property({ type: String, attribute: true })
    image: string;

    private _mapMarkerIcon: Icon;

    static get styles() {
        return [...super.styles, style, responsive];
    }

    constructor() {
        super();
        this.title = 'DEVELOPER';
        this.name = AppConfig.DEV_NAME;
        this.location = AppConfig.DEV_LOCATION;
        this.hirable = AppConfig.DEV_HIRABLE;
        this.image = AppConfig.DEV_IMAGE;
        this._mapMarkerIcon = AppIcons.MARKER;
    }

    render() {
        return html`
            <div class="profile__container">
                <h1 tabindex="0" class="profile__title">${this.title}</h1>
                <div class="profile__content">
                    <div class="profile__desc_container">
                        <h2 tabindex="0" class="profile__name">${this.name}</h2>
                        <div class="profile__location">
                            ${Utils.genSVG(this._mapMarkerIcon)}
                            <span tabindex="0">${this.location}</span>
                        </div>
                        <div class="profile__hirable">
                            <p tabindex="0">Open for opportunities: ${this.hirable}</p>
                        </div>
                        <div class="profile__mediasocial">
                            <social-media></social-media>
                        </div>
                    </div>
                    <div class="profile__image_container">
                        <img class="profile__image" src='${this.image}' alt='Indra Mahkota, Developer who build this website'/>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'my-profile': MyProfile;
    }
}