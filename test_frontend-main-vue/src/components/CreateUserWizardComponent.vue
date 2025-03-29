<template>
    <div class="createUserWizard_container">
        <StepperComponent :numberOfSteps="3" :currentStep="currentStep" />
        <div class="createUserWizard_content">
            <h1 :style="{marginTop: '0rem'}">Test frontend Wheel Hub</h1>
            <div class="createUserWizard_stepContent">
                <StepOne v-if="currentStep === 1" @checkbox-updated="(evt) => {
                    disableNextButton = !evt;
                }" />
            </div>
            <div class="createUserWizard_separator"></div>
            <div class="createUserWizard_buttons">
                <button v-if="currentStep !== 3" class="createUserWizard_button--next" :disabled="disableNextButton" @click="nextStep">
                    <span>Siguiente</span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z"/></svg>                </button>
                    <button v-if="currentStep === 3" class="createUserWizard_button--backToHome" @click="backToHome">Volver a Inicio</button>
                    <button v-if="currentStep !== 1" class="createUserWizard_button--back" @click="prevStep">Atras</button>
                </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import StepperComponent from './StepperComponent.vue';
import StepOne from './StepOne.vue';
const currentStep = ref<number>(1);
const disableNextButton = ref<boolean>(true);

const nextStep = () => {
    if(disableNextButton.value) return;
    if (currentStep.value < 3) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const backToHome = () => {
    currentStep.value = 1;
}

</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
.createUserWizard_container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden; /* Prevent any content from exceeding container */
}

.createUserWizard_content {
    max-width: 800px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 75px - 4rem); /* 75px for stepper, 4rem for margins */
    width: 100%;
    overflow-y: auto; /* Enable scrolling if content exceeds available height */

    h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 2rem;
    }

    h1::after {
        content: '';
        display: block;
        width: 5%;
        height: 5px;
        background-color: $green-color;
    }
}

.createUserWizard_separator::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: $step-color;
    margin: 1rem 0;
}
.createUserWizard_buttons{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    margin-top: auto; /* Push buttons to bottom */
    padding-top: 1rem; /* Add some space above buttons */
}
.createUserWizard_stepContent{
    flex: 1;
    overflow-y: auto; /* Enable scrolling if content exceeds available height */
    min-height: 0; /* Required for Firefox */
}
.createUserWizard_button--back{
    color: $step-color;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
.createUserWizard_button--next{
    background-color: $dark-green-color;
    color: $white;
    padding: 10px 10px;
    border: none;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;

    &:disabled {
        background-color: $step-color;
        cursor: not-allowed;
    }
}
.createUserWizard_button--backToHome{
    color: $black;
    font-weight: 600;
    border: none;
    background-color: transparent;
    cursor: pointer;
}
</style>