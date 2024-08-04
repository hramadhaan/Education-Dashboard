import { create } from "zustand";

type IProps = {
  jadwalPelajaran: ClassSchedule[];
  saveJadwalPelajaran: (jadwalPelajaran: ClassSchedule[]) => void;
};

export const useJadwalPelajaranStores = create<IProps>((set) => ({
  jadwalPelajaran: [],
  saveJadwalPelajaran: (jadwalPelajaran) =>
    set((state) => ({ ...state, jadwalPelajaran })),
}));
