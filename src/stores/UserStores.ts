import { create } from "zustand";

type IProfile = {
  profile: Profile;
  saveProfile: (profile: Profile) => void;
};

export const useProfileStores = create<IProfile>((set) => ({
  profile: {} as Profile,
  saveProfile: (profile) => set((state) => ({ ...state, profile })),
}));
