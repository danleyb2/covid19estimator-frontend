import { LitElement } from 'lit-element';

export class PageViewElement extends LitElement {
  // Only render this page if it's actually visible.
  shouldUpdate() {
    return this.active;
  }

    createRenderRoot(){
        return this;
    }

  static get properties() {
    return {
      active: { type: Boolean }
    }
  }
}
