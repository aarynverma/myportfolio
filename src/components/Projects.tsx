"use client";

const projects = [
    {
        title: "Quick Intel",
        description: "AI-powered Chrome extension that summarizes any web page in seconds using OpenAI, Anthropic, or Google Gemini",
        tech: ["React JS", "TypeScript", "Tailwind CSS", "Vite", "Chrome Extension", "MV3"],
        color: "from-blue-500/20 to-cyan-500/20",
        link: "https://quick-intel-landing.vercel.app/",
    },
    {
        title: "Spend Wise",
        description: "AI-Powered Bank Statement Analyzer. Upload your bank or credit card statement (PDF/CSV) and get instant visual spending analysis with smart insights.",
        tech: ["React JS", "AI", "Data Visualization"],
        color: "from-amber-500/20 to-yellow-500/20",
        link: "https://spendwise-9ukr.vercel.app/"
    },
    {
        title: "Graphify",
        description: "A persistent code knowledge graph over a six repo microservices workspace, built straight from source files and served to AI coding tools so they query a small scoped part of the graph instead of loading whole folders. Indexed about 1,800 files into 16,000 nodes and 37,000 edges with no LLM cost.",
        tech: ["TypeScript", "MCP Server", "AST Parsing", "Claude Code"],
        color: "from-violet-500/20 to-purple-500/20",
    },
    {
        title: "TaskFlow",
        description: "Full stack task management app built as a Turborepo monorepo, with role based access control, optimistic UI updates and a typed API layer shared across apps.",
        tech: ["Next.js 15", "Hono", "Drizzle ORM", "PostgreSQL", "Turborepo"],
        color: "from-indigo-500/20 to-sky-500/20",
        link: "https://taskflow-web-gilt.vercel.app/login",
    },
    {
        title: "NextFlow",
        description: "Visual workflow builder built on React Flow, letting you drag out node graphs, wire conditions between them and save the result.",
        tech: ["Next.js 15", "React Flow", "TypeScript"],
        color: "from-lime-500/20 to-emerald-500/20",
        link: "https://nextflow-umber-iota.vercel.app/",
    },
    {
        title: "Ponytail",
        description: "A Claude Code plugin and house rules setup that keeps AI coding sessions inside a bounded plan, implement, verify, fix, stop loop, with scoped slash commands, restricted tool access and a service discovery catalogue.",
        tech: ["TypeScript", "Claude Code Plugin", "Developer Tooling"],
        color: "from-emerald-500/20 to-teal-500/20",
    },
    {
        title: "JARVIS",
        description: "A personal AI assistant with a model router that picks the right model per task, streaming chat, long term memory through vector search and background jobs for scheduled work.",
        tech: ["Next.js 15", "Hono", "Vercel AI SDK", "pgvector", "Mastra", "Inngest"],
        color: "from-rose-500/20 to-pink-500/20",
    },
    {
        title: "LinkedIn Content Agent",
        description: "A multi agent setup that researches, writes and publishes LinkedIn posts on a daily schedule with no manual step in between.",
        tech: ["TypeScript", "LLM APIs", "Automation", "Cron"],
        color: "from-cyan-500/20 to-blue-500/20",
    },
    {
        title: "Metamask Wallet",
        description: "A cryptocurrency wallet interface.",
        tech: ["React JS", "TypeScript", "Chakra-UI"],
        color: "from-orange-500/20 to-red-500/20",
        link: "https://epic-wozniak-8a250b.netlify.app/"
    },
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
