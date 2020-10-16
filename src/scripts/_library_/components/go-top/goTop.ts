import { html, TemplateResult } from 'lit-html';
import { customElement } from 'lit-element';
import CommonElement from '../_base_/commonElement';
import IScrollEffect from '../_base_/interfaces/IScrollEffect';

// import './go-top.scss';

@customElement('go-top')
export default class GoTop extends CommonElement implements IScrollEffect {
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
                this._hideOrShowGoTop();
                this._ticking = false;
            });
            this._ticking = true;
        }
    };

    _hideOrShowGoTop(): void {
        if (this._currentScrollPosition < ((3 / 4) * window.screen.height)) {
            document.getElementById('top-button')?.classList.remove('show');
            return;
        }
        const hideTopButton = this._currentScrollPosition - this._lastScrollPosition;
        if (hideTopButton > 0) {
            document.getElementById('top-button')?.classList.remove('show');
        } else if (hideTopButton < -10) {
            document.getElementById('top-button')?.classList.add('show');
        }
    }

    _onButtonClickHandler(): void {
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('scroll', this._onScrollHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('scroll', this._onScrollHandler, false);
        super.disconnectedCallback();
    }

    render(): TemplateResult {
        return html`
            <button id='top-button' class='goTopButton' aria-label='Go to top Button' title='Go to top' @click='${this._onButtonClickHandler}'><i class='fas fa-hand-point-up'></i></button>
        `;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare global {
    interface HTMLElementTagNameMap {
        'go-top': GoTop;
    }
}