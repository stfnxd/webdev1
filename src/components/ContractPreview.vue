<template>
    <section class="contract-preview">
        
        <div class="contract-header">
            <div class="image">
                <img alt="Vue logo" class="logo" src="@/assets/images/logo-black.png"/>
            </div>
            
            <div>
                <p>EASY-LEASE A/S</p>
                <p>Vestre Havnepromenade 5</p>
                <p>9000 Aalborg</p>
                <p>Telefon: +45 70 20 09 97</p>
                <p>CVR: 36036761</p>
                <p>E-mail: kontakt@easy-lease.dk</p>
            </div>
        </div>

        <div>
            <h1>Kontrakt</h1>

            <h4>Leasingtager</h4>
            <table>
                <tr>
                    <td>Kundetype</td>
                    <td>{{ receivedData.customerType }}</td>
                </tr>

                <tr>
                    <td>Navn</td>
                    <td>{{ receivedData.name }}</td>
                </tr>
                <tr>
                    <td>Tilbudsdato</td>
                    <td>dato</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{{ receivedData.email }}</td>
                </tr>
            </table>
            <h4>Køretøj</h4>
            <table>
                <tr>
                    <td>Fuld afgift betalt</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Momsdød</td>
                    <td>{{ receivedData.name }}</td>
                </tr>
                <tr>
                    <td>Første indregistreringsdato</td>
                    <td>dato</td>
                </tr>
                <tr>
                    <td>Nypris inkl. moms og afgift</td>
                    <td>{{ receivedData.name }}</td>
                </tr>
            </table>

            <h4>Økonomi</h4>
            <table>
                <tr>
                    <td>Købspris af forhandler ex. moms</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Løbetid</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Aktivperiode i kontaktensløbetid</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Skønnet afgiftsmæssig handelsvis inkl. moms og afgift</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Anslået registreringsafgift</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Provision ex. moms</td>
                    <td>{{ receivedData.name }}</td>
                </tr>
            </table>


            <h4>Beregning</h4>
            <table>
                <tr>
                    <td>Engangsydelse, ex. moms. (Min 20% - Max. 30%)</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Depositum ex. moms</td>
                    <td>{{ receivedData.name }}</td>
                </tr>

                <tr>
                    <td>Afskrivning</td>
                    <td>{{ receivedData.name }}</td>
                </tr>
            </table>
        </div>
        
    </section>
</template>
  
<script>
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
});

</script>

<style>
    .contract-preview {
        border: 1px solid var(--black-color); 
        text-align: left;
        padding: 50px 70px; 
    }

    .contract-preview h1{
    margin-top: 30px; 
    }

    .contract-preview p {
        margin-bottom: 0; 
    }

    .contract-preview .contract-header {
        display: flex; 
        justify-content: space-between;
    }

    .contract-preview .contract-header div:last-of-type {
        text-align: right;
    }

    .contract-preview table {
        width: 100%; 
        margin-bottom: 30px; 
    }

    .contract-preview table tr td {
        padding: 5px 0; 
    }

    .contract-preview table tr td:last-of-type {
        text-align: right;
    }

</style>
   