<template>
    <section class="calculation">
        <h1>Calculation component</h1>
        <div>
            <p>Input value for calculation: {{ inputValue }}</p>
            <!-- Perform calculations using inputValue -->
        </div>
    </section>
</template>
  
<script>
export default {
    name: 'Calculation',
    props: {
        inputValue: {
            type: String,
            default: ''
        }
    }
};

console.log(inputValue); 
</script>
   