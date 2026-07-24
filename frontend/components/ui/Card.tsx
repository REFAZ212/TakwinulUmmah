import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
}

export default function Card({ padding = true, className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm shadow-deep/5 ring-1 ring-black/5 ${padding ? "" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center justify-between border-b border-sand pb-4 mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = "", children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-sm font-semibold text-ink ${className}`} {...props}>
      {children}
    </h3>
  );
}
