<template>
    <section class="calculation col-7">
        <h2>Beregning</h2>
        <div>
            <p>Input value for calculation: {{ receivedValue }}</p>
            <!-- Perform calculations using inputValue -->
        </div>

        <table>
            <tr>
                <th>Overblik leasingtilbud</th>
                <th v-if="receivedValue.customerType == 'Privat'">Inkl. moms</th>
                <th>Ekskl. moms</th>
            </tr>

            <tr>
                <td>Engangsydelse inkl. kontraktoprettelse</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Månedlig leasing</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Totalpris i leasingperiode</b></td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Bilens afskrivning i leasingperioden</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Resværdi ved udløb</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Depositum</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Forsikring pr. md. inkl. vejhjælp (moms fri)</td>
                <td v-if="receivedValue.customerType == 'Privat'">0</td>
                <td>0</td>
            </tr>

            <tr>
                <td>Tilbud om friskadedækning</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Selvrisiko</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-if="receivedValue.customerType == 'Erhverv'">
                <td>Beskatningsgrundlag</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-if="receivedValue.customerType == 'Erhverv'">
                <td>Momsfradrag pr. måned</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>GPS-tracker inkl. abonnoment og montering</td>
                <td v-if="receivedValue.customerType == 'Privat'">VÆRDI</td>
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
                <td>2.500</td>
            </tr>

            <tr>
                <td>Finansiering</td>
                <td>VÆRDI</td>
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
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>
            
            <tr>
                <td>Stålgevinst/valutakursgevinst</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Samlet dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>

        </table>


        <table>
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
import { useMyStore } from '@/store/myStore';

export default defineComponent( {
    setup() {
    const myStore = useMyStore();

    // Use computed property to automatically update when data changes
    const receivedData = computed(() => myStore.data);

    return {
      receivedData,
    };
  },
  name: 'Calculation',
    props: {
        receivedValue: {
             type: String,
            default: ''
        }
     }
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
   