<template>
    <div class="createUserWizard_container">
        <StepperComponent :numberOfSteps="3" :currentStep="currentStep" />
        <div class="createUserWizard_content">
            <h1 :style="{marginTop: '0rem'}">Test frontend Wheel Hub</h1>
            <div class="createUserWizard_stepContent">
                <StepOne v-if="currentStep === 1" @checkbox-updated="handleCheckboxUpdate" />
                <StepTwo v-if="currentStep === 2" @submit-form="handleSubmitForm" />
                <StepThree v-if="currentStep === 3" />
            </div>
            <div class="createUserWizard_separator"></div>
            <div class="createUserWizard_buttons">
                <button v-if="currentStep !== 3" class="createUserWizard_button--next" :disabled="disableNextButton || isLoading" @click="nextStep">
                    <span>Siguiente</span>
                    <div v-if="isLoading" class="createUserWizard_button--next_spinner"></div>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z"/></svg>               
                </button>
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
import StepTwo from './StepTwo.vue';
import StepThree from './StepThree.vue';
const currentStep = ref<number>(1);
const disableNextButton = ref<boolean>(true);
const isLoading = ref<boolean>(false);
import axios from 'axios';
const handleCheckboxUpdate = (value: boolean) => {
    disableNextButton.value = !value;
};

const nextStep = () => {
    if(disableNextButton.value) return;
    if(currentStep.value === 2){
        isLoading.value = true;
        createUser();
        return;
    }
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
    disableNextButton.value = true;
}

const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    passwordHint: ''
});

const handleSubmitForm = (form: any) => {
    formData.value = form;
}

const createUser = () => {
    axios.post('http://localhost:8080/api/user/create', formData.value)
    .then((response) => {
        currentStep.value++;
    })
    .catch((error) => {
        console.log(error);
    }).finally(() => {
        isLoading.value = false;
    })
}

</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
.createUserWizard_container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden; 
}

.createUserWizard_content {
    max-width: 800px;
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 75px - 4rem); /* 75px for stepper, 4rem for margins */
    width: 100%;
    overflow-y: auto; 

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
    margin-top: auto;
    padding-top: 1rem; 
}
.createUserWizard_stepContent{
    flex: 1;
    overflow-y: auto; 
    min-height: 0; 
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

.createUserWizard_button--next_spinner{
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid $white;
    border-top: 2px solid $dark-green-color;
    border-radius: 50%;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

</style>