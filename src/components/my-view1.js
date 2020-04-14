
import { html,css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { store } from '../store.js';

import {updateLocationURL} from '../actions/app.js'


class MyView1 extends PageViewElement {

  render() {
    return html` <div class="columns"> <div class="column is-half is-offset-one-quarter"> <div class="field"> <label class="label" for="population">Population</label><div class="control"><input type="number" class="input" id="population" name="population" data-population placeholder="Population"></div></div><div class="field"> <label class="label" for="reported-cases">Reported Cases</label><div class="control"><input type="text" class="input" name="reported-cases" id="reported-cases" data-reported-cases placeholder="Reported Cases"> </div></div><div class="field"> <label class="label" for="total-hospital-beds">Total Hospital Beds</label><div class="control"><input type="number" class="input" name="total-hospital-beds" id="total-hospital-beds" data-total-hospital-beds placeholder="Total Hospital Beds"> </div></div><div class="field"> <label class="label" for="time-to-lapse">Time To Elapse</label><div class="control"><input type="text" class="input" name="time-to-lapse" id="time-to-lapse" data-time-to-lapse placeholder="Time To Elapse"> </div></div><div class="field"> <label class="label" for="data-period-type">Period Type</label><div class="control"><div class="select is-fullwidth"><select data-period-type id="data-period-type"><option value="days">Days</option><option value="weeks">Weeks</option><option value="months">Months</option></select></div></div></div><div class="field"> <div class="control"><button @click="${this.estimate}" class="button is-black">Estimate</button></div></div></div></div>`;
  }
  estimate(evt){

    let population= document.querySelector('input[data-population]').value;
    let timeToElapse= document.querySelector('input[data-time-to-lapse]').value;
    let reportedCases= document.querySelector('input[data-reported-cases]').value;
    let totalHospitalBeds= document.querySelector('input[data-total-hospital-beds]').value;
    let periodType= document.querySelector('select[data-period-type]').value;
    store.dispatch(updateLocationURL(`/estimate?population=${population}&period=${timeToElapse}&cases=${reportedCases}&beds=${totalHospitalBeds}&period-type=${periodType}`))

  }


}

window.customElements.define('my-view1', MyView1);
