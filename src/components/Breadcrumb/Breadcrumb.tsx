import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div aria-label="Breadcrumb" className="flex text-xs sm:text-sm text-gray-600 max-w-[1440px] w-full mx-auto">
      <ol className="inline-flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href && !item.current ? (
              <Link href={item.href} className="hover:underline text-primary-500">
                {item.label}
              </Link>
            ) : (
              <span
                className={`${item.current ? "font-semibold text-neutral-700" : ""
                  }`}
              >
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="mx-3.5 w-1 h-1 rounded-full bg-neutral-400"></span> // Separator
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
