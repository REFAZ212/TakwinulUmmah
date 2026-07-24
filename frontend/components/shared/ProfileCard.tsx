interface ProfileCardProps {
  name: string;
  role: string;
  img?: string;
}

export default function ProfileCard({ name, role, img }: ProfileCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-white">
      {img && (
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt={name}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="font-display text-sm font-semibold text-deep">{name}</h3>
        <p className="mt-1 text-xs text-gold">{role}</p>
      </div>
    </div>
  );
}
