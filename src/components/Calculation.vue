<template>
    <!-- Beregningssektionen -->
    <section class="calculation col-7">
        <h2>Beregning</h2>

        <!-- Tabel til leasingtilbud -->
        <table>
            <!-- Overskriftsrække med momsinformation afhængig af kundetype -->
            <tr>
                <th>Overblik leasingtilbud</th>
                <!-- Vises kun hvis kundetype er "Privat" eller "Split"-->
                <th v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">Inkl. moms</th>
                <th>Ekskl. moms</th>
            </tr>

            <!-- Række for leasingydelse (erhverv) vises hvis kundetype er "split" -->
            <tr v-show="receivedValue.customer.customerType == 'Split'">
                <td><b>Leasingydelse - erhverv</b></td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'"></td>
                <td></td>
            </tr>

            <!-- Række for engangsydelse inkl. kontraktoprettelse vises hvis kundetypen er "Split"-->
            <tr v-show="receivedValue.customer.customerType == 'Split'">
                <td>Engangsydelse inkl. kontraktoprettelse</td>
                <td v-if="oneTimeBenefitWithContractCreation" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    {{ oneTimeBenefitWithContractCreation }}
                </td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    VÆRDI
                </td>
                <td v-if="oneTimeBenefitWithContractCreation">
                    {{ oneTimeBenefitWithContractCreation }}
                </td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for månedlig leasing -->
            <tr v-show="receivedValue.customer.customerType == 'Split'">
                <td>Månedlig leasing</td>
                <td v-show="receivedValue.customer.customerType == 'Privat'  || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for leasingydelse (privat) -->
            <tr v-show="receivedValue.customer.customerType == 'Split'">
                <td><b>Leasingydelse - privat</b></td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'"></td>
                <td></td>
            </tr>

            <!-- Række for engangsydelse inkl. kontraktoprettelse (privat) -->
            <tr>
                <td>Engangsydelse inkl. kontraktoprettelse</td>
                <td v-if="oneTimeBenefitWithContractCreation" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    {{ oneTimeBenefitWithContractCreation }} kr.
                </td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    VÆRDI
                </td>
                <td v-if="oneTimeBenefitWithContractCreation">
                    {{ oneTimeBenefitWithContractCreation }} kr.
                </td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for månedlig leasing -->
            <tr>
                <td>Månedlig leasing</td>
                <td v-if="monthlyLease" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">{{ monthlyLease }} kr.</td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td v-if="monthlyLease">{{ monthlyLease }} kr.</td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for totalpris i leasingperiode -->
            <tr>
                <td><b>Totalpris i leasingperiode</b></td>
                <td v-if="totalPrice" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">{{ totalPrice }} kr.</td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td v-if="totalPrice">{{ totalPrice }} kr.</td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for bilens afskrivning i leasingperioden -->
            <tr>
                <td>Bilens afskrivning i leasingperioden</td>
                <td v-if="carDepreciation" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    {{ carDepreciation }} kr.
                </td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    VÆRDI
                </td>
                <td v-if="carDepreciation">
                    {{ carDepreciation }} kr.
                </td>
                <td v-else>
                    VÆRDI
                </td>
            </tr>

            <!-- Række for restværdi ved udløb -->
            <tr>
                <td>Restværdi ved udløb</td>
                <td v-if="resValue" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    {{ resValue }} kr.
                </td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">
                    VÆRDI
                </td>
                <td v-if="resValue">
                    {{ resValue }} kr.
                </td>
                <td v-else>
                    VÆRDI
                </td>
            </tr>
 
            <!-- Række for depositum -->
            <tr>
                <td>Depositum</td>
                <td v-if="deposit" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">{{ deposit }} kr.</td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td v-if="deposit">{{ deposit }} kr.</td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for forsikring pr. md. inkl. vejhjælp (moms fri) -->
            <tr>
                <td>Forsikring pr. md. inkl. vejhjælp (moms fri)</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">0</td>
                <td>0</td>
            </tr>

            <!-- Række for tilbud om friskadedækning -->
            <tr>
                <td>Tilbud om friskadedækning</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for selvrisiko -->
            <tr>
                <td>Selvrisiko</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for beskatningsgrundlag (kun for erhvervskunder) -->
            <tr v-show="receivedValue.customer.customerType == 'Erhverv'">
                <td>Beskatningsgrundlag</td>
                <td v-show="receivedValue.customer.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for momsfradrag pr. måned (kun for erhvervskunder) -->
            <tr v-show="receivedValue.customer.customerType == 'Erhverv'">
                <td>Momsfradrag pr. måned</td>
                <td v-show="receivedValue.customer.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for GPS-tracker inkl. abonnement og montering -->
            <tr>
                <td>GPS-tracker inkl. abonnement og montering</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>
        </table>

        <!-- Tabel for indtægter/udgifter i leasingperioden -->
        <table>
            <tr>
                <th>Overblik over indtægter/udgifter i leasingperioden, ex. moms</th>
                <th>Beløb</th>
            </tr>

            <!-- Række for indtægter -->
            <tr>
                <td><b>Indtægter</b></td>
                <td></td>
            </tr>

            <!-- Række for kontraktoprettelse -->
            <tr>
                <td>Kontraktoprettelse</td>
                <td v-if="receivedValue.contractValues.contractCreation">{{ receivedValue.contractValues.contractCreation }} kr.</td>
                <td v-else>{{ contractCreation }} kr.</td>
            </tr>

            <!-- Række for finansiering (indtægt) -->
            <tr>
                <td>Finansiering</td>
                <td v-if="receivedValue.contractValues.interestRate">{{ financing }} kr.</td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for samlede indtægter -->
            <tr>
                <td>Indtægter i alt</td>
                <td>{{ earningsTotal }} kr.</td>
            </tr>

            <!-- Række for omkostninger -->
            <tr>
                <td><b>Omkostninger</b></td>
                <td></td>
            </tr>

            <!-- Række for finansieringsomkostninger -->
            <tr>
                <td>Finansiering</td>
                <td v-if="receivedValue.contractValues.interestRate && receivedValue.contractValues.runningTime">{{ finansCost }} kr.</td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for dækningsbidrag -->
            <tr>
                <td><b>Dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>
            
            <!-- Række for stålgevinst/valutakursgevinst (vises kun ved kontrakttypen "Nytegning") -->
            <tr v-show="receivedValue.customer.contractType == 'Nytegning' || receivedValue.customer.import == true">
                <td>Stålgevinst/valutakursgevinst</td>
                <td v-if="steelGainValutaGain">{{ steelGainValutaGain }}</td>
                <td v-else>VÆRDI</td>
            </tr>

            <!-- Række for samlet dækningsbidrag (vises kun ved kontrakttypen "Nytegning") -->
            <tr v-show="receivedValue.customer.contractType == 'Nytegning' || receivedValue.customer.import == true">
                <td><b>Samlet dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>

        </table>

        <!-- Tabel kun vist ved kontrakttypen "Stilstand" eller hvis afgiften er betalt -->
        <table v-show="receivedValue.customer.contractType == 'Stilstand' || receivedValue.vehicle.levyPaid == true">
            <tr>
                <th>Forholdsmæssig afgift</th>
                <th>Mdr.</th>
                <th>Beløb</th>
            </tr>

            <!-- Række for forholdsmæssig afgift under 3 mdr. -->
            <tr>
                <td>Forholdsmæssig afgift under 3 mdr.</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for forholdsmæssig afgift mellem 4 og 36 mdr. -->
            <tr>
                <td>Forholdsmæssig afgift 4-36 mdr.</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>
            
            <!-- Række for forholdsmæssig afgift over 36 mdr. -->
            <tr>
                <td>Forholdsmæssig afgift +36 mdr.</td>
                <td>VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for rente af forholdsmæssig afgift-->
            <tr>
                <td>Rente af forholdsmæssig afgift</td>
                <td></td>
                <td>VÆRDI</td>
            </tr>

            <!-- Række for forholdsmæssig afgift i alt -->
            <tr>
                <td><b>Forholdsmæssig afgift i alt</b></td>
                <td></td>
                <td><b>VÆRDI</b></td>
            </tr>

        </table>
    </section>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useMyStore } from '@/store/myStore';

