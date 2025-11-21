<script setup lang="ts">
import 'highlight.js/styles/atom-one-dark.css';
import { computed } from "vue";
import { md } from "../composables/useMarkdown";

const props = defineProps<{
    content: string;
}>();

const html = computed(() => md.render(props.content));
</script>

<template>
    <div class="markdown-output" v-html="html"></div>
</template>

<style scoped>
/* Optional GitHub-style theme */
.markdown-output {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    padding: 1rem;
}

.markdown-output pre {
    background: #f4f4f4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
}

.markdown-output code {
    font-family: monospace;
    font-size: 0.9rem;
    background: #eee;
    padding: 2px 4px;
    border-radius: 4px;
}
</style>
