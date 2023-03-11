<template>
  <div class="h-8 relative rounded-lg border border-slate-500 overflow-hidden">
    <div
      class="h-full absolute rounded-sm bg-slate-500"
      :style="{ width: props.progress + '%' }"
    />
    <p class="absolute left-2 top-0 text-white text-center mt-1">
      {{ props.progress }}%
    </p>
  </div>
</template>

<script setup lang="ts">

interface Props {
  progress: string
}

const props = defineProps<Props>()

</script>

<style scoped>
.bg-slate-500 {
  background-color: #6b7280;
}
</style>
