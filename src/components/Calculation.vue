<template>
    <section class="calculation col-7">
        <!-- TODO: Gennemgå navne og computed properties. -->
        <h2>Beregning</h2>
        <div>
            <p>Input value for calculation: {{ monthlyLease }}</p>
        </div>

        <table>
            <tr>
                <th>Overblik leasingtilbud</th>
                <th v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">Inkl. moms</th>
                <th>Ekskl. moms</th>
            </tr>

            <tr v-show="receivedValue.customer.customerType == 'Split'">
                <td><b>Leasingydelse - erhverv</b></td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'"></td>
                <td></td>
            </tr>

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
            
            <tr v-show="receivedValue.customer.customerType == 'Split'">
                <td>Månedlig leasing</td>
                <td v-show="receivedValue.customer.customerType == 'Privat'  || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.customer.customerType == 'Split'">
                <td><b>Leasingydelse - privat</b></td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'"></td>
                <td></td>
            </tr>

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

            <tr>
                <td>Månedlig leasing</td>
                <td v-if="monthlyLease" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">{{ monthlyLease }} kr.</td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td v-if="monthlyLease">{{ monthlyLease }} kr.</td>
                <td v-else>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Totalpris i leasingperiode</b></td>
                <td v-if="totalPrice" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">{{ totalPrice }} kr.</td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td v-if="totalPrice">{{ totalPrice }} kr.</td>
                <td v-else>VÆRDI</td>

            </tr>

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
 
            <tr>
                <td>Depositum</td>
                <td v-if="deposit" v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">{{ deposit }} kr.</td>
                <td v-else v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td v-if="deposit">{{ deposit }} kr.</td>
                <td v-else>VÆRDI</td>
            </tr>

            <tr>
                <td>Forsikring pr. md. inkl. vejhjælp (moms fri)</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">0</td>
                <td>0</td>
            </tr>

            <tr>
                <td>Tilbud om friskadedækning</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>Selvrisiko</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.customer.customerType == 'Erhverv'">
                <td>Beskatningsgrundlag</td>
                <td v-show="receivedValue.customer.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.customer.customerType == 'Erhverv'">
                <td>Momsfradrag pr. måned</td>
                <td v-show="receivedValue.customer.customerType == 'Privat'">VÆRDI</td>
                <td>VÆRDI</td>
            </tr>

            <tr>
                <td>GPS-tracker inkl. abonnement og montering</td>
                <td v-show="receivedValue.customer.customerType == 'Privat' || receivedValue.customer.customerType == 'Split'">VÆRDI</td>
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
                <td v-if="receivedValue.contractValues.contractCreation">{{ receivedValue.contractValues.contractCreation }}</td>
                <td v-else>{{ contractCreation }} kr.</td>
            </tr>

            <tr>
                <td>Finansiering</td>
                <td v-if="receivedValue.contractValues.interestRate">{{ receivedValue.contractValues.interestRate }}</td>
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
                <td v-if="receivedValue.contractValues.interestRate && receivedValue.contractValues.runningTime">{{ (100 * (100 - receivedValue.contractValues.interestRate) / 12) * receivedValue.contractValues.runningTime }}</td>
                <td v-else>VÆRDI</td>
            </tr>

            <tr>
                <td><b>Dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>
            
            <tr v-show="receivedValue.customer.contractType == 'Nytegning' || receivedValue.customer.import == true">
                <td>Stålgevinst/valutakursgevinst</td>
                <td v-if="steelGainValutaGain">{{ steelGainValutaGain }}</td>
                <td v-else>VÆRDI</td>
            </tr>

            <tr v-show="receivedValue.customer.contractType == 'Nytegning' || receivedValue.customer.import == true">
                <td><b>Samlet dækningsbidrag</b></td>
                <td>VÆRDI</td>
            </tr>

        </table>


        <table v-show="receivedValue.customer.contractType == 'Stilstand' || receivedValue.vehicle.levyPaid == true">
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
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'Calculation',
    props: {
        receivedValue: {
            type: Object,
            default: () => ({
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

    computed: {
        // Bruges til at udregne måneder mellem start og slut dato
        startDateComp() {
            const startDate = this.receivedValue.customer.startDate;
            const contractStartDate = new Date(startDate);
            
            return contractStartDate;

        },
        // contractEndDate() {
        //     const contractEndDate = new Date(this.startDateComp);

        //     contractEndDate.setMonth(contractEndDate.getMonth() + this.contractRunTime);
        //     const formattedDate = contractEndDate.toLocaleDateString();

        //     return formattedDate;
        // },
        carMonths() {
            const start = new Date(this.receivedValue.vehicle.firstRegistrationDate);

            const contractStart = new Date(this.startDateComp);

            // Calculate the number of months from the vehicle's first registration date to the contract start date
            const monthsBeforeContract = (contractStart.getFullYear() - start.getFullYear()) * 12 + contractStart.getMonth() - start.getMonth();

            // Calculate the contract end date
            const end = new Date(contractStart);
            end.setMonth(end.getMonth() + this.contractRunTime);

            // Calculate the number of months from the vehicle's first registration date to the contract end date
            const vehicleAgeAtContractEnd = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();

            // Calculate the number of months over and under 36 months during the contract
            const monthsOver36 = Math.max(0, vehicleAgeAtContractEnd - Math.min(vehicleAgeAtContractEnd, 36));
            const monthsUnder36 = Math.max(0, Math.min(vehicleAgeAtContractEnd, 36 - monthsBeforeContract));

            return {
                monthsBeforeContract,
                monthsOver36,
                monthsUnder36,
                vehicleAgeAtContractEnd
            };
        },
        carAge() {
            const registrationDate  = new Date(this.receivedValue.vehicle.firstRegistrationDate);
            const today = new Date();

            return (today.getFullYear() - registrationDate.getFullYear()) * 12 + today.getMonth() - registrationDate.getMonth();
        },

        //Moms fradrag i måneden 
        // Momsfradrag pr. måned = 0.25 * Anslået registreringsafgift * (0.02 * Antal måneder under 36 måneder + 0.01 * Antal måneder over eller lig med 36 måneder)
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

        // Bilens pris
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

        // Engangsydelse
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

        // Kontrakt oprettelse
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

        // Engangsydelse + kontrakt oprettelse
        oneTimeBenefitWithContractCreation() {
            return (this.oneTimeBenefit + this.contractCreation).toFixed();

        },

        // Bilens afskrivning
        carDepreciation() {
            const depreciation = this.receivedValue.contractValues.depreciation;
            if (this.carPrice && depreciation) {
                return (this.carPrice * (depreciation / 100));
            } else if (this.carPrice) {
                return (this.carPrice * 0.15);
            } else {
                // Hvis hverken carPrice eller depreciation er til stede, returner 0 eller en standardværdi.
                return 0; // Du kan ændre dette til en anden standardværdi, hvis det er passende.
            }
        },

        // Restværdi
        resValue() {
                return parseInt((this.carPrice - this.carDepreciation).toFixed(2));

        },
        // Stål gevinst og Valuta gevinst
        steelGainValutaGain() {
            const isImport = this.receivedValue.customer.import;
            const salePrice = this.receivedValue.contractValues.salePrice;
            const cost = this.receivedValue.contractValues.cost;
            if (isImport == true && salePrice && cost) {
                return (salePrice * 7.46) - (cost * 7.46);
            } else if (isImport == false && salePrice && cost) {
                return salePrice - cost;
            }
        },

        // Forholdsmæssig afgift
        // TODO: kig på at lave udregning af forholdsmæssig afgift
        proportionateTax() {
            return 0;
        },
 
        // Finansering
        financing() {
                return parseInt(((this.carPrice + this.proportionateTax - this.oneTimeBenefit - this.deposit) *
          (this.receivedValue.contractValues.interestRate / 100) / 12 /this.contractRunTime).toFixed(2));

        },

        // Månedeligleasing ydelse
        monthlyLease() {
            return parseInt((this.proportionateTax + this.contractCreation + this.financing + this.carDepreciation)/this.contractRunTime);
                
            
        },

        // Depositum
        deposit() {
            let deposit = (this.carPrice + this.proportionateTax) * (this.receivedValue.contractValues.deposit/100)

            if(this.carPrice && this.receivedValue.contractValues.deposit){
                return  deposit.toFixed(2);
            }else{
                return deposit;
            }
            
        },

        // Total prisen
        totalPrice(){
                return this.oneTimeBenefit + (this.monthlyLease * this.contractRunTime);
            
        },

        // Kontraktens løbetid (Lavet for at gøre koden kortere, da den bruges flere gange)
        contractRunTime(){
            const runningTime = this.receivedValue.contractValues.runningTime;
            return runningTime;
                
        },
        // Beskatningsgrundlag
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

        // Omkostning - Finansiering
        // Finansieringsomkostning = (Bilens totalpris * Finansieringsrente / 12) * Kontraktens løbetid
        // TODO: Finanseringsrente????????
        finansCost() {
            return (this.carPrice * finanseringsrente / 12) * this.contractRunTime;
        },
        
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