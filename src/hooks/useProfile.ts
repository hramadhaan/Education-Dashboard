import { axiosClient } from "@/lib/axios-client";
import { useProfileStores } from "@/stores/UserStores";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const getProfile = () => {
  const saveProfile = useProfileStores((state) => state.saveProfile);
  const { data: session, status } = useSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await axiosClient.get("/auth/get-student", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.token}`,
        },
      });

      saveProfile(response.data.data);

      return response.data.data;
    },
  });

  return { data, isLoading, error, status };
};
