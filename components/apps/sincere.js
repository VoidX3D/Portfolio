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
            "resume": <Resume />,
        }

        let lastVisitedScreen = localStorage.getItem("about-section");
        if (!lastVisitedScreen) lastVisitedScreen = "about";

        this.changeScreen(document.getElementById(lastVisitedScreen));
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

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
                    <img className=" w-3 md:w-4" alt="about Sincere" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Sincere</span>
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
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="Sincere's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
                <div class="my-0.5 w-28 md:w-full h-20 px-2 md:px-2.5 flex justify-center">
                <iframe src="https://ghbtns.com/github-btn.html?user=VoidX3D&type=follow&count=true" title="Follow VoidX3D on GitHub" class="pl-4 my-4 w-5/6 md:w-3/4" frameborder="0" scrolling="0" height="30"></iframe>
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
        <>
            <div className="w-20 md:w-28 my-4 bg-white rounded-full">
                <img className="w-full" src="./images/logos/bitmoji.png" alt="Sincere Bhattarai Logo" />
            </div>
            <div className=" mt-4 md:mt-8 text-lg md:text-2xl text-center px-1">
                <div>my name is <span className="font-bold">Sincere Bhattarai</span> ,</div>
                <div className="font-normal ml-1">I'm a <span className="text-pink-600 font-bold">Self-Taught Developer!</span></div>
            </div>
            <div className=" mt-4 relative md:my-8 pt-px bg-white w-32 md:w-48">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className=" mt-4 leading-tight tracking-tight text-sm md:text-base w-5/6 md:w-3/4 emoji-list">
                <li className=" list-pc">
                    I'm a <span className=" font-medium">Class 9 Student</span> at Motherland Secondary School, Pokhara.  
                    I love creating projects with Python, HTML, CSS, and JS, and building anime and web-related tools.  
                    ( Hit me up <a className='text-underline' href='mailto:playzspreston2@gmail.com'><u>@playzspreston2@gmail.com</u></a> :) )
                </li>
                <li className=" mt-3 list-building">I enjoy building fully functional interfaces, APIs, and real-time web apps.</li>
                <li className=" mt-3 list-time">
                    When I am not coding my next project, I like to spend my time watching anime, exploring programming ideas, or learning new technologies.
                </li>
                <li className=" mt-3 list-star">I also have strong interest in AI, Backend Development, and creating enterprise-level applications!</li>
            </ul>
        </>
    )
}

function Education() {
    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>
            <ul className=" w-10/12  mt-4 ml-4 px-0 md:px-1">
                <li className="list-disc">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Motherland Secondary School, Pokhara
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2024 - Present</div>
                    <div className=" text-sm md:text-base">Class 9D - Self-Taught Computer Studies</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Focus &nbsp; AI, Python, HTML, CSS, JS</div>
                </li>
                <li className="list-disc mt-5">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Class 8
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2023 - 2024</div>
                    <div className=" text-sm md:text-base">Maths, Science, Computers</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Achievement &nbsp; Strong coding foundation</div>
                </li>
                <li className="list-disc mt-5">
                    <div className=" text-lg md:text-xl text-left font-bold leading-tight">
                        Class 7
                    </div>
                    <div className=" text-sm text-gray-400 mt-0.5">2022 - 2023</div>
                    <div className=" text-sm md:text-base">Maths, Science, Computers</div>
                    <div className="text-sm text-gray-300 font-bold mt-1">Achievement &nbsp; Started building small projects</div>
                </li>
            </ul>
        </>
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
                        <img className="m-1" src="http://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=ffffff" alt="vivek python" />
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
                    <span> And of course,</span> <img className=" inline ml-1" src="http://img.shields.io/badge/-Linux-0078D6?style=plastic&logo=linux&logoColor=ffffff" alt="vivek linux" /> <span>!</span>
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
function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/Vivek-Patel-Resume.pdf" title="vivek patel resume" frameBorder="0"></iframe>
    )
}
