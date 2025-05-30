import { Conversation } from "@/types/conversation";
import { create } from "zustand";

interface ConversationStore {
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  updateConversations: (newConversation: Conversation) => void;
  removeConversations: (id: string) => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations: [],
  
  setConversations: (conversations) => 
    set((state) => ({ conversations: conversations })),
  
  updateConversations: (newConversation) => {
    set((state) => {
      const updatedConversations = [newConversation];
      
      for (const conv of state.conversations) {
        if (conv.id !== newConversation.id) {
          updatedConversations.push(conv);
        } 
      }
      
      return { conversations: updatedConversations };
    });
  },
  
  removeConversations: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((cnv) => cnv.id !== id),
    })),
}));