import { useState, useCallback } from 'react';
import { sendMessage, loadMessagesFromConversation } from '@/services/messaging';
import { MessageSend } from '@/types/message';


export const useMessage = () => {
    const [error, setError] = useState<string | null>(null);

    const sendMessageHandler = useCallback(async (messageData: MessageSend, onChunkReceived: (chunk: any) => void) => {
        setError(null);
        try {
            await sendMessage(
                messageData, 
                (chunk) => {
                    onChunkReceived(chunk)
                }
            );
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Message sending failed');
            throw err;
        }
    }
    , []);

    const loadMessagesHandler = useCallback(async (conversation_id: string) => {
        setError(null)
        try {
            const messages = await loadMessagesFromConversation(conversation_id)
            return messages
        } catch (error: any) {
            setError(error.response?.data?.detail || 'Message sending failed');
            throw error;
        }
    }, [])
    return { sendMessageHandler, loadMessagesHandler, error };
}