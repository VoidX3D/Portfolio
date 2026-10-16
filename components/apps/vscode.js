import React, { useState } from 'react'

const files = ['components/ubuntu.js', 'components/screen/desktop.js', 'components/apps/sincere.js', 'apps.config.js', 'README.md']

export default function VsCode() {
    const [selected, setSelected] = useState(files[0])
    return (
        <div className="flex h-full flex-col bg-[#1e1e1e] text-gray-200">
            <div className="flex items-center justify-between border-b border-black bg-[#252526] px-3 py-2 text-xs"><span className="font-bold text-blue-200">VoidX3D Workspace</span><a href="https://github.com/VoidX3D/Portfolio" target="_blank" rel="noreferrer" className="text-orange-200 underline">Open repository</a></div>
            <div className="flex min-h-0 flex-1">
                <aside className="w-2/5 max-w-[220px] border-r border-black bg-[#252526] p-2 text-xs"><p className="mb-2 uppercase tracking-widest text-gray-500">Explorer</p>{files.map((file) => <button key={file} onClick={() => setSelected(file)} className={`block w-full rounded px-2 py-2 text-left hover:bg-white/10 ${selected === file ? 'bg-blue-500/20 text-blue-100' : ''}`}>{file}</button>)}</aside>
                <main className="min-w-0 flex-1 p-4 font-mono text-xs leading-6"><p className="mb-4 text-gray-500">{selected}</p><pre className="whitespace-pre-wrap text-green-200">{`// This local preview stays available even when GitHub embeds are blocked.\n\nconst project = 'VoidX3D Portfolio';\nconst direction = 'local-first + privacy-minded';\n\nexport default project;`}</pre></main>
            </div>
        </div>
    )
}
export const displayVsCode = () => <VsCode />
