<script setup>
import ContractPreview from '@/components/ContractPreview.vue'
import html2pdf from 'html2pdf.js';

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