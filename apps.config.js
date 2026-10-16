import { displaySpotify } from './components/apps/spotify';
import { displayVsCode } from './components/apps/vscode';
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayCalendar } from './components/apps/calendar';
import { displayChromeDino } from './components/apps/chrome-dino';
import { displayTrash } from './components/apps/trash';
import { displayGedit } from './components/apps/gedit';
import { displayTerminalCalc } from './components/apps/calc';
import { displayAboutSincere } from './components/apps/sincere';
import { displayHelp } from './components/apps/help';
import { displayProjects } from './components/apps/projects';
import { displayFirefox } from './components/apps/firefox';
import { withBasePath } from './lib/routes';
const apps = [
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChrome,
    },
    {
        id: "firefox",
        title: "Mozilla Firefox",
        icon: './themes/Yaru/apps/firefox.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayFirefox,
    },
    {
        id: "chrome-dino",
        title: "Chrome-Dino",
        icon: './themes/Yaru/apps/dino.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChromeDino,
    },
    {
        id: "calc",
        title: "Calc",
        icon: './themes/Yaru/apps/calc.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminalCalc,
    },
    {
        id: "about-sincere",
        title: "About VoidX3D",
        icon: './themes/Yaru/system/user-home.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAboutSincere,
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        icon: './themes/Yaru/apps/vscode.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayVsCode,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/bash.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "spotify",
        title: "Spotify",
        icon: './themes/Yaru/apps/spotify.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySpotify, // User-provided VoidX3D playlist
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/gnome-control-center.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySettings,
    },
    {
        id: "help",
        title: "Help & Shortcuts",
        icon: './themes/Yaru/apps/help.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayHelp,
    },
    {
        id: "projects",
        title: "VoidX3D Projects",
        icon: './themes/Yaru/apps/projects.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayProjects,
    },
    {
        id: "privacy",
        title: "Privacy Center",
        icon: './themes/Yaru/apps/privacy.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        isExternalApp: true,
        url: `${withBasePath('/privacy')}#settings`,
        screen: () => { },
    },
    {
        id: "trash",
        title: "Trash",
        icon: './themes/Yaru/system/user-trash-full.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayTrash,
    },
    {
        id: "gedit",
        title: "Contact Me",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayGedit,
    },
     {
        id: "calendar",
        title: "Void Calendar",
        icon: './themes/Yaru/apps/calendar.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayCalendar,
    },
    {
        id: "github",
        title: "GitHub",
        icon: './themes/Yaru/apps/github.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        isExternalApp: true,
        url: "https://github.com/VoidX3D",
        screen: () => { },
    },
    {
        id: "tars",
        title: "Ask Tars",
        icon: './themes/Yaru/apps/tars.svg',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        isExternalApp: true,
        url: "https://ubuntu.hellotars.com/conv/Orm8EJ",
        screen: () => { },
    },
]

export default apps;
