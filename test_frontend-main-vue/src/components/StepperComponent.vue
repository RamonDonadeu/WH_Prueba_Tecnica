<template>
  <div class="stepper">
      <div class="stepper_stepper_item">
        <div class="stepper_stepper_item_number"
          :class="{ 'stepper_stepper_item_number--completed': currentStep > 1, 'stepper_stepper_item_number--current': currentStep === 1 }">
          <span v-if="currentStep <= 1">1</span>
          <span v-else class="material-symbols-outlined">
            check
          </span>
        </div>
        <div v-if="currentStep === 1" class="stepper_stepper_item_arrow" />
      </div>
      <div class="stepper_stepper_connector"
        :class="{ 'stepper_stepper_connector--completed': currentStep > 1 }"></div>
      <div class="stepper_stepper_item">
        <div class="stepper_stepper_item_number"
          :class="{ 'stepper_stepper_item_number--completed': currentStep > 2, 'stepper_stepper_item_number--current': currentStep === 2 }">
          <span v-if="currentStep <= 2">2</span>
          <span v-else class="material-symbols-outlined">
            check
          </span>
        </div>
      </div>
      <div class="stepper_stepper_connector"
        :class="{ 'stepper_stepper_connector--completed': currentStep > 2 }"></div>
      <div class="stepper_stepper_item">
        <div class="stepper_stepper_item_number"
          :class="{ 'stepper_stepper_item_number--completed': currentStep > 3, 'stepper_stepper_item_number--current': currentStep === 3 }">
          <span v-if="currentStep <= 3">3</span>
          <span v-else class="material-symbols-outlined">
            check
          </span>
        </div>
      </div>
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