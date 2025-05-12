import { Agent } from "@/types/model"


export const adversaryModels: Agent[] = [
    {
        id: "julia",
        name: "Julia",
        description: "She is deceitful, alluring, and manipulative"
    },
    {
        id: "px-4",
        name: "PX-4",
        description: "He sends harmful images"
    },
    {
        id: "lucas",
        name: "Lucas",
        description: "A very nice man named Lucas"
    },
]

export const protectionModels = [
    {
        id: "gemini",
        name: "Gemini 2.5 Flash",
        description: "Fast performing model. Sensitive protection"
    },
    {
        id: "distilgpt2",
        name: "DistilGPT2",
        description: "A custom fine-tuned model"
    },
    {
        id: "mistral7b",
        name: "Mistral 7B",
        description: "Mistral 7B hosted on Ollama"
    }
]