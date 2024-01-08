import { mount } from "@vue/test-utils";
import Calculation from "../components/Calculation.vue";
import { expect, test } from "vitest";

const wrapper = mount(Calculation);
let mockData;

// Sætter mockData.receivedValue til at indeholde tomme strenge før hver test
beforeEach(() => {
    mockData = {
        receivedValue: {
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
        }
    }
})

describe('startDateComp', () => {
    test('should return an Date object', () => {
        mockData.receivedValue.customer.startDate = '2023-12-24';

        const wrapper = mount(Calculation, { data: () => mockData });
        const computedValue = wrapper.vm.startDateComp;
      
        expect(computedValue).toBeInstanceOf(Date);
    });

    test('should return the correct Date object', () => {
        const expectedDate = new Date('2023-12-24T00:00:00.000Z');
    
        mockData.receivedValue.customer.startDate = '2023-12-24';
    
        const wrapper = mount(Calculation, { data: () => mockData });
    
        const computedValue = wrapper.vm.startDateComp;
    
        expect(computedValue).toEqual(expectedDate);
      });
});

describe('carMonths', () => {
    test('should calculate the correct monthsOver36 and monthsUnder36', () => {
        mockData.receivedValue.vehicle.firstRegistrationDate = '2021-12-01';
        mockData.contractRunTime = 36;
        mockData.startDateComp = '2024-04-01';
        
        const wrapper = mount(Calculation, { data: () => mockData });
        

        const computedValue = wrapper.vm.carMonths;
    
        expect(computedValue.monthsOver36).toBe(28);
        expect(computedValue.monthsUnder36).toBe(8);
    });
});

describe('carAge', () => {
    test('should calculate correct car age in months', () => {
        mockData.receivedValue.vehicle.firstRegistrationDate = '2021-06-01';
        mockData.registrationDate  = new Date(mockData.receivedValue.vehicle.firstRegistrationDate);
        mockData.today = new Date('2023-12-01');
        
        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.carAge;

        expect(computedValue).toBe(30);
    });
});

describe('momsMonth', () => {
    test('should calculate correct Moms fradrag i måneden', () => {
        mockData.receivedValue.contractValues.registrationFee = 100000;
        mockData.carMonths = {
            monthsUnder36: 12,
            monthsOver36: 0
        }

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.momsMonth;

        expect(computedValue).toBe((6000).toFixed(2));
    });
});

describe('carPrice', () => {
    test('is calculated correctly for Genleasing contract type', () => {
        mockData.receivedValue.customer.contractType = 'Genleasing';
        mockData.receivedValue.contractValues.cashPrice = 30000;
        mockData.receivedValue.contractValues.residualValue = 15000;
        mockData.receivedValue.contractValues.salePrice = 25000;

        const wrapper = mount(Calculation, { data: () => mockData });
        const computedValue = wrapper.vm.carPrice;
      
        expect(computedValue).toBe(15000);
    });

    test('is calculated correctly for Pristjek contract type', () => {
        mockData.receivedValue.customer.contractType = 'Pristjek';
        mockData.receivedValue.contractValues.cashPrice = 30000;
        mockData.receivedValue.contractValues.residualValue = 15000;
        mockData.receivedValue.contractValues.salePrice = 25000;
      
        const wrapper = mount(Calculation, { data: () => mockData });
        const computedValue = wrapper.vm.carPrice;
      
        expect(computedValue).toBe(30000);
    });

    test('is calculated correctly for Nytegning contract type', () => {
        mockData.receivedValue.customer.contractType = 'Nytegning';
        mockData.receivedValue.contractValues.cashPrice = 30000;
        mockData.receivedValue.contractValues.residualValue = 15000;
        mockData.receivedValue.contractValues.salePrice = 25000;

        const wrapper = mount(Calculation, { data: () => mockData });
        const computedValue = wrapper.vm.carPrice;
      
        expect(computedValue).toBe(25000);
    });
});

