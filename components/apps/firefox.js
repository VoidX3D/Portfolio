import React, { useState } from 'react'

export default function Firefox() {
    const [url, setUrl] = useState('https://www.mozilla.org/firefox/')
    const [address, setAddress] = useState('https://www.mozilla.org/firefox/')
    const navigate = (event) => {
        event.preventDefault()
        let next = address.trim()
        if (!next) return
        if (!/^https?:\/\//i.test(next)) next = `https://${next}`
        setUrl(next)
        setAddress(next)
    }
    return (
        <div className="flex h-full flex-col bg-[#20123a]">
            <form onSubmit={navigate} className="flex gap-2 border-b border-black/60 bg-[#2b174d] p-2">
                <input aria-label="Firefox address" value={address} onChange={(event) => setAddress(event.target.value)} className="min-w-0 flex-1 rounded-full bg-[#150d24] px-3 py-1 text-sm text-white outline-none ring-orange-400 focus:ring-1" />
                <button className="rounded bg-[#ff7139] px-3 text-xs font-bold text-white" type="submit">Go</button>
            </form>
            <div className="flex items-center justify-between bg-black/30 px-3 py-1 text-xs text-gray-300"><span>Mozilla Firefox preview</span><a className="text-orange-200 underline" href={url} target="_blank" rel="noreferrer">Open externally</a></div>
            <iframe title="Mozilla Firefox preview" src={url} className="min-h-0 flex-1 w-full bg-white" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts" />
        </div>
    )
}
export const displayFirefox = () => <Firefox />
