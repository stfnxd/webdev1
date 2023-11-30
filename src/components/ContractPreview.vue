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
                    <td>Privat</td>
                </tr>

                <tr>
                    <td>Navn</td>
                    <td>{{ receivedData.name }}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{{ receivedData.email }}</td>
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
    }

    .contract-preview table tr td:last-of-type {
        text-align: right;
    }

</style>
   