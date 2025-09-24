<template>
    <Header />
    <Menu />
    <div class="main">
        <NuxtPage />
    </div>
</template>

<style>
.main {
    margin: 100px;
}
</style>

<script lang="js" setup>
import Header from './layouts/Header.vue';
import Menu from './layouts/Menu.vue';
</script>