import { ArrowUpRight, Sprout } from "lucide-react";
import { archiveProjects } from "@/data/projects";
import SectionHeading from "./SectionHeading";

export default function ProjectsArchive() {
  return (
    <section id="archive" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading section="archive" title="Archive" />

        <div className="overflow-hidden rounded-2xl border border-line-strong bg-surface/70 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line-strong font-mono text-xs uppercase tracking-wider text-text-muted">
                  <th scope="col" className="px-6 py-4 font-medium">Year</th>
                  <th scope="col" className="px-6 py-4 font-medium">Title</th>
                  <th scope="col" className="hidden px-6 py-4 font-medium sm:table-cell">
                    Core Tech
                  </th>
                  <th scope="col" className="px-6 py-4 text-right font-medium">Links</th>
                </tr>
              </thead>
              <tbody>
                {archiveProjects.map((project) => (
                  <tr
                    key={project.title}
                    className="group border-b border-line transition-colors last:border-b-0 hover:bg-fern/[0.04]"
                  >
                    <td className="px-6 py-4 font-mono text-sm text-text-muted">{project.year}</td>
                    <td className="px-6 py-4 text-sm font-medium text-text-high">
                      <span className="inline-flex items-center">
                        <Sprout
                          aria-hidden
                          className="mr-0 h-4 w-0 shrink-0 text-fern opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-4 group-hover:opacity-100 motion-reduce:transition-none"
                        />
                        {project.title}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 font-mono text-sm text-fern sm:table-cell">
                      {project.tech}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-4">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} live demo`}
                            className="inline-flex items-center gap-1 text-sm text-fern transition-colors hover:text-firefly"
                          >
                            Demo
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.title} source on GitHub`}
                            className="inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-high"
                          >
                            Code
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
