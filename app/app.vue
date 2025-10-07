<template>
    <div v-if="isLoggedIn">
        <NuxtLayout>
            <Header />
            <Menu />
        </NuxtLayout>
        <div class="main">
            <NuxtPage />
        </div>
    </div>

    <div v-else>
        <Login />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Header from './layouts/Header.vue';
import Menu from './layouts/Menu.vue';
import Login from './pages/login.vue';

// Aqui você pode usar o `useState()` ou outro mecanismo para verificar se o usuário está logado
// Exemplo simples com uma variável local:
const isLoggedIn = ref(true);

// A lógica para verificar se o usuário está logado pode ser baseada em um cookie, token, ou outro método
// Aqui, estamos apenas simulando o estado de login. Altere conforme necessário.
</script>

<style>
.main {
    margin: 100px;
}
</style>
