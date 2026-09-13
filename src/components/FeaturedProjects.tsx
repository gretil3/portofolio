import { featuredProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="relative px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(55%_45%_at_18%_0%,rgba(111,207,143,0.08),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading section="projects" title="Featured Projects" />
        <div className="space-y-28 lg:space-y-40">
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              number={String(i + 1).padStart(2, "0")}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
