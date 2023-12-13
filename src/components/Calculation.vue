<template>
    <section class="calculation col-7">
        <h2>Beregning</h2>
        <div>
            <p>Input value for calculation: {{ receivedValue }}</p>
        </div>

        <table>
            <tr>
                <th>Overblik leasingtilbud</th>
                <th v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">Inkl. moms</th>
                <th>Ekskl. moms</th>
            </tr>

            <tr v-show="receivedValue.customerType == 'Split'">
                <td><b>Leasingydelse - erhverv</b></td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'"></td>
                <td></td>
            </tr>

            <tr v-show="receivedValue.customerType == 'Split'">
                <td>Engangsydelse inkl. kontraktoprettelse</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>{{ receivedValue.oneTimeBenefit }}</td>
            </tr>

            <tr v-show="receivedValue.customerType == 'Split'">
                <td>Månedlig leasing</td>
                <td v-show="receivedValue.customerType == 'Privat'  || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.customerType == 'Split'">
                <td><b>Leasingydelse - privat</b></td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'"></td>
                <td></td>
            </tr>

            <tr>
                <td>Engangsydelse inkl. kontraktoprettelse</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td v-if="!receivedValue.oneTimeBenefit && receivedValue.contractType == 'Stilstand'">Engangsydelse er 0%</td>
                <td v-else-if="!receivedValue.oneTimeBenefit && receivedValue.contractType != 'Stilstand'">Engangsydelse er 20%</td>
                <td v-else>{{ receivedValue.oneTimeBenefit }}</td>
            </tr>

            <tr>
                <td>Månedlig leasing</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Totalpris i leasingperiode</b></td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Bilens afskrivning i leasingperioden</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Restværdi ved udløb</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td v-if="receivedValue.depreciation && receivedValue.salePrice">
                    {{ receivedValue.salePrice * ((100 - receivedValue.depreciation) / 100) }} 
                </td>
                <td v-else-if="receivedValue.salePrice && receivedValue.runningTime">
                    {{ receivedValue.salePrice * (0.85 / 12 * receivedValue.runningTime) }}
                </td>
                <td v-else>VÆRDI</td>
            </tr>
 
            <tr>
                <td>Depositum</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Forsikring pr. md. inkl. vejhjælp (moms fri)</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">0</td>
                <td>0</td>
            </tr>

            <tr>
                <td>Tilbud om friskadedækning</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Selvrisiko</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.customerType == 'Erhverv'">
                <td>Beskatningsgrundlag</td>
                <td v-show="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.customerType == 'Erhverv'">
                <td>Momsfradrag pr. måned</td>
                <td v-show="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>GPS-tracker inkl. abonnoment og montering</td>
                <td v-show="receivedValue.customerType == 'Privat' || receivedValue.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>
        </table>


        <table>
            <tr>
                <th>Overblik over indtægter/udgifter i leasingperioden, ex. moms</th>
                <th>Beløb</th>
            </tr>

            <tr>
                <td><b>Indtægter</b></td>
                <td></td>
            </tr>

            <tr>
                <td>Kontraktoprettelse</td>
                <td v-if="receivedValue.contractCreation">{{ receivedValue.contractCreation }}</td>
                <td v-else-if="receivedValue.customerType == 'Split' && receivedValue.import">{{ 10500 + 12500 + 2500 + (700 * receivedValue.runningTime)}}</td>
                <td v-else-if="receivedValue.customerType == 'Split'">{{ 12500 + 2500 + (700 * receivedValue.runningTime)}}</td>
                <td v-else-if="receivedValue.import">{{ 10500 + 2500 }}</td>
                <td v-else>2500</td>
            </tr>

            <tr>
                <td>Finansiering</td>
                <td v-if="receivedValue.interestRate">{{ receivedValue.interestRate }}</td>
                <td v-else>VÆRDI</td>
            </tr>

            <tr>
                <td>Indtægter i alt</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Omkostninger</b></td>
                <td></td>
            </tr>

            <tr>
                <td>Finansiering</td>
                <td v-if="receivedValue.interestRate && receivedValue.runningTime">{{ (100 * (100 - receivedValue.interestRate) / 12) * receivedValue.runningTime }}</td>
                <td v-else>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>
            
            <tr v-show="receivedValue.contractType == 'Nytegning' || receivedValue.import == true">
                <td>Stålgevinst/valutakursgevinst</td>
                <td v-if="receivedValue.import">{{ (receivedValue.salePrice * 7.46) - (receivedValue.cost * 7.46) }}</td>
                <td v-else-if="!receivedValue.import">{{ receivedValue.salePrice - receivedValue.cost }}</td>
                <td v-else>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.contractType == 'Nytegning' || receivedValue.import == true">
                <td><b>Samlet dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>

        </table>


        <table v-show="receivedValue.contractType == 'Stilstand' || receivedValue.levyPaid == true">
            <tr>
                <th>Forholdsmæssig afgift</th>
                <th>Mdr.</th>
                <th>Beløb</th>
            </tr>

            <tr>
                <td>Forholdsmæssig afgift under 3 mdr.</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Forholdsmæssig afgift 4-36 mdr.</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>
            
            <tr>
                <td>Forholdsmæssig afgift +36 mdr.</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Rente af forholdsmæssig afgift</td>
                <td></td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Forholdsmæssig afgift i alt</b></td>
                <td></td>
                <td><b>VÆRDI</b></td>
            </tr>

        </table>

    </section>
</template>
  
<script>
// export default {
//     name: 'Calculation',
//     props: {
//         receivedValue: {
//             type: String,
//             default: ''
//         }
//     }
// };

import { defineComponent, computed } from 'vue';

export default defineComponent( {
  name: 'Calculation',
    props: {
        receivedValue: {
            type: String,
            default: ''
        }
    },
});



</script>

<style>
.calculation {
    margin-top: 30px; 
    border: 1px solid var(--medium-grey); 
    height: fit-content; 
    padding: 50px;
}

.calculation table {
    width: 100%; 
    margin-bottom: 50px;
}

.calculation table tr:nth-child(odd) {
  background-color: var(--light-grey); 
}

.calculation table tr:first-of-type {
    background-color: var(--table-header-grey);
}

.calculation table td, .calculation table th {
    padding: 10px;
}

.calculation table th {
    font-weight: 600;
    font-size: 1.1rem; 
}

.calculation table tr td,  .calculation table tr th{
    text-align: center; 
}

.calculation table tr td:first-of-type, .calculation table tr th:first-of-type {
    text-align: left; 
}

.calculation table tr td:last-of-type, .calculation table tr th:last-of-type {
    width: 30%;
}


</style>
   