export default defineComponent({
    name: 'Calculation',

    // Egenskaber (props) for komponenten
    props: {
        // Standardværdien for den modtagne værdi er et objekt med specifikke indlejrede strukturer
        receivedValue: {
            type: Object,
            // Standardfunktionen returnerer et objekt med foruddefineret struktur og standardværdier
            default: () => ({
                // Indlejrede strukturer for kontraktværdier, kundeoplysninger og køretøjsdetaljer
                contractValues: {
                    salePrice: '',
                    cost: '',
                    estimatedMarketValue: '',
                    residualValue: '',
                    cashPrice: '',
                    runningTime: '',
                    activeRunningTime: '',
                    interestRate: '',
                    contractCreation: '',
                    oneTimeBenefit: '',
                    deposit: '',
                    depreciation: '',
                    commission: '',
                    privateShare: '',
                    registrationFee: ''
                },
                customer: {
                    name: '',
                    email: '',
                    under25: '',
                    customerType: '',
                    contractType: '',
                    startDate: '',
                    season: '',
                    import: '',
                },
                vehicle: {
                    frameNumber: '',
                    vehicle: '',
                    newVehicle: '',
                    firstRegistrationDate: '',
                    initialPrice: '',
                    vatDeath: '',
                    vehicleType: '',
                    levyPaid: '',
                    mileage: '',
                }
            })
        }
    },

    // Beregnede egenskaber for dynamiske beregninger
    computed: {
        // Beregn startdato som en Date-objekt
        startDateComp() {
            const startDate = this.receivedValue.customer.startDate;
            const contractStartDate = new Date(startDate);
            
            return contractStartDate;
        },

        // Beregn antallet af måneder over og under 36 måneder i kontrakten
        carMonths() {
            const start = new Date(this.receivedValue.vehicle.firstRegistrationDate);

            const contractStart = new Date(this.startDateComp);

            // Beregn antallet af måneder fra køretøjets første registreringsdato til kontraktens startdato
            const monthsBeforeContract = (contractStart.getFullYear() - start.getFullYear()) * 12 + contractStart.getMonth() - start.getMonth();

            // Beregn kontraktens slutdato
            const end = new Date(contractStart);
            end.setMonth(end.getMonth() + this.contractRunTime);

            // Beregn antallet af måneder fra køretøjets første registreringsdato til kontraktens slutdato
            const vehicleAgeAtContractEnd = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

            // Beregn antallet af måneder over og under 36 måneder i løbet af kontrakten
            const monthsOver36 = Math.max(0, vehicleAgeAtContractEnd - Math.min(vehicleAgeAtContractEnd, 36));
            const monthsUnder36 = Math.max(0, Math.min(vehicleAgeAtContractEnd, 36 - monthsBeforeContract));

            return {
                monthsOver36,
                monthsUnder36,
            };
        },

        // Beregn køretøjets alder i måneder
        carAge() {
            const registrationDate  = new Date(this.receivedValue.vehicle.firstRegistrationDate);
            let today = new Date();
            if (this.today) {
                today = new Date(this.today);
            }

            return (today.getFullYear() - registrationDate.getFullYear()) * 12 + today.getMonth() - registrationDate.getMonth();
        },

        // Beregn månedlig momsfradrag
        momsMonth() {
            const registrationFee = this.receivedValue.contractValues.registrationFee;
            const carMonths = this.carMonths;

            if (registrationFee && carMonths) {
                const monthsUnder36 = carMonths.monthsUnder36 || 0;
                const monthsOver36 = carMonths.monthsOver36 || 0;

                const momsWithin36Months = 0.25 * registrationFee * 0.02 * monthsUnder36;
                const momsOver36Months = 0.25 * registrationFee * 0.01 * monthsOver36;

                const totalMoms = momsWithin36Months + momsOver36Months;
                return totalMoms.toFixed(2);
            } else {
                return 0;
            } 
        },

        // Bestem bilens pris baseret på kontrakttype
        carPrice() {
            const contractType = this.receivedValue.customer.contractType;
            if (contractType === 'Pristjek') {
                return this.receivedValue.contractValues.cashPrice;
            } else if (contractType === 'Genleasing') {
                return this.receivedValue.contractValues.residualValue;
            } else {
                return this.receivedValue.contractValues.salePrice;
            }
        },

        // Beregn engangsydelse baseret på kontrakttype og procentdel
        oneTimeBenefit() {
            const oneTimeBenefitPercent = this.receivedValue.contractValues.oneTimeBenefit;
            const contractType = this.receivedValue.customer.contractType;
            if (contractType != 'Stilstand' && oneTimeBenefitPercent == null || oneTimeBenefitPercent == '') {
                return this.carPrice * 0.20;
            } else if (contractType == 'Stilstand') {
                return this.carPrice * 0;
            } else if (contractType != 'Stilstand' && oneTimeBenefitPercent != null || oneTimeBenefitPercent != '') {
                return this.carPrice * (oneTimeBenefitPercent / 100);
            }
        },

        // Beregn omkostninger ved kontraktoprettelse baseret på kundetype og importstatus
        contractCreation() {
            const customerType = this.receivedValue.customer.customerType;
            const isImport = this.receivedValue.customer.import;
            if (customerType == 'Split' && isImport == true) {
                return 10500 + 12500 + 2500 + (700 * this.contractRunTime);
            } else if (customerType == 'Split') {
                return 12500 + 2500 + (700 * this.contractRunTime);
            } else if (isImport == true){
                return 10500 + 2500;
            } else {
                return 2500;
            }
        },

        // Beregn engangsydelse med omkostninger ved kontraktoprettelse
        oneTimeBenefitWithContractCreation() {
            return (this.oneTimeBenefit + this.contractCreation).toFixed();
        },

        // Beregn bilens afskrivning baseret på afskrivningsprocenten
        carDepreciation() {
            const depreciation = this.receivedValue.contractValues.depreciation;
            if (this.carPrice && depreciation) {
                return Math.round((this.carPrice * (depreciation / 100)));
            } else if (this.carPrice) {
                return Math.round((this.carPrice * 0.15));
            } else {
                // Hvis hverken carPrice eller depreciation er til stede, returner 0 eller en standardværdi.
                return 0;
            }
        },

        // Beregn restværdi af køretøjet
        resValue() {
            return parseInt((this.carPrice - this.carDepreciation).toFixed(2));
        },

        // Beregn stålgevinst eller valutagevinst baseret på importstatus
        steelGainValutaGain() {
            const isImport = this.receivedValue.customer.import;
            const salePrice = this.receivedValue.contractValues.salePrice;
            const cost = this.receivedValue.contractValues.cost;
            if (isImport == true && salePrice && cost) {
                return Math.round((salePrice * 7.46) - (cost * 7.46));
            } else if (isImport == false && salePrice && cost) {
                return salePrice - cost;
            }
        },

        // Pladsholder for beregning af forholdsmæssig afgift
        // Forholdsmæssig afgift retunere 0, i de udregninger vi laver, dog er der andre udregninger som den skal regnes ud.
        proportionateTax() {
            return 0;
        },
 
        // Beregn finansieringsomkostninger
        financing() {
            return Math.round(((this.carPrice + this.proportionateTax - this.oneTimeBenefit - this.deposit) * (this.receivedValue.contractValues.interestRate / 100) / 12) *this.contractRunTime);
        },

        // Beregn månedlig leasingafgift
        monthlyLease() {
            return parseInt((this.proportionateTax + this.contractCreation + this.financing + this.carDepreciation)/this.contractRunTime);
        },

        // Beregn depositumssum
        deposit() {
            return Math.round((this.carPrice + this.proportionateTax) * (this.receivedValue.contractValues.deposit/100));
        },

        // Beregn den samlede kontraktpris
        totalPrice(){
            return Math.round(this.oneTimeBenefit + (this.monthlyLease * this.contractRunTime));
        },

        // Få kontraktens løbetid til brug i forskellige beregninger
        contractRunTime(){
            const runningTime = this.receivedValue.contractValues.runningTime;
            return runningTime;  
        },

        // Beregn beskatningsgrundlag
        taxBase() {
            const customerType = this.receivedValue.customer.customerType;
            const contractType = this.receivedValue.customer.contractType;

            if (customerType == 'Erhverv') {
                if (this.carAge <= 36) {
                    return this.receivedValue.vehicle.initialPrice;
                } else if (this.carAge > 36 && contractType == 'Genleasing') {
                    return this.receivedValue.contractValues.estimatedMarketValue;
                } else if (this.carAge > 36 && contractType == 'Nytegning') {
                    return this.receivedValue.contractValues.salePrice;
                }
            }
        },

        // Beregn omkostninger ved finansiering
        finansCost() {
            return Math.round((this.carPrice * (this.receivedValue.contractValues.interestRate / 100) / 12) * this.contractRunTime);
        },

        // Beregn Indtægter i alt
        earningsTotal() {
            return Math.round(this.contractCreation + this.financing);
        }
    },
    methods: {
        updatePiniaStore() {
            const myStore = useMyStore();
            console.log('Updating Pinia Store:', this.monthlyLease); // Add more log statements as needed
            console.log('Car Price:', this.carPrice);
            console.log('Proportionate Tax:', this.proportionateTax);
            console.log('One Time Benefit:', this.oneTimeBenefit);
            myStore.setCalculationData({
                // Add the relevant data properties that you want to share with ContractPreview.vue
                startDateComp: this.startDateComp,
                carMonths: this.carMonths,
                carAge: this.carAge,
                momsMonth: this.momsMonth,
                carPrice: this.carPrice,
                oneTimeBenefit: this.oneTimeBenefit,
                contractCreation: this.contractCreation,
                oneTimeBenefitWithContractCreation: this.oneTimeBenefitWithContractCreation,
                carDepreciation: this.carDepreciation,
                resValue: this.resValue,
                steelGainValutaGain: this.steelGainValutaGain,
                proportionateTax: this.proportionateTax,
                financing: this.financing,
                monthlyLease: this.monthlyLease,
                deposit: this.deposit,
                totalPrice: this.totalPrice,
                contractRunTime: this.contractRunTime,
                taxBase: this.taxBase,
                finansCost: this.finansCost,
                earningsTotal: this.earningsTotal
            })
        }
    },
    watch: {
        monthlyLease: 'updatePiniaStore',
        oneTimeBenefit: 'updatePiniaStore',
        deposit: 'updatePiniaStore',
        resValue: 'updatePiniaStore',
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
