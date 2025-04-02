<template>
    <div class="step_three_container">
        <img src="../assets/img/success.png">
        <div>
            <p class="bold">Usuario creado correctamente</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/base.scss';

.step_three_container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 100%;
    img{
        margin-right: 2rem;
    }
    p{
        margin-top: 1rem;

        &.bold{
            font-weight: bold;
        }
    }
}
</style>