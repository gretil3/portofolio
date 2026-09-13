import { featuredProjects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  return (
    <section id="projects" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="mb-3 font-mono text-sm tracking-wide text-accent-soft">
            {"// selected work"}
          </p>
          <h2 className="font-sans text-3xl font-semibold text-text-high sm:text-4xl">
            Featured Projects
          </h2>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} reversed={i === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
