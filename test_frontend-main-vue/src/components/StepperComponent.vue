<template>
  <div class="stepper">
    <template v-for="step in numberOfSteps" :key="step">
      <!-- Step item -->
      <div class="stepper_stepper_item">
        <div class="stepper_stepper_item_number"
          :class="{ 
            'stepper_stepper_item_number--completed': currentStep > step, 
            'stepper_stepper_item_number--current': currentStep === step 
          }">
          <span v-if="currentStep <= step">{{ step }}</span>
          <span v-else class="material-symbols-outlined">
            check
          </span>
        </div>
        <div v-if="currentStep === step" class="stepper_stepper_item_arrow" />
      </div>
      
      <!-- Connector (only if not the last step) -->
      <div v-if="step < numberOfSteps" class="stepper_stepper_connector"
        :class="{ 'stepper_stepper_connector--completed': currentStep > step }">
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  numberOfSteps: number;
  currentStep: number;
}>();

defineEmits(['update:currentStep']);
</script>

<style lang="scss">
@import '../styles/StepperComponent.scss';
</style>