describe('oneTimeBenefit', () => {
    test('is calculated correctly when the input field for one time benefit percent is filled out', () => {
        mockData.receivedValue.customer.contractType = 'Nytegning';
        mockData.receivedValue.contractValues.oneTimeBenefit = 25;
        mockData.carPrice = 200000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.oneTimeBenefit;

        expect(computedValue).toBe(50000);
    });

    test('is calculated correctly when the input field for one time benefit percent is not filled out', () => {
        mockData.receivedValue.customer.contractType = 'Nytegning';
        mockData.receivedValue.contractValues.oneTimeBenefit = null;
        mockData.carPrice = 200000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.oneTimeBenefit;

        expect(computedValue).toBe(40000);
    });

    test('is calculated correctly when the input field for one time benefit percent is filled out and contract type is stilstand', () => {
        mockData.receivedValue.customer.contractType = 'Stilstand';
        mockData.receivedValue.contractValues.oneTimeBenefit = 25;
        mockData.carPrice = 200000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.oneTimeBenefit;

        expect(computedValue).toBe(0);
    });

    test('is calculated correctly when the input field for one time benefit percent is not filled out and contract type is stilstand', () => {
        mockData.receivedValue.customer.contractType = 'Stilstand';
        mockData.receivedValue.contractValues.oneTimeBenefit = null;
        mockData.carPrice = 200000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.oneTimeBenefit;

        expect(computedValue).toBe(0);
    });
});

describe('contractCreation', () => {
    test('is calculated correctly for split customer type and import = true', () => {
        mockData.receivedValue.customer.customerType = 'Split';
        mockData.receivedValue.customer.import = true;
        mockData.contractRunTime = 12;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.contractCreation;

        expect(computedValue).toBe(33900);
    });

    test('is calculated correctly for split customer type and import = false', () => {
        mockData.receivedValue.customer.customerType = 'Split';
        mockData.receivedValue.customer.import = false;
        mockData.contractRunTime = 12;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.contractCreation;

        expect(computedValue).toBe(23400);
    });

    test('is calculated correctly for Nytegning customer type and import = true', () => {
        mockData.receivedValue.customer.customerType = 'Nytegning';
        mockData.receivedValue.customer.import = true;
        mockData.contractRunTime = 12;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.contractCreation;

        expect(computedValue).toBe(13000);
    });

    test('is calculated correctly for Nytegning customer type and import = false', () => {
        mockData.receivedValue.customer.customerType = 'Nytegning';
        mockData.receivedValue.customer.import = false;
        mockData.contractRunTime = 12;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.contractCreation;

        expect(computedValue).toBe(2500);
    });
});

describe('oneTimeBenefitWithContractCreation', () => {
    test('is calculated correctly', () => {
        mockData.oneTimeBenefit = 50000;
        mockData.contractCreation = 2500;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.oneTimeBenefitWithContractCreation;

        expect(computedValue).toBe((52500).toFixed());
    });
});

describe('carDepreciation', () => {
    test('is calculated correctly when "afskrivning" is filled', () => {
        mockData.receivedValue.contractValues.depreciation = 20;
        mockData.carPrice = 200000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.carDepreciation;

        expect(computedValue).toBe(40000);
    });

    test('is calculated correctly when "afskrivning" is not filled out', () => {
        mockData.receivedValue.contractValues.depreciation = null;
        mockData.carPrice = 200000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.carDepreciation;

        expect(computedValue).toBe(30000);
    });


    test('is returns 0 when "afskrivning" is not filled out and carPrice is not calculated', () => {
        mockData.receivedValue.contractValues.depreciation = null;
        mockData.carPrice = null;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.carDepreciation;

        expect(computedValue).toBe(0);
    });
});

describe('resValue', () => {
    test('is calculated correctly', () => {
        mockData.carDepreciation = 30000;
        mockData.carPrice = 200000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.resValue;

        expect(computedValue).toBe(170000);
    });
});

describe('steelGainValutaGain', () => {
    test('is calculated correctly when import is false', () => {
        mockData.receivedValue.customer.import = false;
        mockData.receivedValue.contractValues.salePrice = 100000;
        mockData.receivedValue.contractValues.cost = 85000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.steelGainValutaGain;

        expect(computedValue).toBe(15000);
    });

    test('is calculated correctly when import is true', () => {
        mockData.receivedValue.customer.import = true;
        mockData.receivedValue.contractValues.salePrice = 13400;
        mockData.receivedValue.contractValues.cost = 11400;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.steelGainValutaGain;

        expect(computedValue).toBe(14920);
    });
});

