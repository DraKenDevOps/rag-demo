<script setup lang="ts">
defineProps<{ model: string; message: string; handleSubmit: () => void; disable: boolean; models: Array<ModelInfo> }>();
defineEmits<{
    (e: "update:model", value: string): void;
    (e: "update:message", value: string): void;
}>();
</script>

<template>
    <div class="card">
        <div class="card-body">
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <select
                        id="model"
                        name="model"
                        :value="model"
                        @input="$emit('update:model', ($event.target as HTMLSelectElement).value)"
                        :disabled="disable"
                    >
                        <option value="" disabled>-- Select some model --</option>
                        <option v-for="m in models" :key="m.digest" :value="m.model">{{ m.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <textarea
                        id="message"
                        name="message"
                        type="text"
                        :value="message"
                        @input="$emit('update:message', ($event.target as HTMLTextAreaElement).value)"
                        placeholder="Enter prompt/message"
                        rows="5"
                        :readonly="disable"
                    ></textarea>
                </div>
                <button type="submit" :disabled="disable || !model">SEND</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
.card {
    width: 100%;
    background: #333;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

/* .card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
} */

.card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-body {
    padding: 24px;
}

.card-title {
    margin: 0 0 12px 0;
    font-size: 1.5rem;
    color: #1a1a1a;
}

.card-text {
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
}

.card-btn {
    display: inline-block;
    padding: 10px 20px;
    background: #0066ff;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: background 0.3s;
}

.card-btn:hover {
    background: #0052cc;
}

/* Form Group - for spacing */
.form-group {
    margin-bottom: 0.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #374151;
}

/* Responsive Select */
select {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem; /* Prevents zoom on iOS */
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: #333;
    appearance: none; /* Remove default arrow */
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 12px;
    transition: all 0.2s ease;
}

select option {
    width: 100%;
}

select:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
}

/* Responsive Textarea */
textarea {
    width: 100%;
    min-height: 140px;
    padding: 0.75rem 1rem;
    font-size: 1rem; /* Prevents zoom on iOS */
    font-family: inherit;
    border: 2px solid #d1d5db;
    border-radius: 0.5rem;
    resize: vertical; /* Allow only vertical resize */
    transition: all 0.2s ease;
}

textarea:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
}

/* Optional: make them look even better on large screens */
@media (min-width: 640px) {
    select,
    textarea {
        padding: 0.875rem 1.1rem;
    }
}
/* 
select,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
}

textarea {
  min-height: 140px;
  resize: vertical;
  font-family: inherit;
}

select:focus,
textarea:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
} */
</style>
