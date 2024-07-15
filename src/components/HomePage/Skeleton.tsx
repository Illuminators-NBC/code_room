import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
  return (
    <li className="max-w-92 sm:max-w-120 border border-[#2F3336] p-3.5 sm:p-7">
      <Skeleton className="h-6 w-24 mb-5" />
      <Skeleton className="h-32 sm:h-64 w-full mb-5 rounded-xl" />
      <Skeleton className="h-6 w-3/4 mb-7" />
      <Skeleton className="h-6 w-1/4 mb-7" />
    </li>
  );
}
