<script setup>
import {defineProps, defineEmits, computed, inject} from 'vue';

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

const modelValue = inject('modelValue');

const cssClass = computed(() => {
  return {
    selected: modelValue.value === props.value
        || (Array.isArray(modelValue.value) && modelValue.value.includes(props.value))
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
