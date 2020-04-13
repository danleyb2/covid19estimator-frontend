
import { html,css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { store } from '../store.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import {updateLocationURL} from '../actions/app.js'


class MyView1 extends PageViewElement {




  render() {
    return html`
    
    <div class="columns">
  <div class="column is-half is-offset-one-quarter">
    
    <div class="field">
  <label class="label">Population</label>
<div class="control">

<input type="number" class="input" name="population" data-population  placeholder="Population">
</div>
</div>



<div class="field">
  <label class="label">Reported Cases</label>
<div class="control">

<input type="text" class="input" name="reported-cases" data-reported-cases placeholder="Reported Cases"> 
</div>
</div>

<div class="field">
  <label class="label">Total Hospital Beds</label>
<div class="control">

<input type="number" class="input" name="total-hospital-beds" data-total-hospital-beds placeholder="Total Hospital Beds"> 
</div>
</div>

<div class="field">
  <label class="label">Time To Elapse</label>
<div class="control">

<input type="text" class="input" name="time-to-lapse" data-time-to-lapse  placeholder="Time To Elapse"> 
</div>
</div>
<div class="field">
  <label class="label">Period Type</label>
<div class="control">
<div class="select is-fullwidth">
<select data-period-type >

<option value="days">Days</option>
<option value="weeks">Weeks</option>
<option value="months">Months</option>

</select>
</div>
</div>
</div>


<div class="field">
  
<div class="control">

<button @click="${this.estimate}" class="button is-primary">Estimate</button>
</div>
</div>
</div>
</div>
    
    
    `;
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
