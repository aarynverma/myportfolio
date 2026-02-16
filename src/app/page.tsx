import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <Projects />

      <footer className="py-20 text-center text-gray-500 text-sm">
        <div className="flex justify-center gap-6 mb-8">
          <a href="https://github.com/aarynverma" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/aryan-verma-software-engineer/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:aryn1776@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
        <p>© {new Date().getFullYear()} Aryan Verma. Crafted with precision.</p>
      </footer>
    </main>
  );
}
