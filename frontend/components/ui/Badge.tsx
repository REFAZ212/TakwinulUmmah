import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-sand text-ink-soft",
  success: "bg-sage/10 text-sage",
  warning: "bg-gold/10 text-gold",
  danger: "bg-red-50 text-red-700",
  info: "bg-deep/10 text-deep",
};

export default function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function statusBadge(status: string): { variant: BadgeVariant; label: string } {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    PUBLISHED: { variant: "success", label: "Diterbitkan" },
    DRAFT: { variant: "warning", label: "Draf" },
    PENDING: { variant: "info", label: "Menunggu" },
    APPROVED: { variant: "success", label: "Disetujui" },
    REJECTED: { variant: "danger", label: "Ditolak" },
    CONTACTED: { variant: "info", label: "Dihubungi" },
    NEW: { variant: "warning", label: "Baru" },
  };
  return map[status?.toUpperCase()] ?? { variant: "default", label: status };
}
