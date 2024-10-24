<script setup>
import V3Select from './components/v3-select.vue'

let options = [
  {value: 'male', label: 'Male'},
  {value: 'female', label: 'Female'}
];
</script>

<template>
  <v3-select :options="options"/>
</template>
