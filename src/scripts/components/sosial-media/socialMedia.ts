import { html } from 'lit-html';
import { customElement, property } from 'lit-element';

import CommonElement from '../_base_/commonElement';
import AppConfig from '../../globals/appConfig';

@customElement('social-media')
class SocialMedia extends CommonElement {
    @property({ type: Array, attribute: true })
    data = AppConfig.APP_SOCIAL_MEDIA;

    render() {
        return html`
            <div class="social__media">
                <ul>
                    ${
                        this.data.map((sm) =>
                            html`
                                <li>
                                    <a style="background-color: ${sm.color}" aria-label="This is the ${sm.isEmail ? "Email" : "Social media page" } who created this website." href="${sm.url}" target="_blank" rel="noopener noreferrer">
                                        <i class="${sm.icon}"></i>
                                    </a>
                                </li>
                            `
                        )
                    }
                </ul>
            </div>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'social-media': SocialMedia;
    }
}