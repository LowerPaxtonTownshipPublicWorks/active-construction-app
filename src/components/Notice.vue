<script setup>

const props = defineProps({
    msg: {
        type: String,
        required: true
    }
})


</script>

<template>
    <calcite-notice open width="full" scale="s" kind="success" icon>
        <div slot="title">{{msg}}</div>
        <div slot="message">Please check again later!</div>
    </calcite-notice>
</template>

<style scoped>

calcite-notice {
  margin-block: 0.5rem;
  margin-block-end: 0.6rem;
}

</style>