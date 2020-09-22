import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';

import ScrollEffectElement from '../_base_/scrollEffectElement';

import './go-top.scss';

@customElement('go-top')
export default class GoTop extends ScrollEffectElement {
    private _goTopButton: HTMLElement | null = null;
    private _ticking = false;

    private _hideOrShowsearchBar(): void {
        if (this._currScrollPos < ((3 / 4) * window.screen.height)) {
            this._goTopButton?.classList.add('hide');
            return;
        } else {
            const hideTopButton = this._currScrollPos - this._lastScrollPos;
            if (hideTopButton > 0) {
                this._goTopButton?.classList.add('hide');
            } else if (hideTopButton < -10) {
                this._goTopButton?.classList.remove('hide');
            }
        }
    }

    private _onButtonClickHandler(): void {
        document.body.scrollTo({ top: 0, behavior: 'smooth'});
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth'});
    }

    firstUpdated(): void {
        this._goTopButton = document.getElementById('top-button');
    }

    updated(): void {
        if (!this._ticking) {
            window.requestAnimationFrame(() => {
                this._hideOrShowsearchBar();
                this._ticking = false;
            });
            this._ticking = true;
        }
    }

    render(): TemplateResult {
        return html`
            <button id='top-button' class='gotop__button hide' aria-label='Go to top Button' title='Go to top' @click='${this._onButtonClickHandler}'><i class='fas fa-hand-point-up'></i></button>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'go-top': GoTop;
    }
}