export function SectionSkeleton({ className }: { className?: string }) {
      return (
            <div className={`flex flex-col justify-center items-center gap-4 animate-pulse h-screen md:h-full ${className}`}>
                  <div className="w-3/4 h-4 bg-neutral-400 rounded-md"></div>
                  <div className="w-1/2 h-4 bg-neutral-300 rounded-md"></div>
                  <div className="w-1/2 h-4 bg-neutral-300 rounded-md"></div>
            </div>
      );
}
