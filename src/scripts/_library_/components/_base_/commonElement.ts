import { LitElement } from 'lit-element';

export default class CommonElement extends LitElement {
    createRenderRoot(): Element | ShadowRoot {
        return this;
    }
}