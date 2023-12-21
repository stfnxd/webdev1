import {mount} from "@vue/test-utils";
import Calculation from "../components/Calculation.vue";
import { expect, test } from "vitest";

const wrapper = mount(Calculation);

describe('Calculation', () => {
    test('Calculation should have an h2 with text "Beregning"', () => {
        // Assert that the h2 element exists
        expect(wrapper.find('h2').exists()).toBe(true);
    
        // Assert that the text content of the h2 element is "Beregning"
        expect(wrapper.find('h2').text()).toBe('Beregning');
    });

    test('computed property carPrice is calculated correctly for Genleasing contract type', () => {
        // Create a new Vue instance with the desired data
        const mockData = {
          receivedValue: {
            customer: {
              contractType: 'Genleasing',
            },
            contractValues: {
              cashPrice: 30000,
              residualValue: 15000,
              salePrice: 25000,
            },
            vehicle: {
                levyPaid: true
            }
          },
        };
      
        // Mount the component with the mocked Vue instance
        const wrapper = mount(Calculation, { data: () => mockData });
      
        // Access the computed property
        const computedValue = wrapper.vm.carPrice;
      
        // Assert the result for Genleasing contract type
        expect(computedValue).toBe(15000); // Adjust the expected value based on your computation
    });
    test('computed property carPrice is calculated correctly for Pristjek contract type', () => {
        // Create a new Vue instance with the desired data
        const mockData = {
          receivedValue: {
            customer: {
              contractType: 'Pristjek',
            },
            contractValues: {
              cashPrice: 30000,
              residualValue: 15000,
              salePrice: 25000,
            },
            vehicle: {
                levyPaid: true
            }
          },
        };
      
        // Mount the component with the mocked Vue instance
        const wrapper = mount(Calculation, { data: () => mockData });
      
        // Access the computed property
        const computedValue = wrapper.vm.carPrice;
      
        // Assert the result for Genleasing contract type
        expect(computedValue).toBe(30000); // Adjust the expected value based on your computation
    });
    test('computed property carPrice is calculated correctly for Nytegning contract type', () => {
        // Create a new Vue instance with the desired data
        const mockData = {
          receivedValue: {
            customer: {
              contractType: 'Nytegning',
            },
            contractValues: {
              cashPrice: 30000,
              residualValue: 15000,
              salePrice: 25000,
            },
            vehicle: {
                levyPaid: true
            }
          },
        };
      
        // Mount the component with the mocked Vue instance
        const wrapper = mount(Calculation, { data: () => mockData });
      
        // Access the computed property
        const computedValue = wrapper.vm.carPrice;
      
        // Assert the result for Genleasing contract type
        expect(computedValue).toBe(25000); // Adjust the expected value based on your computation
    });
});