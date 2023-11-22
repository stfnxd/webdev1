<template>
    <section class="calculation col-5">
        <h1>Beregning</h1>
        <div>
            <p>Input value for calculation: {{ receivedValue }}</p>
            <!-- Perform calculations using inputValue -->
        </div>
    </section>
</template>
  
<script>
export default {
    name: 'Calculation',
    props: {
        receivedValue: {
            type: String,
            default: ''
        }
    }
};

</script>
   