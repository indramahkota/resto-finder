import { LitElement } from 'lit-element';

export default class CommonElement extends LitElement {
    createRenderRoot() {
        return this;
    }
}