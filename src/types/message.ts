export type MessageSend = {
    conversation_id: string;
    agent_id?: string;
    model: string;
    type: string;
    content: string;
    img_url?: string;
}

export type Message = {
    id: string;
    conversation_id: string;
    role: string;
    agent_id?: string;
    model: string;
    type: string;
    content: string;
    img_url?: string;
}

export type MessageStream = {
    content: string;
}