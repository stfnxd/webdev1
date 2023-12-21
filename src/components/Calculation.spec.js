import { mount } from "@vue/test-utils";
import Calculation from "../components/Calculation.vue";
import { expect, test } from "vitest";

const wrapper = mount(Calculation);
let mockData = {
        receivedValue: {
            contractValues: {
                salePrice: 25000,
                cost: '',
                estimatedMarketValue: '',
                residualValue: 15000,
                cashPrice: 30000,
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
                startDate: '2023-12-24',
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
                levyPaid: true,
                mileage: '',
            }
        }
}

describe('carPrice', () => {
    test('should have an h2 with text "Beregning"', () => {
        // Assert that the h2 element exists
        expect(wrapper.find('h2').exists()).toBe(true);
    
        // Assert that the text content of the h2 element is "Beregning"
        expect(wrapper.find('h2').text()).toBe('Beregning');
    });

    test('is calculated correctly for Genleasing contract type', () => {
        mockData.receivedValue.customer.contractType = 'Genleasing';

        const wrapper = mount(Calculation, { data: () => mockData });
        const computedValue = wrapper.vm.carPrice;
      
        expect(computedValue).toBe(15000);
    });

    test('is calculated correctly for Pristjek contract type', () => {
        mockData.receivedValue.customer.contractType = 'Pristjek';
      
        const wrapper = mount(Calculation, { data: () => mockData });
        const computedValue = wrapper.vm.carPrice;
      
        expect(computedValue).toBe(30000);
    });

    test('is calculated correctly for Nytegning contract type', () => {
        mockData.receivedValue.customer.contractType = 'Nytegning';
      
        const wrapper = mount(Calculation, { data: () => mockData });
        const computedValue = wrapper.vm.carPrice;
      
        expect(computedValue).toBe(25000);
    });
});

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