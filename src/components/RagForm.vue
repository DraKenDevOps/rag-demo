<script setup lang="ts">
defineProps<{ model: string; message: string; handleSubmit: () => void; disable: boolean; models: Array<ModelInfo> }>();
defineEmits<{
    (e: "update:model", value: string): void;
    (e: "update:message", value: string): void;
}>();
</script>

<template>
    <div class="card">
        <form @submit.prevent="handleSubmit">
            <select :value="model" @input="$emit('update:model', ($event.target as HTMLSelectElement).value)" :disabled="disable">
                <option value="" disabled>-- Select some model --</option>
                <option v-for="m in models" :key="m.digest" :value="m.model">{{ m.name }}</option>
            </select>
            <br />
            <textarea
                type="text"
                :value="message"
                @input="$emit('update:message', ($event.target as HTMLTextAreaElement).value)"
                placeholder="Enter prompt/message"
                rows="5"
                :readonly="disable"
            ></textarea>
            <br />
            <button type="submit" :disabled="disable">SEND</button>
        </form>
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
