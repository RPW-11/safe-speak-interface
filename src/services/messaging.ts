import apiClient from './index';
import { MessageSend } from '@/types/message';

export const sendMessage = async (
    message_data: MessageSend,
    onChunkReceived?: (chunk: string) => void
): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(message_data)
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const reader = response.body?.getReader();
      
      if (!reader) {
        throw new Error('No readable stream received');
      }
    
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        
        if (onChunkReceived) {
          onChunkReceived(chunk);
        }
      }
}

export const loadMessagesFromConversation = async (conversation_id: string) => {
}