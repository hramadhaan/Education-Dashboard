"use client";

import { getJadwalPelajaran } from "@/hooks/useJadwalPelajaran";
import { FC } from "react";

type IProps = {};

const JadwalPelajaranPage: FC<IProps> = () => {
  const { data: jadwalPelajaran, isLoading, error } = getJadwalPelajaran();
  console.log('Data: ', { isLoading, error })
  return (
    <div className="flex flex-col items-start">
      {jadwalPelajaran &&
        jadwalPelajaran.map((item, index) => {
          return (
            <div key={`jadwal-pelajaran-${index}`}>
              <p>{item.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default JadwalPelajaranPage;
