<script setup>
import { useAppStore } from '../../stores/app'

const appStore = useAppStore()
</script>

<template>
  <footer class="mt-12 text-center text-text-muted text-sm">
    <p>© 2025 YouCode Intranet - Current time: <span>{{ appStore.currentDateTime }}</span></p>
  </footer>
</template>