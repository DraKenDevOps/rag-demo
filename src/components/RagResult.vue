<script setup lang="ts">
import MarkdownRender from "./MardownRender.vue"
defineProps<{ replyMessage: string, done: boolean }>()
</script>
<template>
    <div class="card">
        <MarkdownRender :content="replyMessage" />
    </div>
</template>