import React, { useEffect, useMemo, useState } from 'react'

const repo = 'VoidX3D/Portfolio'
const branch = 'main'
const files = [
    'README.md',
    'apps.config.js',
    'components/apps/spotify.js',
    'components/apps/vscode.js',
    'components/screen/desktop.js',
]

export default function VsCode() {
    const [selected, setSelected] = useState(files[0])
    const [contents, setContents] = useState({})
    const [error, setError] = useState('')
    useEffect(() => {
        let active = true
        Promise.all(files.map(async (file) => {
            const response = await fetch(`https://raw.githubusercontent.com/${repo}/${branch}/${file}`)
            if (!response.ok) throw new Error(`Unable to load ${file}`)
            return [file, await response.text()]
        })).then((entries) => active && setContents(Object.fromEntries(entries))).catch((loadError) => active && setError(loadError.message))
        return () => { active = false }
    }, [])
    const sourceUrl = useMemo(() => `https://github.com/${repo}/blob/${branch}/${selected}`, [selected])
    return (
        <div className="flex h-full flex-col bg-[#1e1e1e] text-gray-200">
            <div className="flex items-center justify-between border-b border-black bg-[#252526] px-3 py-2 text-xs"><span className="font-bold text-blue-200">VS Code — {repo}</span><a href={`https://github.com/${repo}`} target="_blank" rel="noreferrer" className="text-orange-200 underline">Open official repo</a></div>
            <div className="flex min-h-0 flex-1">
                <aside className="w-2/5 max-w-[240px] border-r border-black bg-[#252526] p-2 text-xs"><p className="mb-2 uppercase tracking-widest text-gray-500">Explorer · main</p>{files.map((file) => <button key={file} onClick={() => setSelected(file)} className={`block w-full rounded px-2 py-2 text-left hover:bg-white/10 ${selected === file ? 'bg-blue-500/20 text-blue-100' : ''}`}>{file}</button>)}</aside>
                <main className="min-w-0 flex-1 overflow-auto p-4 font-mono text-xs leading-6"><div className="mb-4 flex items-center justify-between gap-2 text-gray-500"><span>{selected}</span><a href={sourceUrl} target="_blank" rel="noreferrer" className="text-orange-200 underline">View on GitHub</a></div>{error && <p className="text-red-300">{error}. Open the official repository to browse the source.</p>}<pre className="whitespace-pre-wrap text-green-200">{contents[selected] || 'Loading source from the official repository…'}</pre></main>
            </div>
        </div>
    )
}
export const displayVsCode = () => <VsCode />
