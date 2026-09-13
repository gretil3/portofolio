import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import ProjectsArchive from "@/components/ProjectsArchive";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedProjects />
        <ProjectsArchive />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
