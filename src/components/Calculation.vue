<template>
    <section class="calculation col-7">
        <h1>Beregning</h1>
        <div>
            <p>Input value for calculation: {{ receivedValue }}</p>
            <!-- Perform calculations using inputValue -->
        </div>

        <table>
            <tr>
                <th>Overblik leasingtilbud</th>
                <th>Privat inkl. moms</th>
                <th>Erhverv ekskl. moms</th>
            </tr>

            <tr>
                <td>Engangsydelse inkl. kontraktoprettelse</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Månedlig leasing</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Totalpris i leasingperiode</b></td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Bilens afskrivning i leasingperioden</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Resværdi ved udløb</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Depositum</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Forsikring pr. md. inkl. vejhjælp (moms fri)</td>
                <td>0</td>
                <td>0</td>
            </tr>

            <tr>
                <td>Tilbud om friskadedækning</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Selvrisiko</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Beskatningsgrundlag</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Momsfradrag pr. måned</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>GPS-tracker inkl. abonnoment og montering</td>
                <td>VÆRDI</td>
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
export default {
    name: 'Calculation',
    props: {
        receivedValue: {
            type: String,
            default: ''
        }
    }
};

</script>

<style>
.calculation {
    margin-top: 30px; 
    border: 1px solid var(--black-color); 
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


</style>
   