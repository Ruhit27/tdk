import Link from "next/link";
import { dictionaries } from "@/lib/dictionary";
import type { Lang } from "@/lib/site";
import { Avatar } from "@/components/Avatar";
import { AppIcon, toneText, type IconName, type Tone } from "@/components/AppIcon";
import { ClockIcon, PinIcon } from "@/components/icons";

export type CardData = {
  url: string;
  name: string;
  specialty: string;
  specialtyIcon: IconName;
  specialtyTone: Tone;
  degrees: string;
  chamber: string;
  days: string;
  fee: string;
  available: boolean;
  photo: string | null;
};

/** Shared markup so server cards and the client-side finder look identical. */
export function DoctorCardView({ d, lang }: { d: CardData; lang: Lang }) {
  const t = dictionaries[lang];
  return (
    <article className="card group relative flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex gap-4">
        <Avatar name={d.name} photo={d.photo} size={104} className="!rounded-2xl" />
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold leading-snug">
            <Link href={d.url} className="after:absolute after:inset-0 after:content-['']">
              {d.name}
            </Link>
          </h3>
          <p className={`mt-1 flex items-center gap-1.5 text-sm font-medium ${toneText(d.specialtyTone)}`}>
            <AppIcon name={d.specialtyIcon} className="size-4 shrink-0" />
            {d.specialty}
          </p>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-2">{d.degrees}</p>
        </div>
      </div>
      <div className="mb-4 mt-4 space-y-1.5 text-sm text-ink-2">
        {d.chamber && (
          <p className="flex items-start gap-2">
            <PinIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            <span className="line-clamp-1">{d.chamber}</span>
          </p>
        )}
        {d.days && (
          <p className="flex items-start gap-2">
            <ClockIcon className="mt-0.5 size-4 shrink-0 text-brand" />
            <span className="line-clamp-1">{d.days}</span>
          </p>
        )}
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
        <span>
          <span className="text-sm text-ink-2">{t.card.fee} </span>
          <span className="text-lg font-bold">{d.fee}</span>
        </span>
        <span className="flex items-center gap-1.5 text-xs text-ink-2">
          <span className={`size-2 rounded-full ${d.available ? "bg-emerald-500" : "bg-zinc-400"}`} />
          {d.available ? t.card.available : t.card.unavailable}
        </span>
      </div>
      <span className="btn btn-ghost relative mt-4 h-11 w-full group-hover:bg-brand group-hover:text-brand-ink">{t.card.book}</span>
    </article>
  );
}
