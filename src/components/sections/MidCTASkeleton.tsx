export default function MidCTASkeleton() {
  return (
    <section className="bg-gray-100 px-6 lg:px-[120px] py-[60px] animate-pulse">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex flex-col gap-6 max-w-[644px] flex-1 w-full">
          <div className="h-[128px] bg-white/60 rounded-lg w-full" />
          <div className="h-[75px] bg-white/60 rounded w-full" />
          <div className="flex gap-3">
            <div className="h-[48px] w-[160px] bg-white/60 rounded" />
            <div className="h-[48px] w-[140px] bg-white/60 rounded" />
          </div>
        </div>
        <div className="w-full max-w-[394px] aspect-square bg-white/60 rounded-lg" />
      </div>
    </section>
  );
}
