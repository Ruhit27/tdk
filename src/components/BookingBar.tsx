import { dictionaries } from "@/lib/dictionary";
import { site, whatsappLink, type Lang } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";

/** Always-visible Call / WhatsApp bar on phones. */
export function BookingBar({ lang }: { lang: Lang }) {
  const t = dictionaries[lang];
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 p-3 backdrop-blur md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
      <div className="grid grid-cols-2 gap-2">
        <a href={`tel:${site.phoneTel}`} className="btn btn-brand h-12">
          <PhoneIcon className="size-5" /> {t.doctor.call}
        </a>
        <a href={whatsappLink(t.whatsapp.general)} target="_blank" rel="noopener" className="btn btn-wa h-12">
          <WhatsAppIcon className="size-5" /> {t.doctor.whatsapp}
        </a>
      </div>
    </div>
  );
}
