import { useState, useCallback } from 'react';
import { createConversation, getConversations, deleteConversation } from '@/services/conversation';


export const useConversation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createConversationHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const conversation = await createConversation();
            return conversation
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to create conversation');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }
    , []);

    const getConversationsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const conversations = await getConversations();
            return conversations
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to get conversations');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }
    , []);

    const deleteConversationHandler = useCallback(async (conversationId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteConversation(conversationId)
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to delete conversation');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [])

    return { createConversationHandler, getConversationsHandler, deleteConversationHandler, isLoading, error };
}