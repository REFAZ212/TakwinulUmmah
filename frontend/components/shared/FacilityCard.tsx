import Image from "next/image";
import { MapPin } from "lucide-react";

export default function FacilityCard({ name, desc, location, img }: { name: string; desc: string; location: string; img: string }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-white">
      <div className="relative h-44 w-full overflow-hidden">
        <Image src={img} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-sm font-semibold text-deep">{name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{desc}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted"><MapPin size={13} /> {location}</p>
      </div>
    </div>
  );
}
