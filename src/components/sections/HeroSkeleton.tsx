export default function HeroSkeleton() {
  return (
    <section className="bg-[#FFFDE6] px-6 md:px-[91px] py-[60px] animate-pulse">
      <div className="max-w-[1259px] mx-auto flex flex-col md:flex-row items-center gap-[60px] lg:gap-[100px]">
        <div className="flex flex-col gap-10 flex-1 max-w-[634px]">
          <div className="flex flex-col gap-[18px]">
            <div className="h-[64px] bg-amber-200/30 rounded-lg w-full" />
            <div className="h-[64px] bg-amber-200/30 rounded-lg w-3/4" />
            <div className="h-[25px] bg-amber-200/30 rounded w-[529px] max-w-full" />
            <div className="h-[25px] bg-amber-200/30 rounded w-[400px] max-w-full" />
          </div>
          <div className="flex gap-[6px]">
            <div className="h-[48px] w-[280px] bg-amber-200/30 rounded" />
            <div className="h-[48px] w-[190px] bg-amber-200/30 rounded" />
          </div>
        </div>
        <div className="w-full max-w-[520px] aspect-square bg-amber-200/30 rounded-full" />
      </div>
    </section>
  );
}
