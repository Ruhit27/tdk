import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

type Props = {
  title: string;
  description?: string;
  items: FaqItem[];
  /** Closing line, e.g. a pointer to the Booking Line. */
  footer?: React.ReactNode;
  className?: string;
};

/**
 * Every item starts open: Radix renders a closed item's answer as empty HTML,
 * and the answers must be in the page for search engines and AI search to read them.
 */
export function FaqsSection({ title, description, items, footer, className }: Props) {
  const ids = items.map((_, i) => `item-${i + 1}`);
  return (
    <div className={cn("w-full space-y-7", className)}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        {description && <p className="max-w-2xl text-ink-2">{description}</p>}
      </div>
      <Accordion type="multiple" defaultValue={ids} className="w-full -space-y-px rounded-lg bg-surface">
        {items.map((item, i) => (
          <AccordionItem
            value={ids[i]}
            key={ids[i]}
            className="relative border-x border-line first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
          >
            <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 text-ink hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-[15px] leading-7 text-ink-2">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {footer && <p className="text-ink-2">{footer}</p>}
    </div>
  );
}
