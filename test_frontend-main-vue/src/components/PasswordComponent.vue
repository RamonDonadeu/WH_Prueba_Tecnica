<template>
    <div class="password_component">    
        <p>{{ label }}</p>
        <div class="password_input_container">
            <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password" 
                placeholder="Contraseña"
                @input="validatePassword"
            >
            <button type="button" @click="showPassword = !showPassword" class="toggle_button">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>                
                <svg v-else xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
            </button>
        </div>        
        <div class="password_strength_container" v-if="password.length > 0 && !hideStrength">
            <div class="password_strength_bar">
                <div class="password_strength_fill" :style="{ width: strengthPercentage + '%', backgroundColor: strengthColor }"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    hideStrength: {
        type: Boolean,
        default: false
    },
    forceStrength: {
        type: Number,
    },
    forceColor: {
        type: String,
    }
});

const password = ref('');
const showPassword = ref(false);
const passwordStrength = ref(0);

const hasMinLength = computed(() => password.value.length >= 8 && password.value.length <= 24);
const hasNumber = computed(() => /\d/.test(password.value));
const hasUppercase = computed(() => /[A-Z]/.test(password.value));
const isValidPassword = computed(() => hasMinLength.value && hasNumber.value && hasUppercase.value);

const emit = defineEmits(['update:value', 'update:valid']);

const validatePassword = () => {
    calculateStrength();
    emit('update:value', password.value);
    emit('update:valid', isValidPassword.value);
};

const calculateStrength = () => {
    let strength = 0;
    
    const lengthScore = Math.min(password.value.length / 24, 1) * 60;
    strength += lengthScore;
    
    if (hasNumber.value) strength += 20;
    
    if (hasUppercase.value) strength += 20;
    
    passwordStrength.value = Math.min(Math.round(strength), 100);
};

const strengthPercentage = computed(() => {
    if (props.forceStrength) return props.forceStrength;
    if (passwordStrength.value < 33) return 20; 
    if (passwordStrength.value < 66) return 60; 
    return 100; 
});

const strengthColor = computed(() => {
    if (props.forceColor) return props.forceColor;
    if (passwordStrength.value < 33) return '#ff4d4d'; 
    if (passwordStrength.value < 66) return '#ffa64d';
    return '#66cc66'; 
});

</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.password_component {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
    
    p {
        margin-bottom: 0.5rem;
        font-weight: 600;
        font-size: 0.9rem;
    }
}

.password_input_container {
    position: relative;
    display: flex;
    
    input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid #black;
        font-size: 0.9rem;
        padding-right: 5rem;
    }
    
    .toggle_button {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: $dark-green-color;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
    }
}

.password_strength_container {
    position: relative;
    
    .password_strength_bar {
        width: 100%;
        height: 5px;
        background-color: #white;
        overflow: hidden;
        margin-bottom: 0.25rem;
        position: absolute;
        top: -6px;

        .password_strength_fill {
            height: 100%;
            transition: width 0.3s ease, background-color 0.3s ease;
        }
    }
}

</style>