<template>
    <button type="submit" :class="'btn btn-' + corBtn">
        {{ title }}
        <slot></slot>
    </button>
</template>

<script setup>
const { title, corBtn } = defineProps({
    title: String,
    corBtn: String
})
</script>