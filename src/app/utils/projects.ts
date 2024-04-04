// projects.ts
export interface Project {
    id: number;
    name: string;
    deployedUrl: string;
    description: string;
    tags: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        name: "Your Clothings",
        deployedUrl: "https://your-clothings.vercel.app/",
        description: "An E-commerce website for clothing",
        tags: ["React JS", "Redux", "Firebase", "React-Router-Dom"],
    },
    {
        id: 2,
        name: "Chat App",
        deployedUrl: "https://letschat-three.vercel.app/",
        description: "A chat application",
        tags: ["React JS", "CSS3", "Firebase", "React-Firebase-Hooks"],
    },
    {
        id: 3,
        name: "Music Player",
        deployedUrl: "https://music-player-chi.vercel.app/",
        description: "A music player",
        tags: ["React JS", "CSS3", "Fort Awesome","SCSS"],
    },
    {
        id: 4,
        name: "Metamask Wallet",
        deployedUrl: "https://epic-wozniak-8a250b.netlify.app/",
        description: "A wallet for cryptocurrency",
        tags: ["React JS", "Typescript", "CSS3", "Chakra-UI"],
    },
];
