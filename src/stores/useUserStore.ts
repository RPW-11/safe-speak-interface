import { User } from "@/types/auth";
import { create } from "zustand";
import { getUserInfo, updateProfilePicture } from "@/services/auth";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>
  updateProfile: (imgUrl: string) => Promise<void>
  loading: boolean;
  error: string | null;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const userInfo = await getUserInfo();
      set({ user: userInfo, loading: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to fetch user info',
        loading: false 
      });
    }
  },
  updateProfile: async (imgUrl: string) => {
    set({ loading: true, error: null });
    const currUser = get().user
    try {
      if (currUser) {
        await updateProfilePicture(imgUrl);
        const newUser = { img_url: imgUrl, ...currUser } 
        set({ user: newUser })
        return
      }
      throw new Error("Cannot change an empty profile")
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : 'Failed to change user profile',
        loading: false 
      });
    } finally {
        set({ loading: false })
    }
  }
}));