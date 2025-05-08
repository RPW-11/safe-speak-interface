import { Message } from "@/types/message";
import { create } from "zustand";

interface MessageStore {
  messages: Message[];
  currentMessage: string | null;
  setCurrentMessage: (message: string | null) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  removeMessage: (id: string) => void;
  getMessage: (id: string) => Message | undefined;
  getMessagesByConversation: (conversationId: string) => Message[];
  clearMessages: () => void;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],

  currentMessage: null,
  
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      ),
    })),
  
  removeMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
  
  getMessage: (id) => 
    get().messages.find((msg) => msg.id === id),
  
  getMessagesByConversation: (conversationId) =>
    get().messages.filter((msg) => msg.conversation_id === conversationId),
  
  clearMessages: () => set({ messages: [] }),

  setCurrentMessage: (message) => set((state) => ({ currentMessage: message })),
}));