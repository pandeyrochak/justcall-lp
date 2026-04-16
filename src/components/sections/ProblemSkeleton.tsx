export default function ProblemSkeleton() {
  return (
    <section className="bg-white px-6 sm:px-8 py-[60px] animate-pulse">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[22px] items-center">
        <div className="flex flex-col gap-3 items-center w-full">
          <div className="h-[42px] bg-gray-100 rounded-lg w-[700px] max-w-full" />
          <div className="h-[25px] bg-gray-100 rounded w-[828px] max-w-full" />
          <div className="h-[25px] bg-gray-100 rounded w-[600px] max-w-full" />
        </div>
        <div className="max-w-[1230px] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-5 h-[82px]" />
          ))}
        </div>
        <div className="h-[25px] bg-gray-100 rounded w-[885px] max-w-full" />
      </div>
    </section>
  );
}
