<template>
    <div class="col-lg col-sm-12">
        <label :for="tipo" class="form-label">{{ title }}</label>
        <input :type="valor" class="form-control" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
    </div>
</template>

<script setup>
const { title, tipo, valor } = defineProps({
    title: String,
    tipo: String,
    modelValue: String,
})
</script>