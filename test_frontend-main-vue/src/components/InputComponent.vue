<template>
    <div class="input_component">    
        <p>{{ label }}</p>            
        <div class="input_container" :class="validationError ? 'input_container--invalid' : ''">
            <input 
                :maxlength="maxLength"
                type="text" 
                v-model="value" 
                :placeholder="placeholder"
                @input="handleInput"
            >            
        </div>
        <div v-if="maxLength" class="max-length-container"> {{ value.length }} / {{ maxLength }} </div>
        <div v-if="showError" class="error-message">Este campo es obligatorio</div>   
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        required: false
    },
    maxLength: {
        type: Number,
        required: false
    },
    validationError: {
        type: Boolean,
        default: false
    },
    showValidationMessage: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    }
});

const value = ref(props.modelValue);
const touched = ref(false);

watch(() => props.modelValue, (newValue) => {
    value.value = newValue;
});

const showError = computed(() => {
    return props.validationError && !value.value && touched.value;
});

const emit = defineEmits(['update:value', 'update:modelValue', 'update:valid']);

const handleInput = () => {
    emit('update:modelValue', value.value);
};


</script>

<style lang="scss" scoped>
@import '../styles/base.scss';

.input_component {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
    
    p {
        margin-bottom: 0.5rem;
        font-weight: 600;
        font-size: 0.9rem;
        
        .required-asterisk {
            color: #ff4d4d;
            margin-left: 2px;
        }
    }
}

.input_container {
    position: relative;
    display: flex;
    
    input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid black;
        font-size: 0.9rem;
        padding-right: 5rem;
        transition: border-color 0.2s ease;
        
        &:focus {
            outline: none;
            border-color: $dark-green-color;
        }
    }

    &.input_container--invalid {
        input {
            decoration: none;
            border-color: #ff4d4d;
            background-color: rgba(255, 77, 77, 0.05);
        }
    }
}

.max-length-container {
    display: flex;
    justify-content: flex-end;
    color: gray;
    font-size: 0.8rem;
    margin-top: 0.25rem;
}

.error-message {
    color: #ff4d4d;
    font-size: 0.8rem;
    margin-top: 0.25rem;
}
</style>