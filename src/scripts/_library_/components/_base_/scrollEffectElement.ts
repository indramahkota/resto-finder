import { internalProperty } from 'lit-element';
import CommonElement from './commonElement';

export default class ScrollEffectElement extends CommonElement {
    @internalProperty()
    protected _currScrollPos = 0;

    @internalProperty()
    protected _lastScrollPos = 0;

    protected _onScrollHandler = (): void => {
        this._currScrollPos = window.scrollY;
        window.setTimeout(() => {
            this._lastScrollPos = window.scrollY;
        }, 50);
    }

    async performUpdate(): Promise<void> {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        super.performUpdate();
    }

    connectedCallback(): void {
        super.connectedCallback();
        window.addEventListener('scroll', this._onScrollHandler, false);
    }

    disconnectedCallback(): void {
        window.removeEventListener('scroll', this._onScrollHandler, false);
        super.disconnectedCallback();
    }
}