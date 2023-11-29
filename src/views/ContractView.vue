<script setup>
import ContractPreview from '@/components/ContractPreview.vue'
</script>

<template>
    <main>
        <router-link :to="{ path: '/' }">
            <button class="backToForm">Tilbage</button>
        </router-link>
        <section class="contractView">
        
            <h1>Tadaaaaa!!!</h1>
            <ContractPreview />
        </section>
        <button class="makeContract">Send til kunde på mail</button>
    </main>
</template>

<script>
export default {
    components: {
        ContractPreview
    },
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
</style>