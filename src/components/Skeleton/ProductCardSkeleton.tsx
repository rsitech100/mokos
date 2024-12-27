import React from "react";

export function ProductCardSkeleton() {
      return (
            <div className="flex flex-col shadow-card rounded-lg animate-pulse">
                  <div className="w-full h-40 bg-neutral-300 rounded-t-lg"></div>
                  <div className="flex flex-col p-3 gap-2 bg-neutral-100">
                        <div className="h-4 bg-neutral-300 rounded"></div>
                        <div className="h-4 bg-neutral-300 rounded w-1/2"></div>
                        <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-neutral-300 rounded-full"></div>
                              <div className="h-4 bg-neutral-300 rounded w-1/3"></div>
                        </div>
                        <div className="flex items-center gap-1">
                              <div className="w-4 h-4 bg-neutral-300 rounded-full"></div>
                              <div className="h-4 bg-neutral-300 rounded w-1/4"></div>
                        </div>
                  </div>
            </div>
      );
}
