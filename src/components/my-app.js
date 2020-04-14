import {LitElement, html, css} from 'lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installRouter} from 'pwa-helpers/router.js';

// This element is connected to the Redux store.
import {store} from '../store.js';

// These are the actions needed by this element.
import {
    navigate,
} from '../actions/app.js';

class MyApp extends connect(store)(LitElement) {
    static get properties() {
        return {
            appTitle: {type: String},
            _page: {type: String},
            _snackbarOpened: {type: Boolean},
            _offline: {type: Boolean}
        };
    }

    createRenderRoot() {
        return this;
    }

    render() {
        // Anything that's related to rendering should be done in here.
        return html`<main style="margin-top: 100px">
    <h1 class="has-text-centered is-size-2">covid19estimator</h1>
    <my-view1 class="page" ?active="${this._page === 'view1'}"></my-view1>
    <my-view2 class="page" ?active="${this._page === 'estimate'}"></my-view2>
    <my-view404 class="page" ?active="${this._page === 'view404'}"></my-view404>
</main>
    `;
    }

    constructor() {
        super();
    }

    firstUpdated() {
        installRouter((location) => store.dispatch(navigate(location.pathname)));
    }

    stateChanged(state) {
        this._page = state.app.page;
        this._offline = state.app.offline;
    }
}

window.customElements.define('my-app', MyApp);
