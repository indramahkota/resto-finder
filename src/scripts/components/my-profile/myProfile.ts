import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import "../sosial-media/socialMedia";

import AppConfig from '../../globals/appConfig';
import CommonElement from '../_base_/commonElement';

@customElement('my-profile')
class MyProfile extends CommonElement {
    @property({ type: String, attribute: true })
    title = 'PROFILE';

    @property({ type: Object, attribute: true })
    data = AppConfig.STATIC_USER;

    render() {
        return html`
            <div class="profile__container">
                <h1 tabindex="0" class="profile__title">${this.title}</h1>
                <div class="profile__content">
                    <div class="profile__desc_container">
                        <h2 tabindex="0" class="profile__name">${this.data.name}</h2>
                        <div class="profile__location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span tabindex="0">${this.data.location}</span>
                        </div>
                        <div class="profile__hirable">
                            <p tabindex="0">${this.data.status}</p>
                        </div>
                        <div class="profile__mediasocial">
                            <social-media></social-media>
                        </div>
                    </div>
                    <div class="profile__image_container">
                        <img class="profile__image" src='${this.data.image}' alt='Indra Mahkota, Developer who build this website'/>
                    </div>
                </div>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'my-profile': MyProfile;
    }
}