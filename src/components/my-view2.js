import {html, css} from 'lit-element';
import {PageViewElement} from './page-view-element.js';


import {default as covid19ImpactEstimator} from '@danleyb2/covid19estimator'


class MyView2 extends PageViewElement {

    constructor() {
        super();


        const urlParams = new URLSearchParams(window.location.search);

        let data = {
            reportedCases: urlParams.get('cases'),
            periodType: urlParams.get('period-type'),
            timeToElapse: urlParams.get('period'),
            totalHospitalBeds: urlParams.get('beds'),
            region: {
                avgDailyIncomePopulation: 30,
                avgDailyIncomeInUSD: 1.5
            }
        };
        console.log(data);

        this.data = data;
        this.estimation = null;

    }

    static get properties() {
        return {
            // This is the data from the store.
            data: {type: Object},
            estimation: {type: Object},
            _value: {type: Number}
        };
    }

    render() {
        return html`
    
        <div class="columns">
  <div class="column is-half is-offset-one-quarter">
    
    <h4 class="is-size-3">Data</h4>
<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
  <tr>
    <th>Cases</th>
    <th>Period</th>
    <th>Period Type</th>
    <th>Beds</th>
    <th>Income Population</th>
    <th>Income</th>
  </tr>
  <tr>
    <td>${this.data.reportedCases}</td>
    <td>${this.data.timeToElapse}</td>
    <td>${this.data.periodType}</td>
    <td>${this.data.totalHospitalBeds}</td>
    <td>${this.data.region.avgDailyIncomePopulation}</td>
    <td>${this.data.region.avgDailyIncomeInUSD}</td>
  </tr>
</table>
    
    
    
    
    <h4 class="is-size-3">Impact</h4>
    ${this.estimation ? html`
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
  <tr>
    <th>Infected</th>
    <th>infections</th>
    <th>severeCases</th>
    <th>Beds</th>
    <th>casesForICU</th>
    <th>casesForVentilators</th>
    <th>dollarsInFlight</th>
  </tr>
  
  <tr>
    <td>${this.estimation.impact.currentlyInfected}</td>
    <td>${this.estimation.impact.infectionsByRequestedTime}</td>
    <td>${this.estimation.impact.severeCasesByRequestedTime}</td>
    <td>${this.estimation.impact.hospitalBedsByRequestedTime}</td>
    <td>${this.estimation.impact.casesForICUByRequestedTime}</td>
    <td>${this.estimation.impact.casesForVentilatorsByRequestedTime}</td>
    <td>${this.estimation.impact.dollarsInFlight}</td>
  </tr>
  
    <tr>
    <td>${this.estimation.severeImpact.currentlyInfected}</td>
    <td>${this.estimation.severeImpact.infectionsByRequestedTime}</td>
    <td>${this.estimation.severeImpact.severeCasesByRequestedTime}</td>
    <td>${this.estimation.severeImpact.hospitalBedsByRequestedTime}</td>
    <td>${this.estimation.severeImpact.casesForICUByRequestedTime}</td>
    <td>${this.estimation.severeImpact.casesForVentilatorsByRequestedTime}</td>
    <td>${this.estimation.severeImpact.dollarsInFlight}</td>
  </tr>
</table>
    ` : html`
    <h5>Processing</h5>
    `}
    
    </div>
    </div>
    
    `;
    }

    firstUpdated() {
        let estimation = covid19ImpactEstimator(this.data);
        this.estimation = estimation;
        console.log(estimation);
    }

}

window.customElements.define('my-view2', MyView2);
