<template>
    <div class="step_container">
        <div class="step_content">
            <InputComponent label="Crea tu usuario" v-model="formData.username" placeholder="Introduce tu usuario"
                @update:model-value="(val: string) => {
                    formData.username = val;
                }" />
            <div class="password_container">
                <PasswordComponent label="Crea tu contraseña" v-model="formData.password" @update:value="(val: string) => {
                    console.log(val);
                    formData.password = val;
                }"
                @update:valid="(val: boolean) => {
                    isPasswordValid = val;
                }" />
                <PasswordComponent label="Repite tu contraseña" v-model="formData.confirmPassword" @update:value="(val: string) => {
                    formData.confirmPassword = val;
                }" :forceStrength="formData.password === formData.confirmPassword ? 100 : 1"
                    :forceColor="formData.password === formData.confirmPassword ? '#66cc66' : '#ff4d4d'" 
                    @update:valid="(val: boolean) => {
                        isConfirmPasswordValid = val;
                    }" />
            </div>
            <InputComponent label="Crea tu pista para recordar tu contraseña (Opcional)" v-model="formData.passwordHint"
                placeholder="Introduce tu pista" :hint="'texto de ayuda'" :maxLength="60" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PasswordComponent from './PasswordComponent.vue';
import InputComponent from './InputComponent.vue';

const emit = defineEmits(['submit-form']);
const formData = ref({
    username: '',
    password: '',
    confirmPassword: '',
    passwordHint: ''
});

watch(formData, (newVal) => {
    emit('submit-form', newVal);
}, { deep: true });

const isPasswordValid = ref(false);
const isConfirmPasswordValid = ref(false);

const validateForm = () => {
    return formData.value.username !== '' && formData.value.password !== '' && formData.value.confirmPassword !== '';
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.step_container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
}

.step_content {
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.password_container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
}
</style>