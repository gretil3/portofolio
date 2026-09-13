import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProjectsArchive from "@/components/ProjectsArchive";
import Contact from "@/components/Contact";
import DepthRail from "@/components/forest/DepthRail";

export default function Home() {
  return (
    <>
      <Navbar />
      <DepthRail />
      <main className="flex-1">
        <Hero />
        <Skills />
        <FeaturedProjects />
        <ProjectsArchive />
        <Contact />
      </main>
    </>
  );
}
