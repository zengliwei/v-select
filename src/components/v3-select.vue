<script>
import {reactive, toRaw, nextTick} from 'vue';
import V3SelectOption from './v3-select-option.vue';

/*
 * In case we need to handle expanded state of all instances of the component,
 * a global variable is needed.
 * So we have to use <script> with an export method instead of <script setup>.
 */
const globalInstances = reactive([]);

export default {
  components: {
    V3SelectOption
  },

  emits: ['update:modelValue'],

  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: [String, Number, Array]
    },
    filterable: {
      type: Boolean,
      default: false
    },
    i18nSearch: {
      type: String,
      default: 'Search'
    }
  },

  data: function () {
    return {
      expanded: false
    };
  },

  methods: {
    triggerValue: function (value) {
      let modelValue = toRaw(this.modelValue);
      if (this.multiple) {
        if (Array.isArray(modelValue)) {
          const index = modelValue.indexOf(value);
          if (index > -1) {
            modelValue.splice(index, 1);
          } else {
            modelValue.push(value);
          }
        } else {
          modelValue = [value];
        }
      } else {
        modelValue = value;
      }
      this.$emit('update:modelValue', modelValue);
    },

    expandOptBox: function () {
      if (this.expanded) {
        this.expanded = false;
      } else {
        this.expanded = true;
        nextTick(() => {
          let rectEl = this.$refs['el-container'].getBoundingClientRect(),
              rectOpt = this.$refs['option-box'].getBoundingClientRect();
          this.$refs['option-box'].style.minWidth = rectEl.width + 'px';
          if (rectEl.left + rectOpt.width <= window.innerWidth) {
            this.$refs['option-box'].style.left = rectEl.left + 'px';
          } else {
            this.$refs['option-box'].style.left = window.innerWidth - rectOpt.width + 'px';
          }
          if (rectEl.top + rectOpt.height <= window.innerHeight) {
            this.$refs['option-box'].style.top = rectEl.top + rectEl.height + 'px';
          } else {
            this.$refs['option-box'].style.top = rectEl.top - rectOpt.height + 'px';
          }
        });
      }
    },

    docClickListener: function (evt) {
      if (this.$refs['el-container'].contains(evt.target)) {
        return;
      }
      this.expanded = false;
    }
  },

  mounted: function () {
    globalInstances.push(this);
    document.addEventListener('click', this.docClickListener);
  },

  unmounted: function () {
    globalInstances.splice(globalInstances.indexOf(this), 1);
    document.removeEventListener('click', this.docClickListener);
  }
}
</script>

<template>
  <div class="v3-select" ref="el-container">
    <div class="v3-select-value-box" @click="expandOptBox">
      <div class="v3-select-value-label">
        <div v-if="multiple" class="v3-select-value-container">
          <div v-for="value in modelValue" class="v3-select-value">
            <span v-text="value"></span>
            <span @click="triggerValue(value)">x</span>
          </div>
        </div>
        <div v-else v-text="modelValue"></div>
      </div>
      <div class="v3-select-value-arrow" :class="{expanded: expanded}"></div>
    </div>
    <teleport to="body">
      <transition name="v3-select-transition">
        <div v-if="expanded" class="v3-select-option-box" ref="option-box">
          <div v-if="filterable" class="v3-select-filter">
            <input type="text" :placeholder="i18nSearch"/>
          </div>
          <v3-select-option
              v-for="option in options"
              v-bind="option" @trigger="triggerValue"/>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style>
:root {
  --v3-select-height: 2rem;
  --v3-select-min-width: 10rem;
  --v3-select-max-width: 100%;
  --v3-select-box-border-color: #DCDFE6;
  --v3-select-box-border-radius: 3px;
  --v3-select-value-arrow-bg-url: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>');
  --v3-select-value-arrow-height: 1rem;
  --v3-select-option-group-padding: 0.5rem;
  --v3-select-option-bg-color: #fff;
  --v3-select-option-font-size: .8125rem;
  --v3-select-option-line-height: 1.5rem;
  --v3-select-option-padding: 0.5rem;
  --v3-select-option-hover-bg-color: #F5F7FA;
  --v3-select-option-selected-bg-color: #E6F7FF;
}

.v3-select * {
  box-sizing: border-box;
  outline: none;
}

.v3-select-value-box {
  border: 1px solid var(--v3-select-box-border-color);
  border-radius: var(--v3-select-box-border-radius);
  cursor: pointer;
  display: flex;
  height: var(--v3-select-height);
  max-width: var(--v3-select-max-width);
  min-width: var(--v3-select-min-width);
}

.v3-select-value-label {
  flex: 1 1 auto;
}

.v3-select-value-container {
  display: flex;
  flex-wrap: wrap;
}

.v3-select-value {
}

.v3-select-value-arrow {
  background: var(--v3-select-value-arrow-bg-url) no-repeat center;
  background-size: var(--v3-select-value-arrow-height) var(--v3-select-value-arrow-height);
  flex: 0 0 auto;
  height: var(--v3-select-height);
  width: var(--v3-select-height);
}

.v3-select-value-arrow.expanded {
}

.v3-select-option-box {
  border: 1px solid var(--v3-select-box-border-color);
  border-radius: var(--v3-select-box-border-radius);
  box-sizing: border-box;
  min-width: var(--v3-select-min-width);
  overflow: auto;
  position: fixed;
  z-index: 99999;
}

.v3-select-option-box * {
  box-sizing: border-box;
}

.v3-select-option-group {
  padding: var(--v3-select-option-group-padding);
}

.v3-select-option {
  background: var(--v3-select-option-bg-color);
  font-size: var(--v3-select-option-font-size);
  line-height: var(--v3-select-option-line-height);
  padding: var(--v3-select-option-padding);
}

.v3-select-option:hover {
  background: var(--v3-select-option-hover-bg-color);
}

.v3-select-option.selected {
  background: var(--v3-select-option-selected-bg-color);
}
</style>
