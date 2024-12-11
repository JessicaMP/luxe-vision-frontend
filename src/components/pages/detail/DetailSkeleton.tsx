import { Skeleton } from "@/components/ui/skeleton";

export function DetailSkeleton() {
  return (
    <div className="container mx-auto py-20 space-y-8 px-4 sm:px-10 mt-4">
      <header className="flex flex-row justify-between items-start md:items-end gap-4 md:gap-0">
        <div className="flex flex-col sm:flex-row gap-3 mt-12">
          <Skeleton className="h-[170px] w-[170px] rounded-full hidden md:block" />
          <div className="space-y-2.5">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
        <div className="flex flex-col gap-10 items-end">
          <Skeleton className="h-10 w-28" />
        </div>
      </header>

      <Skeleton className="w-full h-[500px]" />

      <div className="w-[95%] md:w-[90%] lg:w-[70%] xl:w-[65%] 2xl:w-[55%] mx-auto flex flex-col gap-12">
        <section className="space-y-14 w-full">
          <Skeleton className="h-32 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[400px] w-full" />
        </section>
      </div>
    </div>
  );
}
