export type MessageSend = {
    conversation_id: string;
    agent_model: string;
    model: string;
    type: string;
    content: string;
    img_url?: string;
}

export type Message = {
    id: string;
    conversation_id: string;
    role: string;
    agent_model: string;
    model: string;
    type: string;
    content: string;
    img_url?: string;
    threat?: ThreatInfo | null
}

export type ThreatInfo = {
    id: string;
    message_id: string;
    is_threat: boolean;
    description: string;
    user_description?: string
}

export type MessageStream = {
    content: string;
}