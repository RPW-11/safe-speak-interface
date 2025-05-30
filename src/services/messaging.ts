import apiClient from './index';
import { Message, MessageSend } from '@/types/message';

export const sendMessage = async (
    message_data: MessageSend,
    onChunkReceived?: (chunk: any) => void
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
      const delimiter = "\n\n"
      let buffer = ''
      
      if (!reader) {
        throw new Error('No readable stream received');
      }
    
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const parts = buffer.split(delimiter);
        
        buffer = parts.pop() || ''
        
        for (const chunk of parts) {
          if (onChunkReceived) {
            onChunkReceived(chunk.trim());
          }
        }
      }
}

export const loadMessagesFromConversation = async (conversation_id: string): Promise<Message[]> => {
  const response = await apiClient.get(`/message?conversation_id=${conversation_id}`)
  return response.data
}