import React, { useEffect, useState } from 'react'
import { getPublishedProjects } from '../../lib/telemetry'

export default function Projects() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getPublishedProjects().then(setProjects).finally(() => setLoading(false))
    }, [])
    return <div className="h-full overflow-y-auto bg-ub-cool-grey p-4 text-white windowMainScreen">
        <div className="mb-4 border-b border-white/10 pb-3"><p className="text-xs uppercase tracking-[0.25em] text-orange-300">VoidX3D database</p><h2 className="text-2xl font-bold">Projects</h2><p className="mt-1 text-sm text-gray-300">Maintained from the privacy-safe portfolio content table.</p></div>
        {loading && <p className="text-sm text-gray-400">Loading published projects…</p>}
        {!loading && projects.length === 0 && <p className="text-sm text-gray-400">Project data is temporarily unavailable. Browse the <a className="text-orange-200 underline" href="https://github.com/VoidX3D" target="_blank" rel="noreferrer">GitHub profile</a>.</p>}
        <div className="grid gap-3 md:grid-cols-2">{projects.map((project) => <article key={project.slug} className="rounded-xl border border-white/10 bg-black/20 p-4"><div className="flex items-start justify-between gap-2"><h3 className="font-bold">{project.name}</h3>{project.featured && <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[10px] uppercase text-orange-200">Featured</span>}</div><p className="mt-2 text-sm leading-relaxed text-gray-300">{project.summary}</p><div className="mt-3 flex flex-wrap gap-1">{(project.technologies || []).map((tech) => <span key={tech} className="rounded bg-white/10 px-2 py-1 text-[10px] text-gray-300">{tech}</span>)}</div><a className="mt-3 inline-block text-xs text-orange-200 underline" href={project.repository_url || project.url} target="_blank" rel="noreferrer">View source</a></article>)}</div>
    </div>
}
export const displayProjects = () => <Projects />
