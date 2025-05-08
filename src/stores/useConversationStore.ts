import { Conversation } from "@/types/conversation";
import { create } from "zustand";

interface ConversationStore {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  updateConversations: (id: string, updates: Partial<Conversation>) => void;
  removeConversations: (id: string) => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  
  setConversations: (conversations) => 
    set((state) => ({ conversations: conversations })),
  
  updateConversations: (id, updates) =>
    set((state) => ({
      conversations: state.conversations.map((cnv) =>
        cnv.id === id ? { ...cnv, ...updates } : cnv
      ),
    })),
  
  removeConversations: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((cnv) => cnv.id !== id),
    })),
}));