<template>
  <div class="col-lg col-sm-12">
    <label :for="name">{{ label }}</label>
    <input v-bind="$attrs" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type"
      :placeholder="placeholder" class="form-control" />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>