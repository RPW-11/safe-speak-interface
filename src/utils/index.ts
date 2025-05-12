import { Message } from "@/types/message";

export const formatMessage = (
    role: string,
    content: string,
    modelName: string,
    agentName: string, 
    conversation_id?: string,
    type?: string
):Message =>  {
    return {
        id: '',
        role: role, 
        conversation_id: conversation_id || '',
        model: modelName || 'gemini',
        agent_model: agentName || "julia",
        content: content,
        type: type || 'text'
    }
}