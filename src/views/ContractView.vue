<script setup>
import ContractPreview from '@/components/ContractPreview.vue'
</script>

<template>
    <main>
        <section class="charlotte">
            <h1>Tadaaaaa</h1>
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
main .charlotte {
    max-width: 50vw;
    margin: auto;
    text-align: center;
}

main .charlotte h1{
    margin: 30px 0; 
}

</style>