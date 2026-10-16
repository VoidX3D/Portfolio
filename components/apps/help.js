import React from 'react'
import { withBasePath } from '../../lib/routes'

export default function Help() {
    return (
        <div className="h-full overflow-y-auto bg-ub-cool-grey p-5 text-white windowMainScreen">
            <div className="mb-5 border-b border-white/10 pb-4">
                <p className="text-xs uppercase tracking-[0.25em] text-orange-300">VoidX3D Help</p>
                <h2 className="mt-1 text-2xl font-bold">Workspace shortcuts</h2>
                <p className="mt-2 text-sm text-gray-300">A quick guide to the interactive Ubuntu-style portfolio.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
                {[
                    ['Ctrl + Alt + T', 'Open Terminal'],
                    ['Double click', 'Launch a desktop app'],
                    ['Drag title bar', 'Move a window'],
                    ['Esc', 'Close context menus'],
                ].map(([shortcut, label]) => <div key={shortcut} className="rounded-lg border border-white/10 bg-black/20 p-3"><kbd className="rounded bg-black/50 px-2 py-1 text-xs text-orange-200">{shortcut}</kbd><p className="mt-2 text-sm">{label}</p></div>)}
            </div>
            <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4 text-sm text-gray-300">
                <p className="font-bold text-white">Privacy</p>
                <p className="mt-1">Optional analytics are consent-gated. Reopen your choices from the <a className="text-orange-200 underline" href={`${withBasePath('/privacy')}#settings`}>Privacy Center</a>.</p>
            </div>
        </div>
    )
}
export const displayHelp = () => <Help />
