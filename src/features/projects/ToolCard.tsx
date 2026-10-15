import type { Tool } from "../../data/projectsData/tools";

/**
 * Tool card — white card for the dark "Tools I Built" section on the Projects
 * page (the inverse of ProjectCard, which is a dark card on a light section).
 * The whole card is the link.
 */
export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open tool: ${tool.name}`}
      className="flex h-full flex-col rounded-card bg-brand-white p-2 transition-colors duration-150 hover:bg-brand-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-on-dark"
    >
      {/* aspect-ratio matches the source screenshot (~1200x554): box is reserved
          before load (no layout shift), no crop or letterbox. */}
      <img
        src={tool.image}
        alt=""
        loading="lazy"
        className="aspect-[1200/554] w-full rounded-lg object-cover"
      />
      <div className="mt-4 px-2 pb-2">
        <p className="font-body font-semibold text-on-light">
          {tool.name} ({tool.type})
        </p>
        <p className="mt-1 font-body text-sm text-on-light-muted">
          {tool.description}
        </p>
      </div>
    </a>
  );
}
