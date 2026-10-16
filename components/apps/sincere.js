import React, { Component } from 'react';
import ReactGA from 'react-ga4';

export class AboutSincere extends Component {

    constructor() {
        super();
        this.screens = {};
        this.state = {
            screen: () => { },
            active_screen: "about",
            navbar: false,
        }
    }

    componentDidMount() {
        this.screens = {
            "about": <About />,
            "education": <Education />,
            "skills": <Skills />,
            "projects": <Projects />,
            "profile": <Profile />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (!lastVisitedScreen) lastVisitedScreen = "about";

        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e?.id || e?.target?.id;
        if (!screen || !this.screens[screen]) return;

        localStorage.setItem("about-section", screen);

        ReactGA.send({ hitType: "pageview", page: `/${screen}`, title: "Custom Title" });

        this.setState({
            screen: this.screens[screen],
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    renderNavLinks = () => {
        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about VoidX3D" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About VoidX3D</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Sincere's education" src="./themes/Yaru/status/education.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Education</span>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Sincere's skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Sincere's projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="profile" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "profile" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="VoidX3D profile" src="./themes/Yaru/status/contact.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Profile</span>
                </div>
               <div className="my-0.5 w-28 md:w-full h-20 px-2 md:px-2.5 pl-1 flex justify-center" >
                    <iframe src="https://ghbtns.com/github-btn.html?user=VoidX3D&type=follow&count=true" title="Follow Me on GitHub" className="pl-4 my-4 w-5/6 md:w-3/4" frameBorder="0" scrolling="no" height="30"></iframe>
               </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className="flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen">
                    {this.state.screen}
                </div>
            </div>
        );
    }
}

export default AboutSincere;

export const displayAboutSincere = () => {
    return <AboutSincere />;
}


function About() {
    return (
        <div className="w-11/12 max-w-3xl py-6">
            <div className="flex flex-wrap items-center gap-4">
                <img className="w-20 rounded-full bg-white" src="./images/logos/bitmoji.png" alt="VoidX3D avatar" />
                <div><p className="text-xs uppercase tracking-[0.25em] text-orange-300">VoidX3D</p><h1 className="text-2xl font-bold">Full Stack Developer · Backend Engineer · AI Builder</h1><p className="mt-1 text-gray-300">Pokhara, Nepal · self-taught · building production-ready systems</p></div>
            </div>
            <p className="mt-6 leading-relaxed text-gray-200">I build local-first, privacy-oriented software, AI-powered APIs, and useful tools that ship. My work spans React, Next.js, TypeScript, Python, Kotlin, Node.js, Supabase, and Linux.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3"><div className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-xs text-orange-300">Focus</p><p className="mt-1 text-sm">Backend architecture, AI integrations, real-time apps</p></div><div className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-xs text-orange-300">Build style</p><p className="mt-1 text-sm">Clean architecture, privacy, and practical shipping</p></div><div className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-xs text-orange-300">Currently</p><p className="mt-1 text-sm">Learning cloud-native systems, MLOps, and open source</p></div></div>
            <a className="mt-6 inline-block text-orange-200 underline" href="https://github.com/VoidX3D" target="_blank" rel="noreferrer">Inspect the public GitHub profile →</a>
        </div>
    )
}
function Education() {
    return (
        <div className="w-11/12 max-w-3xl py-6">
            <h2 className="text-2xl font-bold">Learning path</h2>
            <p className="mt-2 text-gray-300">Public profiles identify Motherland Secondary School in Pokhara. The portfolio avoids inventing formal credentials and focuses on the practical work shipped in public repositories.</p>
            <div className="mt-5 space-y-3"><div className="rounded-lg border border-white/10 bg-black/20 p-4"><p className="font-bold">Self-taught development</p><p className="mt-1 text-sm text-gray-300">Started with HTML and CSS, then expanded into full-stack development, backend engineering, AI tooling, and system design.</p></div><div className="rounded-lg border border-white/10 bg-black/20 p-4"><p className="font-bold">Current learning</p><p className="mt-1 text-sm text-gray-300">Microservices, event-driven architecture, cloud-native delivery, machine-learning operations, and open-source contribution.</p></div></div>
        </div>
    )
}
function Skills() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    I've worked with a wide variety of programming languages & frameworks.
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div> My areas of expertise are <strong className="text-ubt-gedit-orange">front-end development, React.js & javascript!</strong></div>
                </li>
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <div>Here are my most frequently used</div>
                </li>
            </ul>
            <div className="w-full md:w-10/12 flex mt-4">
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Languages & Tools</div>
                <div className=" text-sm text-center md:text-base w-1/2 font-bold">Frameworks & Libraries</div>
            </div>
            <div className="w-full md:w-10/12 flex justify-center items-start font-bold text-center">
                <div className="px-2 w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className="m-1" src="https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A" alt="vivek javascript" />
                        <img className="m-1" src="https://img.shields.io/badge/C%2B%2B-00599C?style=flat&logo=c%2B%2B&logoColor=white" alt="vivek c++" />
                        <img className="m-1" src="https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="vivek python" />
                        <img className="m-1" src="https://img.shields.io/badge/Dart-0175C2?style=flat&logo=dart&logoColor=white" alt="vivek dart" />
                        <a href="https://www.google.com/search?q=is+html+a+language%3F" target="_blank" rel="noreferrer"><img title="yes it's a language!" className="m-1" src="https://img.shields.io/badge/-HTML5-%23E44D27?style=flat&logo=html5&logoColor=ffffff" alt="vivek HTML" /></a>
                        <img src="https://img.shields.io/badge/-Sass-%23CC6699?style=flat&logo=sass&logoColor=ffffff" alt="vivek SASS" className="m-1" />
                        <img src="https://img.shields.io/badge/-Git-%23F05032?style=flat&logo=git&logoColor=%23ffffff" alt="vivek git" className="m-1" />
                        <img src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat&logo=firebase&logoColor=ffffff" alt="vivek firebase" className="m-1" />
                    </div>
                </div>
                <div className="px-2 flex flex-wrap items-start w-1/2">
                    <div className="flex flex-wrap justify-center items-start w-full mt-2">
                        <img className=" m-1" src="https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=ffffff" alt="vivek next" />
                        <img className=" m-1" src="https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=ffffff" alt="vivek react" />
                        <img className="m-1" src="https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white" alt="vivek flutter" />
                        <img className="m-1" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="vivek tailwind css" />
                        <img src="https://img.shields.io/badge/-Nodejs-339933?style=flat&logo=Node.js&logoColor=ffffff" alt="vivek node.js" className="m-1" />
                        <img src="https://img.shields.io/badge/jQuery-0769AD?style=flat&logo=jquery&logoColor=white" alt="vivek jquery" className="m-1" />
                        <img className="m-1" src="https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white" alt="vivek redux" />
                    </div>
                </div>
            </div>
            <ul className=" tracking-tight text-sm md:text-base w-10/12 emoji-list mt-4">
                <li className=" list-arrow text-sm md:text-base mt-4 leading-tight tracking-tight">
                    <span> And of course,</span> <img className=" inline ml-1" src="https://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="vivek linux" /> <span>!</span>
                </li>
            </ul>
        </>
    )
}

function Projects() {
    const project_list = [
        {
            name: "Portfolio",
            date: "Oct 2025",
            link: "https://github.com/VoidX3D/Portfolio",
            description: [
                "Just a project for a portfolio."
            ],
            domains: ["javascript"]
        },
        {
            name: "New_Happy_Birthday_Uncle",
            date: "Oct 2025",
            link: "https://github.com/VoidX3D/New_Happy_Birthday_Uncle",
            description: [
                "Fun birthday celebration project using JavaScript."
            ],
            domains: ["javascript"]
        },
        {
            name: "Happy_Birthday_Uncle",
            date: "Oct 2025",
            link: "https://github.com/VoidX3D/Happy_Birthday_Uncle",
            description: [
                "A fun birthday celebration repository."
            ],
            domains: ["javascript"]
        },
        {
            name: "First-Website",
            date: "May 2025",
            link: "https://github.com/VoidX3D/First-Website",
            description: [
                "My first website project."
            ],
            domains: ["javascript", "html5", "css"]
        },
        {
            name: "ubuntu.websimulation.desktop",
            date: "Nov 2024",
            link: "https://github.com/VoidX3D/ubuntu.websimulation.desktop",
            description: [
                "Web simulation of Ubuntu 20.04, made using NEXT.js & Tailwind CSS."
            ],
            domains: ["javascript", "react", "tailwindcss"]
        },
        {
            name: "kahoot-gui",
            date: "Aug 2023",
            link: "https://github.com/VoidX3D/kahoot-gui",
            description: [
                "Kahoot Bot built with NodeJS and Electron."
            ],
            domains: ["javascript", "nodejs"]
        },
        {
            name: "anilist-clone",
            date: "Jan 2023",
            link: "https://github.com/VoidX3D/anilist-clone",
            description: [
                "UNOFFICIAL Anilist clone."
            ],
            domains: ["javascript"]
        },
        {
            name: "kahoot-clone-nodejs",
            date: "Dec 2022",
            link: "https://github.com/VoidX3D/kahoot-clone-nodejs",
            description: [
                "Clone of kahoot.it using NodeJS, supporting multiple live games and hosting."
            ],
            domains: ["javascript", "nodejs"]
        },
        {
            name: "kahootClone",
            date: "Feb 2021",
            link: "https://github.com/VoidX3D/kahootClone",
            description: [
                "Cloning 'Kahoot!' using AngularJS and Firebase for a Medium article."
            ],
            domains: ["javascript", "angularjs", "firebase"]
        },
        {
            name: "Kitsunex",
            date: "Jul 2025",
            link: "https://github.com/VoidX3D/Kitsunex",
            description: [
                "Stream anime with no Ads."
            ],
            domains: ["typescript", "react"]
        },
        {
            name: "Chrome-Dino",
            date: "Aug 2025",
            link: "https://github.com/VoidX3D/Chrome-Dino",
            description: [
                "Chrome Dino game recreation project."
            ],
            domains: ["javascript"]
        },
        {
            name: "chrome-game",
            date: "Aug 2025",
            link: "https://github.com/VoidX3D/chrome-game",
            description: [
                "Another Chrome game project."
            ],
            domains: ["javascript"]
        },
        {
            name: "dns-project-sincere",
            date: "Sep 2025",
            link: "https://github.com/VoidX3D/dns-project-sincere",
            description: [
                "DNS related project for learning purposes."
            ],
            domains: ["html5", "css"]
        },
        {
            name: "exhibition-quiz-prototype",
            date: "Sep 2025",
            link: "https://github.com/VoidX3D/exhibition-quiz-prototype",
            description: [
                "Testing game logic."
            ],
            domains: ["css", "javascript"]
        },
        {
            name: "Auto-Creator",
            date: "Oct 2025",
            link: "https://github.com/VoidX3D/Auto-Creator",
            description: [
                "Automation tool project."
            ],
            domains: ["javascript"]
        },
        {
            name: "kahoot-alternative",
            date: "Jul 2025",
            link: "https://github.com/VoidX3D/kahoot-alternative",
            description: [
                "Open source Kahoot alternative made with Next.js and Supabase."
            ],
            domains: ["typescript", "react", "nextjs"]
        },
        {
            name: "Main-Game",
            date: "Oct 2025",
            link: "https://github.com/VoidX3D/Main-Game",
            description: [
                "A project for a game file."
            ],
            domains: ["javascript"]
        },
        {
            name: "AniList",
            date: "Jun 2025",
            link: "https://github.com/VoidX3D/AniList",
            description: [
                "Anime listing web app."
            ],
            domains: ["javascript", "react"]
        },
        {
            name: "aniwatch-api",
            date: "Jul 2025",
            link: "https://github.com/VoidX3D/aniwatch-api",
            description: [
                "NodeJS API for obtaining anime data from hianime.to."
            ],
            domains: ["typescript", "nodejs"]
        }
    ];

    const tag_colors = {
        "javascript": "yellow-300",
        "typescript": "blue-300",
        "react": "blue-400",
        "python": "green-200",
        "html5": "pink-600",
        "css": "pink-400",
        "tailwindcss": "blue-300",
        "firebase": "red-600",
        "nodejs": "green-400",
        "angularjs": "red-400",
        "nextjs": "purple-500"
    }

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <div class="my-0.5 w-28 md:w-full h-20 px-2 md:px-2.5 flex justify-center">
                      <img src="https://github-readme-stats.vercel.app/api?username=VoidX3D&show_icons=true&theme=radical" alt="VoidX3D GitHub stats" class="rounded-md shadow-md w-full"/>
            </div>
            {
                project_list.map((project, index) => {
                    const projectNameFromLink = project.link.split('/')
                    const projectName = projectNameFromLink[projectNameFromLink.length - 1]
                    return (
                        <a key={index} href={project.link} target="_blank" rel="noreferrer" className="flex w-full flex-col px-4">
                            <div className="w-full py-1 px-2 my-2 border border-gray-50 border-opacity-10 rounded hover:bg-gray-50 hover:bg-opacity-5 cursor-pointer">
                                <div className="flex flex-wrap justify-between items-center">
                                    <div className='flex justify-center items-center'>
                                        <div className=" text-base md:text-lg mr-2">{project.name.toLowerCase()}</div>
                                        <iframe src={`https://ghbtns.com/github-btn.html?user=VoidX3D&repo=${projectName}&type=star&count=true`} frameBorder="0" scrolling="0" width="150" height="20" title={project.name.toLowerCase()+"-star"}></iframe>
                                    </div>
                                    <div className="text-gray-300 font-light text-sm">{project.date}</div>
                                </div>
                                <ul className=" tracking-normal leading-tight text-sm font-light ml-4 mt-1">
                                    {
                                        project.description.map((desc, index) => {
                                            return <li key={index} className="list-disc mt-1 text-gray-100">{desc}</li>;
                                        })
                                    }
                                </ul>
                                <div className="flex flex-wrap items-start justify-start text-xs py-2">
                                    {
                                        (project.domains ?
                                            project.domains.map((domain, index) => {
                                                return <span key={index} className={`px-1.5 py-0.5 w-max border border-${tag_colors[domain]} text-${tag_colors[domain]} m-1 rounded-full`}>{domain}</span>
                                            })
                                            : null)
                                    }
                                </div>
                            </div>
                        </a>
                    )
                })
            }
        </>
    )
}
function Profile() {
    return (
        <div className="w-11/12 max-w-3xl py-6">
            <p className="text-xs uppercase tracking-[0.25em] text-orange-300">GitHub README profile</p><h2 className="mt-2 text-2xl font-bold">VoidX3D in public</h2>
            <p className="mt-3 leading-relaxed text-gray-300">A 17-year-old full-stack developer and backend engineer from Pokhara, Nepal, with 3+ years of self-taught experience, focused on production-ready systems and AI-powered tools.</p>
            <div className="mt-5 flex flex-wrap gap-2">{['TypeScript','JavaScript','Python','Kotlin','Java','Go','Rust','React','Next.js','Supabase','Docker','Linux'].map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-orange-100">{skill}</span>)}</div>
            <div className="mt-6 flex flex-wrap gap-3"><a className="rounded bg-orange-600 px-3 py-2 text-sm font-bold" href="https://github.com/VoidX3D" target="_blank" rel="noreferrer">GitHub profile</a><a className="rounded border border-white/20 px-3 py-2 text-sm" href="https://github.com/VoidX3D/VoidX3D/blob/main/README.md" target="_blank" rel="noreferrer">Read full README</a></div>
        </div>
    )
}
