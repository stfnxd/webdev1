<script setup>
import ContractPreview from '@/components/ContractPreview.vue'
import html2pdf from 'html2pdf.js';
import emailjs from 'emailjs-com';

</script>

<template>
    <main>
        <!-- Tilbage-knap -->
        <router-link :to="{ path: '/' }">
            <button class="backToForm">Tilbage</button>
        </router-link>
        <!-- ContractPreview komponentet indsættes -->
        <section class="contractView">
            <ContractPreview />
        </section>

        <div class="pdf-buttons">
            <!-- Knap til at sende kontrakt til kunden -->
            <button class="makeContract" @click="sendEmail">Send til kunde på mail</button>

            <!-- Knap til at downloade PDF -->
            <button class="makeContract" @click="generatePDF">Download PDF</button>
        </div>
    </main>
</template>

<script>
export default {
    components: {
        ContractPreview
    },
    methods: {
        generatePDF() {
            const element = document.querySelector('.contract-preview');
            element.style.border = "none"
            const opt = {
                margin: [0, 0, 20, 0],
                filename: 'leasing-kontrakt.pdf',
                image: {
                    type: 'png',
                },
            }

            html2pdf().set(opt).from(element).save();
        },
        sendEmail() {
            try {
                const customerName = document.getElementById('customer-name').innerHTML;
                const customerEmail = document.getElementById('customer-email').innerHTML;
                console.log(customerEmail);
                const element = document.querySelector('.contract-preview');
                console.log(element)
                emailjs.send(
                    'service_z016lgr',
                    'template_iknqt4v',
                    { //ServiceID, templateID
                        to_name: customerName,
                        to_email: customerEmail,
                        message: element.outerHTML,
                    }, 'g3KFnI6apFcO6R3TL') //Public key

            } catch (error) {
                console.log({ error })
            }
        },
    }
};

</script>

<style>
main .contractView {
    max-width: 50vw;
    margin: auto;
    text-align: center;
}

main .contractView h1 {
    margin: 30px 0;
}

main .backToForm {
    border: none;
    background-color: transparent;
    font-size: 22px;
    display: flex;
    align-items: center;
}

main .backToForm::before {
    content: url('@/assets/images/icons8-arrow.png');
    transform: scale(.5);
}

main .pdf-buttons {
    display: flex;
    justify-content: center;
    gap: 30px;
}

main .makeContract {
    margin: 50px 0 0 0 !important;
}
</style>