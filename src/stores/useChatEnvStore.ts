"use client"
import { Agent } from "@/types/model";
import { create } from "zustand";
import { adversaryModels, protectionModels } from "@/constant";


interface ChatEnvStore {
  adversaryAgent: Agent
  protectionModel: Agent
  setAdversaryAgent: (agent: Agent) => void
  resetAdversaryAgent: () => void
  setProtectionAgent: (agent: Agent) => void
  resetProtectionAgent: () => void
}

export const useChatEnvStore = create<ChatEnvStore>((set, get) => ({
  adversaryAgent: adversaryModels[0],
  protectionModel: protectionModels[0],
  setAdversaryAgent: (agent) => set({ adversaryAgent: agent }),
  resetAdversaryAgent: () => set({ adversaryAgent: adversaryModels[0] }),
  setProtectionAgent: (agent) =>  set({ protectionModel: agent }),
  resetProtectionAgent: () => set({ protectionModel: protectionModels[0] })
}));