"use client";

export default function Home() {
  return (
    <main className="flex flex-col p-2 bg-slate-100 h-screen w-full overflow-y-scroll scroll-without-scrollbar">
      <HorizontalCardHome />
    </main>
  );
}

const HorizontalCardHome = (props: unknown) => {
  return <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
    <div className="bg-white rounded-md p-4"></div>
    <div className="bg-white rounded-md p-4"></div>
    <div className="bg-white rounded-md p-4"></div>
    <div className="bg-white rounded-md p-4"></div>
  </div>;
};
