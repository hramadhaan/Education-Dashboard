import { axiosClient } from "@/lib/axios-client";
import { useJadwalPelajaranStores } from "@/stores/JadwalPelajaranStores";
import { useProfileStores } from "@/stores/UserStores";
import { useQuery } from "@tanstack/react-query";

export const getJadwalPelajaran = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["jadwalPelajaran"],
    queryFn: async (): Promise<ClassSchedule[]> => {
      const profile = useProfileStores.getState().profile;
      const response = await axiosClient.get(
        `/subject/class-room/${profile.class._id}`
      );
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};
