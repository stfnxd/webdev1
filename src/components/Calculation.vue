<template>
    <section class="calculation">
        <h1>Calculation component</h1>
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
  