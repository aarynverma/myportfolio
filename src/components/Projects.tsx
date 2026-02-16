"use client";

const projects = [
    {
        title: "Your Clothings",
        description: "A high-performance E-commerce platform for clothing.",
        tech: ["React JS", "Redux", "Firebase"],
        color: "from-blue-500/20 to-cyan-500/20",
        link: "https://your-clothings.vercel.app/"
    },
    {
        title: "Chat App",
        description: "A real-time messaging application.",
        tech: ["React JS", "Firebase", "CSS3"],
        color: "from-emerald-500/20 to-green-500/20",
        link: "https://letschat-three.vercel.app/"
    },
    {
        title: "Music Player",
        description: "A functional music player interface with custom styling.",
        tech: ["React JS", "SCSS", "Fort Awesome"],
        color: "from-purple-500/20 to-pink-500/20",
        link: "https://music-player-chi.vercel.app/"
    },
    {
        title: "Metamask Wallet",
        description: "A cryptocurrency wallet interface.",
        tech: ["React JS", "TypeScript", "Chakra-UI"],
        color: "from-orange-500/20 to-red-500/20",
        link: "https://epic-wozniak-8a250b.netlify.app/"
    }
];

const Projects = () => {
    return (
        <section className="relative z-20 py-24 px-4 md:px-12 lg:px-24 bg-[#121212]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Selected Works
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, idx) => (
                        <a
                            key={idx}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`
                group relative p-6 md:p-8 rounded-2xl border border-white/10 overflow-hidden
                backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors duration-500 block
              `}
                        >
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-white/70">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
