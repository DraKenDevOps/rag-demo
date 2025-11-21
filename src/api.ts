const OLLAMA_API = "http://192.168.154.17:11434";
const headers = new Headers();
headers.set("Content-Type", "application/json");

export async function ollamaVersion() {
    try {
        const response = await fetch(`${OLLAMA_API}/api/version`, { headers });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return { version: "error" };
    }
}

export async function ollamaListModels() {
    try {
        const response = await fetch(`${OLLAMA_API}/api/tags`, { headers });
        const data = await response.json();
        return data as ModelsResponse;
    } catch (err) {
        console.error(err);
        return { models: [] } as ModelsResponse;
    }
}

export async function ollamaCurrentlyRunning() {
    try {
        const response = await fetch(`${OLLAMA_API}/api/ps`, { headers });
        const data = await response.json();
        return data as ModelsResponse;
    } catch (err) {
        console.error(err);
        return { models: [] } as ModelsResponse;
    }
}

export async function ollamaGenerate(model: string, message: string) {
    // const options = {
    //     seed: 0,
    //     temperature: 0.8,
    //     top_k: 0,
    //     top_p: 0,
    //     min_p: 0,
    //     stop: "",
    //     num_ctx: 0,
    //     num_predict: 0
    // };
    const body = JSON.stringify({
        model,
        prompt: message,
        suffix: "",
        images: [],
        format: "",
        system: "",
        think: false,
        raw: false,
        keep_alive: "1m",
        options: { temperature: 0.8 },
        logprobs: false,
        top_logprobs: false
    });
    console.log(body)
    try {
        const response = await fetch(`${OLLAMA_API}/api/generate`, {
            method: "POST",
            headers,
            body
        });
        /**
         * {
                "model": "gemma3",
                "created_at": "2025-10-17T23:14:07.414671Z",
                "response": "Hello! How can I help you today?",
                "done": true,
                "done_reason": "stop",
                "total_duration": 174560334,
                "load_duration": 101397084,
                "prompt_eval_count": 11,
                "prompt_eval_duration": 13074791,
                "eval_count": 18,
                "eval_duration": 52479709
            }
         */

        if (!response.body) {
            console.error("No response body");
            return null;
        }

        const reader = response.body.getReader();
        return reader;
    } catch (err) {
        console.error(err);
        return null;
    }
}