describe('financing', () => {
    test('is calculated correctly', () => {
        mockData.contractRunTime = 12;
        mockData.carPrice = 200000;
        mockData.proportionateTax = 0;
        mockData.oneTimeBenefit = 30000;
        mockData.deposit = 20000;
        mockData.receivedValue.contractValues.interestRate = 8.5;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.financing;

        expect(computedValue).toBe(12750);
    });
});

describe('monthlyLease', () => {
    test('is calculated correctly', () => {
        mockData.contractRunTime = 12;
        mockData.carDepreciation = 40000;
        mockData.proportionateTax = 0;
        mockData.financing = 13000;
        mockData.contractCreation = 2500;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.monthlyLease;

        expect(computedValue).toBe(4625);
    });
});

//Den her test fejler, men fungerer korrekt i frontenden
describe('deposit', () => {
    test('is calculated correctly', () => {
        mockData.carPrice = 200000;
        mockData.receivedValue.contractValues.deposit = 20;
        mockData.proportionateTax = 0;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.deposit;

        expect(computedValue).toBe(40000);
    });
});

describe('totalPrice', () => {
    test('is calculated correctly', () => {
        mockData.contractRunTime = 12;
        mockData.monthlyLease = 4000;
        mockData.oneTimeBenefit = 40000;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.totalPrice;

        expect(computedValue).toBe(88000);
    });
});

describe('contractRunTime', () => {
    test('returns the correct runtime for the contract', () => {
        mockData.receivedValue.contractValues.runningTime = 12;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.contractRunTime;

        expect(computedValue).toBe(12);
    });
});

describe('taxBase', () => {
    test('checks if the correct beskatningsgrundlag is returned if the carAge is under 36 months', () => {
        mockData.receivedValue.customer.customerType = 'Erhverv';
        mockData.receivedValue.customer.contractType = 'Genleasing';
        mockData.receivedValue.vehicle.initialPrice = 250000;
        mockData.receivedValue.contractValues.estimatedMarketValue = 200000;
        mockData.receivedValue.contractValues.salePrice = 220000;
        mockData.carAge = 24;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.taxBase;

        expect(computedValue).toBe(250000);
    });
    test('checks if the correct beskatningsgrundlag is returned if contract type is genleasing and carAge is over 36 months', () => {
        mockData.receivedValue.customer.customerType = 'Erhverv';
        mockData.receivedValue.customer.contractType = 'Genleasing';
        mockData.receivedValue.vehicle.initialPrice = 250000;
        mockData.receivedValue.contractValues.estimatedMarketValue = 200000;
        mockData.receivedValue.contractValues.salePrice = 220000;
        mockData.carAge = 40;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.taxBase;

        expect(computedValue).toBe(200000);
    });
    test('checks if the correct beskatningsgrundlag is returned if contract type is nytegning and carAge is over 36 months', () => {
        mockData.receivedValue.customer.customerType = 'Erhverv';
        mockData.receivedValue.customer.contractType = 'Nytegning';
        mockData.receivedValue.vehicle.initialPrice = 250000;
        mockData.receivedValue.contractValues.estimatedMarketValue = 200000;
        mockData.receivedValue.contractValues.salePrice = 220000;
        mockData.carAge = 48;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.taxBase;

        expect(computedValue).toBe(220000);
    });
});

describe('finansCost', () => {
    test('is calculated correctly', () => {
        mockData.receivedValue.contractValues.interestRate = 8.5;
        mockData.carPrice = 240000;
        mockData.contractRunTime = 24;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.finansCost;

        expect(computedValue).toBe(40800);
    });
});

describe('earningsTotal', () => {
    test('is calculated correctly', () => {
        mockData.contractCreation = 13000;
        mockData.financing = 12750;

        const wrapper = mount(Calculation, { data: () => mockData });

        const computedValue = wrapper.vm.earningsTotal;

        expect(computedValue).toBe(25750);
    });
});
