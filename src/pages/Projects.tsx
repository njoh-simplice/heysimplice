import HighlightText from "../components/ui/HighlightText";
import ProjectCard from "../features/projects/ProjectCard";
import ToolCard from "../features/projects/ToolCard";
import { projects } from "../data/projectsData/projects";
import { tools } from "../data/projectsData/tools";
import { usePageMeta } from "../hooks/usePageMeta";

// Both lists are maintained oldest-first (new entries appended); show newest first.
const delivered = projects.filter((project) => project.isDisplay).reverse();
const liveTools = tools.filter((tool) => tool.isDisplay).reverse();

export default function Projects() {
  usePageMeta("/projects");

  return (
    <>
      {liveTools.length > 0 && (
        <section
          aria-labelledby="tools-heading"
          className="bg-brand-black px-4 py-[50px] text-on-dark sm:px-[30px]"
        >
          <h1
            id="tools-heading"
            className="text-center font-display text-[1.75rem] font-bold uppercase leading-tight text-on-dark md:text-[2.5rem]"
          >
            Tools I <HighlightText>Built</HighlightText>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center font-body text-on-dark-muted md:text-lg">
            Small, useful tools I made and put online.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveTools.map((tool) => (
              <li key={tool.id}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="bg-brand-white px-4 py-[50px] text-on-light sm:px-[30px]">
        <h2 className="text-center font-display text-[1.75rem] font-bold uppercase leading-tight text-on-light md:text-[2.5rem]">
          Projects <HighlightText>Delivered</HighlightText>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center font-body text-on-light-muted md:text-lg">
          Everything I&rsquo;ve shipped so far.
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {delivered.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
