import { ArrowUpRight } from "lucide-react";
import { archiveProjects } from "@/data/projects";

export default function ProjectsArchive() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-3 font-mono text-sm tracking-wide text-accent-soft">
            {"// other work"}
          </p>
          <h2 className="font-sans text-3xl font-semibold text-text-high sm:text-4xl">
            Archive
          </h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-emerald-900/40 bg-surface">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-emerald-900/40 font-mono text-xs uppercase tracking-wider text-text-muted">
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="hidden px-6 py-4 font-medium sm:table-cell">Core Tech</th>
                <th className="px-6 py-4 font-medium text-right">Link</th>
              </tr>
            </thead>
            <tbody>
              {archiveProjects.map((project) => (
                <tr
                  key={project.title}
                  className="border-b border-emerald-900/20 transition last:border-b-0 hover:bg-surface-hover"
                >
                  <td className="px-6 py-4 font-mono text-sm text-text-muted">
                    {project.year}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-text-high">
                    {project.title}
                  </td>
                  <td className="hidden px-6 py-4 font-mono text-sm text-emerald-300 sm:table-cell">
                    {project.tech}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="inline-flex items-center gap-1 text-sm text-accent-soft transition hover:text-amber"
                      >
                        View
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
