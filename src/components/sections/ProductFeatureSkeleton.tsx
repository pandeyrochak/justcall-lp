export default function ProductFeatureSkeleton({ reverse = false }: { reverse?: boolean }) {
  return (
    <section className="bg-white px-6 py-[60px] animate-pulse">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 items-center">
        {!reverse && (
          <div className="flex flex-col gap-3 items-center w-full">
            <div className="h-[42px] bg-gray-100 rounded-lg w-[654px] max-w-full" />
            <div className="h-[25px] bg-gray-100 rounded w-[800px] max-w-full" />
          </div>
        )}
        <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between gap-12 w-full`}>
          <div className="flex flex-col gap-6 max-w-[530px] flex-1 w-full">
            <div className="h-[84px] bg-gray-100 rounded-lg w-full" />
            <div className="h-[50px] bg-gray-100 rounded w-full" />
            <div className="flex flex-col gap-[18px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-[22px] bg-gray-100 rounded w-full" />
              ))}
            </div>
            <div className="h-[50px] bg-gray-100 rounded w-full" />
          </div>
          <div className="bg-gray-100 rounded-3xl w-full max-w-[622px] aspect-[622/503]" />
        </div>
      </div>
    </section>
  );
}
