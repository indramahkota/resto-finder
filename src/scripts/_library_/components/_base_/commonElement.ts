import { LitElement } from 'lit-element';

export default class CommonElement extends LitElement {
    createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    protected _dispatchData<T>(data: T, event: string): void {
        this.dispatchEvent(new CustomEvent(event, {
            detail: data,
            bubbles: true
        }));
    }
}