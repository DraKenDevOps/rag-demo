<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import RagForm from "./components/RagForm.vue";
import { ollamaGenerate, ollamaListModels } from "./api";
import RagResult from "./components/RagResult.vue";

const form = reactive({ model: "", message: "" });
const streamText = ref("");
const disable = ref(false);

const models = ref<ModelInfo[]>([]);

const handleSubmit = () => {
    console.log(form);
    disable.value = true;
    streamText.value = "";
    ollamaGenerate(form.model, form.message).then(async (reader) => {
        if (!reader) { disable.value = false; return; }

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
                if (!line.trim()) continue;
                try {
                    const json = JSON.parse(line) as {
                        response: string;
                        done: boolean;
                    };
                    streamText.value += json.response;
                    await nextTick();
                    if (json.done) { disable.value = false; console.info("Stream finished"); }
                } catch (e) {
                    console.warn("Failed to parse line:", line);
                }
            }
        }
    });
};

const handleListModels = () => {
    ollamaListModels().then((resp) => {
        models.value = resp.models;
    });
};
</script>

<template>
    <main>
        <div class="container container-sm">
            <button :disabled="disable" @click="handleListModels">list models</button>
            <RagForm v-model:model="form.model" v-model:message="form.message" :handle-submit="handleSubmit" :disable="disable" :models="models" />
            <br />
            <RagResult :reply-message="streamText" :done="disable" />
        </div>
    </main>
</template>
