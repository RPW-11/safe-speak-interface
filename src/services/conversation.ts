import { Conversation } from "@/types/conversation";
import apiClient from ".";

export const createConversation = async (): Promise<Conversation> => {
    const response = await apiClient.post('/conversation/create');
  return response.data;
}

export const getConversations = async (): Promise<Conversation[]> => {
    const response = await apiClient.get('/conversation');
    return response.data;
}