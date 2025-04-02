<template>
    <div class="step_container">
        <img src="../assets/img/Logotipo-Vertical-Verde-Alta.png" alt="logo" class="step_logo">
        <div class="step_content">
            <span style="font-weight: bold;">¿Qué deberá realizar?</span>
            <p>En la primera pestaña, debeá confirmar que es mayor de edad y que acepta el tratamiento de sus datos según la política de datos vigentes.</p>
            <p>En la segunda pestaña deberá crear un usuario, una contraseña y una pista para recordar la contraseña (como dato opcional).</p>
            <p>En tercer lugar, deberá visualizarse el mensaje de éxito de creación.</p>
            <div class="step_container_checkbox_container">
                <input type="checkbox" id="checkbox" class="step_container_checkbox" v-model="checkboxValue" @change="$emit('checkbox-updated', checkboxValue)">
                <label for="checkbox">Confirma que es mayor de edad, y acepta el tratamiento de sus datos según la política de protección de datos vigente.</label>
            </div>
            
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checkboxValue = ref(false);

</script>
<style lang="scss" scoped>
@import '../styles/base.scss';

.step_container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 1rem;
    justify-content: center;
    align-items: center;
}

.step_logo {
    max-width: 200px;
    margin-bottom: 1.5rem;
    max-height: 100px;
    min-height: 100px;
}

.step_content {
    overflow: auto;
    display: flex;
    flex-direction: column;

    span {
        display: block;
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }
    
    p {
        margin: 0.5rem 0;
        line-height: 1.5;
    }
}

.step_container_checkbox_container {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 1rem;    
    cursor: pointer;
    
    input[type="checkbox"] {
        margin-top: 0.2rem;
        border-radius: 0px;
    }
}
</style>

