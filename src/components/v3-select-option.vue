<script setup>
import {defineProps, defineEmits} from 'vue';

defineEmits(['trigger']);

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number, Array],
    required: true
  }
});

const cssClass = computed(() => {
  console.log('modelValue', modelValue, props.value);
  return {
    selected: modelValue === props.value || (modelValue instanceof Array && modelValue.includes(props.value))
  };
});
</script>

<template>
  <div v-if="value instanceof Array > 0" class="v3-select-option-group">
    <div class="v3-select-option-group-label" v-text="label"></div>
    <v3-select-option v-for="child in value" v-bind="child"/>
  </div>
  <div v-else class="v3-select-option" :class="cssClass" v-text="label"
       @click="$emit('trigger', value)"></div>
</template>
