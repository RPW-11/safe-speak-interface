import { Message } from "@/types/message";
import { create } from "zustand";

interface MessageStore {
  messages: Message[];
  pendingMessage: Message | null,
  isSendingMessage: boolean,
  setIsSendingMessage: (newState: boolean) => void,
  setPendingMessage: (message: Message|null) => void,
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
}

export const useMessageStore = create<MessageStore>((set, get) => ({
  messages: [],
  pendingMessage: null,
  isSendingMessage: false,
  setIsSendingMessage: (newState) => set({ isSendingMessage: newState }),
  setPendingMessage: (message) => set({ pendingMessage: message}),
  addMessage: (message) => 
    set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({
    messages: messages
  }),
  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      ),
    })),
  clearMessages: () => set({ messages: [] }),
  
}));