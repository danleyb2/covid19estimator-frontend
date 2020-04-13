import {LitElement, html, css} from 'lit-element';
import {connect} from 'pwa-helpers/connect-mixin.js';
import {installMediaQueryWatcher} from 'pwa-helpers/media-query.js';
import {installOfflineWatcher} from 'pwa-helpers/network.js';
import {installRouter} from 'pwa-helpers/router.js';
import {updateMetadata} from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import {store} from '../store.js';

// These are the actions needed by this element.
import {
    navigate,
    updateOffline,
    updateDrawerState
} from '../actions/app.js';

import './snack-bar.js';

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
<snack-bar ?active="${this._snackbarOpened}">
    You are now ${this._offline ? 'offline' : 'online'}.
</snack-bar>
    `;
    }

    constructor() {
        super();
    }

    firstUpdated() {
        installRouter((location) => store.dispatch(navigate(location.pathname)));
        installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
        installMediaQueryWatcher(`(min-width: 460px)`,
            () => store.dispatch(updateDrawerState(false)));
    }

    updated(changedProps) {
        if (changedProps.has('_page')) {
            const pageTitle = this.appTitle + ' - ' + this._page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                // This object also takes an image property, that points to an img src.
            });
        }
    }


    stateChanged(state) {
        this._page = state.app.page;
        this._offline = state.app.offline;
        this._snackbarOpened = state.app.snackbarOpened;
    }
}

window.customElements.define('my-app', MyApp);
