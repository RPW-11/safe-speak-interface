import { useState, useCallback } from 'react';
import { sendMessage } from '@/services/messaging';
import { MessageSend } from '@/types/message';


export const useMessage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessageHandler = useCallback(async (messageData: MessageSend, onChunkReceived: (chunk: string) => void) => {
        setIsLoading(true);
        setError(null);
        try {
            await sendMessage(
                messageData, 
                (chunk: string) => {
                    onChunkReceived(chunk)
                    setIsLoading(false);
                }
            );
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Message sending failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }
    , []);
    return { sendMessageHandler, isLoading, setIsLoading, error };
}