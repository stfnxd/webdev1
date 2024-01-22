<template>
    <!-- Kontraktpreview -->
    <section class="contract-preview" style="border: 1px solid black; text-align: left; padding: 50px 70px;">
        <div class="contract-header">
            <h1 style="font-weight: 700; font-size:40px;">Privat leasingtilbud</h1>
            <div class="image">
                <img alt="Vue logo" class="logo" src="@/assets/images/logo-black.png" />
            </div>

        </div>
        <!-- Kontrakt header med information om EASY-LEASE og leasingtager -->
        <section class="contract-header" style="display: flex; justify-content: space-between; width:100%;">
            <div>
                <h4 style="margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Leasinggiver</h4>
                <p style="font-weight: 600;">EASY-LEASE A/S</p>
                <p style="font-weight: 600;">Vestre Havnepromenade 5</p>
                <p style="font-weight: 600;">9000 Aalborg</p>
                <p style="font-weight: 600;">CVR: 36036761</p>
            </div>
            <div>
                <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Leasingtager</h4>
                <p id="customer-name">{{ receivedData.customer.name }}</p>
                <p id="customer-email">{{ receivedData.customer.email }}</p>
                <p>Tilbudsdato: {{ correctStartDate }}</p>
            </div>
        </section>

        <div>
            <!-- Kontraktinformationer om køretøj -->
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Leasingkøretøj</h4>
            <table style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Mærke/model</td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">{{ receivedData.vehicle.vehicle }}</td>
                </tr>

                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Stelnummer</td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">{{ receivedData.frameNumber }}</td>
                </tr>
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">1. indregistreringsdato</td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">{{ correctFirstRegistrationDate }}</td>
                </tr>
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Kilometerstand</td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">{{ receivedData.vehicle.mileage }}</td>
                </tr>
            </table>
            <!-- Kontraktinformationer om leasingperiode -->
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Leasingperiode</h4>
            <table style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Kontraktlængde</td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">{{ receivedData.contractValues.runningTime }} måneder</td>
                </tr>

                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Indregistreringsperiode <span style="font-weight: 400;">- med ubegrænset antal kilometer</span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Forventet startdato</td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">{{ correctStartDate }}</td>
                </tr>
            </table>
            <!-- Kontraktinformationer om leasingydelser -->
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Leasingydelser</h4>
            <table style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Engangsydelse <span style="font-weight: 400;">inkl. moms<br><span class="smallFont" style="font-weight: 400; font-size: 14px;">Import af køretøj, kontraktoprettelse og
                                45-pkt. uvildigt autotjek inkluderet</span></span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>
            </table>
            <table class="mt-3 mb-4" style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Månedlig leasingydelse <span style="font-weight: 400;">inkl. moms</span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>
            </table>
            <!-- Kontraktinformationer om depositum -->
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Depositum</h4>
            <table style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Sikkerhedsstillelse <span style="font-weight: 400;">inkl. moms - tilbagebetales efter endt aftaleperiode</span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>
            </table>
            <!-- Kontraktinformationer om restværdi -->
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Restværdi</h4>
            <table style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Køretøjets restværdi ved kontraktudløb<br><span class="smallFont" style="font-weight: 400; font-size: 14px;"><span>Ved aftaleperiodens udløb er
                                leasingtager på anfordring forpligtet til at anvise CVR-registreret tredjemand som køber.
                                Såfremt restværdien de facto ikke kan opnås er leasingtager forpligtet til at indbetale
                                differencen tillagt moms.</span></span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>
            </table>
            <!-- Kontraktinformationer om forsikringstilbud -->
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Forsikringstilbud</h4>
            <table style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Forsikringspræmie pr. måned <span>v/ tilladt kørsel inkl. vejhjælp</span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>

                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">Forsikringspræmie pr. måned <span style="font-weight: 400;">v/ stilstand</span><br><span class="smallFont" style="font-weight: 400; font-size: 14px;">Mekanisk
                            garantiforsikring kan tilvælges. Kontakt os for individuelt tilbud<br><span style="font-weight: 400;">*Indtegningskrav:
                                Minimum 25 år og 3 års skadefri kørsel. Friskadedækning kan tilvælges.</span></span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>
            </table>
            <!-- Kontraktinformationer om GPS-overvågning -->
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">GPS-overvågning</h4>
            <table style="width: 100%;">
                <tr style="display: flex; align-items: start; justify-content: space-between;">
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; width: 80%;">GPS-tracker og abbonement i leasingperioden <span style="font-weight: 400; ">inkl. moms</span><br><span style="font-weight: 400; font-size: 14px;"
                            class="smallFont"><span style="font-weight: 400;">*Forudsat accept af forsikringstilbud</span></span></td>
                    <td style="padding: 5px 0 0;font-size: 16px;font-weight: 600; text-align: right;font-weight: 400;">VÆRDI</td>
                </tr>
            </table>
        </div>
        <!-- Kontraktfooter med tilbudsvilkår -->
        <div class="contractFooter">
            <h4 style=" margin-bottom: 5px; font-size: 20px; font-weight: 700; margin-top: 10px; margin-bottom: 0;">Tilbudsvilkår</h4>
            <p class="smallFont" style="font-size: 14px;">Priserne er ekskl. grøn ejerafgift, service og vedligeholdelse.</p>
            <p class="smallFont" style="font-size: 14px;">Der tages forbehold for positiv kreditgodkendelse, regne- og trykfejl, afgiftsændringer,
                leveringshindringer samt ændringer i beskatningsgrundlag</p>
            <p class="smallFont" style="font-size: 14px;">Tilbuddet er gældende i 10 dage fra tilbudsdato og er underlagt EASY-LEASE A/S’
                standardvilkår</p>
        </div>
    </section>
</template>
  
<script>
import { defineComponent, computed } from 'vue';
import { useMyStore } from '@/store/myStore';

export default defineComponent({
    setup() {
        // Henter data fra Pinia store og lægger det i recievedData
        const myStore = useMyStore();
        const receivedData = computed(() => myStore.data);

        console.log(receivedData.value)
        // Sætter startdato for leasingkontrakten i korrekt datoformat DD-MM-YYYY
        let wrongStartDate = receivedData.value.customer.startDate;
        let wrongStartDateSplit = wrongStartDate.split('-');
        let correctStartDate = `${wrongStartDateSplit[2]}.${wrongStartDateSplit[1]}.${wrongStartDateSplit[0]}`;

        // Sætter 1.indregistreringsdato i korrekt datoformat DD-MM-YYYY
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

<!-- <style>
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
    -->