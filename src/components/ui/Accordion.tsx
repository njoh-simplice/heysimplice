import {
  createContext,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";
import { Plus } from "lucide-react";

/**
 * Accordion — design-system primitive for FAQ-style content (currently the
 * blog post FAQ, driven by a post's `faq` frontmatter).
 *
 * Compound API (`<Accordion><Accordion.Item title="…">…</Accordion.Item></Accordion>`)
 * inspired by Base UI's Accordion.Root/Item/Trigger/Panel split, collapsed
 * here into two pieces since every current use case is a plain Q&A list with
 * no need for custom header/panel markup per item.
 *
 * Exclusive by default (opening one item closes the previous one) — the usual
 * FAQ pattern, and what keeps a long question list scannable. The open/close
 * transition animates height via a CSS grid-rows trick (no JS measuring, no
 * layout library) and respects `prefers-reduced-motion`.
 *
 * Styled for dark surfaces only (on-dark tokens) — every current usage sits on
 * `bg-brand-black`. Add a `variant` prop if a light-surface use case shows up.
 */

interface AccordionContextValue {
  openId: string | null;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function Accordion({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div className="divide-y divide-on-dark-muted/15 border-t border-on-dark-muted/15">
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("Accordion.Item must be rendered inside <Accordion>.");
  }
  const { openId, toggle } = ctx;

  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;
  const isOpen = openId === id;

  return (
    <div>
      <h3>
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(id)}
          className="flex w-full items-center justify-between gap-4 py-4 text-left font-body font-semibold text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark"
        >
          <span>{title}</span>
          <Plus
            aria-hidden="true"
            className={`size-5 shrink-0 text-on-dark-muted transition-transform duration-200 motion-reduce:transition-none ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </button>
      </h3>
      {/* grid-rows 0fr -> 1fr animates height without measuring it in JS;
          overflow-hidden on the child clips content while it's collapsing. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 font-body text-on-dark-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}

Accordion.Item = AccordionItem;
