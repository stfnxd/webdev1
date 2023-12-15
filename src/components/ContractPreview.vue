<template>
    <section class="contract-preview">

        <div class="contract-header">
            <h1>Privat leasingtilbud</h1>
            <div class="image">
                <img alt="Vue logo" class="logo" src="@/assets/images/logo-black.png" />
            </div>

        </div>
        <section class="contract-header">
            <div>
                <h4>Leasinggiver</h4>
                <p>EASY-LEASE A/S</p>
                <p>Vestre Havnepromenade 5</p>
                <p>9000 Aalborg</p>
                <p>CVR: 36036761</p>
            </div>
            <div>
                <h4>Leasingtager</h4>
                <p>{{ receivedData.customer.name }}</p>
                <p>Tilbudsdato: {{ correctStartDate }}</p>
            </div>
        </section>

        <div>
            <h4>Leasingkøretøj</h4>
            <table>
                <tr>
                    <td>Mærke/model</td>
                    <td>{{ receivedData.vehicle.vehicle }}</td>
                </tr>

                <tr>
                    <td>Stelnummer</td>
                    <td>{{ receivedData.frameNumber }}</td>
                </tr>
                <tr>
                    <td>1. indregistreringsdato</td>
                    <td>{{ correctFirstRegistrationDate }}</td>
                </tr>
                <tr>
                    <td>Kilometerstand</td>
                    <td>{{ receivedData.vehicle.mileage }}</td>
                </tr>
            </table>
            <h4>Leasingperiode</h4>
            <table>
                <tr>
                    <td>Kontraktlængde</td>
                    <td>{{ receivedData.contractValues.runningTime }} måneder</td>
                </tr>

                <tr>
                    <td>Indregistreringsperiode <span>- med ubegrænset antal kilometer</span></td>
                    <td> dato </td>
                </tr>
                <tr>
                    <td>Forventet startdato</td>
                    <td>{{ correctStartDate }}</td>
                </tr>
            </table>

            <h4>Leasingydelser</h4>
            <table>
                <tr>
                    <td>Engangsydelse <span>inkl. moms<br><span class="smallFont">Import af køretøj, kontraktoprettelse og
                                45-pkt. uvildigt autotjek inkluderet</span></span></td>
                    <td>{{ receivedData.contractValues.oneTimeBenefit }}</td>
                </tr>
            </table>
            <table class="mt-3 mb-4">
                <tr>
                    <td>Månedlig leasingydelse <span>inkl. moms</span></td>
                    <td>{{ receivedData.contractValues.depreciation }} {{ receivedData.contractValues.runningTime }}</td>
                </tr>
            </table>


            <h4>Depositum</h4>
            <table>
                <tr>
                    <td>Sikkerhedsstillelse <span>inkl. moms - tilbagebetales efter endt aftaleperiode</span></td>
                    <td>{{ receivedData.customer.name }}</td>
                </tr>
            </table>

            <h4>Restværdi</h4>
            <table>
                <tr>
                    <td>Køretøjets restværdi ved kontraktudløb<br><span class="smallFont"><span>Ved aftaleperiodens udløb er
                                leasingtager på anfordring forpligtet til at anvise CVR-registreret tredjemand som køber.
                                Såfremt restværdien de facto ikke kan opnås er leasingtager forpligtet til at indbetale
                                differencen tillagt moms.</span></span></td>
                    <td>{{ receivedData.customer.name }}</td>
                </tr>
            </table>

            <h4>Forsikringstilbud</h4>
            <table>
                <tr>
                    <td>Forsikringspræmie pr. måned <span>v/ tilladt kørsel inkl. vejhjælp</span></td>
                    <td>{{ receivedData.customer.name }}</td>
                </tr>

                <tr>
                    <td>Forsikringspræmie pr. måned <span>v/ stilstand</span><br><span class="smallFont">Mekanisk
                            garantiforsikring kan tilvælges. Kontakt os for individuelt tilbud<br><span>*Indtegningskrav:
                                Minimum 25 år og 3 års skadefri kørsel. Friskadedækning kan tilvælges.</span></span></td>
                    <td>{{ receivedData.customer.name }}</td>
                </tr>
            </table>

            <h4>GPS-overvågning</h4>
            <table>
                <tr>
                    <td>GPS-tracker og abbonement i leasingperiodenb <span>inkl. moms</span><br><span
                            class="smallFont"><span>*Forudsat accept af forsikringstilbud</span></span></td>
                    <td>{{ receivedData.customer.name }}</td>
                </tr>
            </table>
        </div>
        <div class="contractFooter">
            <h4>Tilbudsvilkår</h4>
            <p class="smallFont">Priserne er ekskl. grøn ejerafgift, service og vedligeholdelse.</p>
            <p class="smallFont">Der tages forbehold for positiv kreditgodkendelse, regne- og trykfejl, afgiftsændringer,
                leveringshindringer samt ændringer i beskatningsgrundlag</p>
            <p class="smallFont">Tilbuddet er gældende i 10 dage fra tilbudsdato og er underlagt EASY-LEASE A/S’
                standardvilkår</p>
        </div>
    </section>
</template>
  
<script>
import { defineComponent, computed } from 'vue';
import { useMyStore } from '@/store/myStore';

export default defineComponent({
    setup() {
        const myStore = useMyStore();

        // Use computed property to automatically update when data changes
        const receivedData = computed(() => myStore.data);
        let wrongStartDate = receivedData.value.customer.startDate;
        let wrongStartDateSplit = wrongStartDate.split('-');
        let correctStartDate = `${wrongStartDateSplit[2]}.${wrongStartDateSplit[1]}.${wrongStartDateSplit[0]}`;

        let wrongFirstRegistrationDate = receivedData.value.vehicle.firstRegistrationDate;
        let wrongFirstRegistrationDateSplit = wrongFirstRegistrationDate.split('-');
        let correctFirstRegistrationDate = `${wrongFirstRegistrationDateSplit[2]}.${wrongFirstRegistrationDateSplit[1]}.${wrongFirstRegistrationDateSplit[0]}`;

        

        return {
            receivedData,
            correctStartDate,
            correctFirstRegistrationDate
        };
        
    },
});

</script>

<style>
.contract-header h1 {
    font-weight: 700;
}

.contract-header div h4 {
    margin-bottom: 5px;
}

.contract-preview {
    border: 1px solid var(--black-color);
    text-align: left;
    padding: 50px 70px;
}

.contract-preview h4 {
    font-size: 20px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 0;
}

.contract-preview p {
    margin-bottom: 0;
}

.contract-preview .contract-header {
    display: flex;
    justify-content: space-between;
}

.contract-preview .contract-header div p {
    font-weight: 600;
}

.contract-preview table {
    width: 100%;
}

.contract-preview table tr {
    display: flex;
    align-items: start;
    justify-content: space-between;
}

.contract-preview table tr td {
    padding: 5px 0 0;
    font-size: 16px;
    font-weight: 600;
}

.contract-preview table tr td span {
    font-weight: 400;
}

.contract-preview .smallFont {
    font-size: 14px;
}

.contract-preview table tr td:first-of-type {
    width: 80%;
}

.contract-preview table tr td:last-of-type {
    text-align: right;
    font-weight: 400;
}
</style>
   