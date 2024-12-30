'use client';
import { useState, useEffect } from "react";

interface WithLoadingProps {
      children: React.ReactNode;
      isLoading: boolean;
      skeleton: React.ReactNode;
}

export function WithLoading({ children, isLoading, skeleton }: WithLoadingProps) {
      const [loading, setLoading] = useState(isLoading);

      useEffect(() => {
            if (isLoading) {
                  const timer = setTimeout(() => setLoading(false), 1000);
                  return () => clearTimeout(timer);
            }
      }, [isLoading]);

      return <>{loading ? skeleton : children}</>;
}
