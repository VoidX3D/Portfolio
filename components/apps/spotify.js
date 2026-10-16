import React from 'react'

const playlistUrl = 'https://open.spotify.com/playlist/37i9dQZEVXbLZ52XmnySJg'

export default function Spotify() {
    return (
        <div className="flex h-full flex-col bg-black">
            <div className="flex items-center justify-between gap-3 bg-[#1db954] px-3 py-2 text-sm font-bold text-black"><span>Spotify — VoidX3D mix</span><a className="rounded bg-black/20 px-2 py-1 text-xs underline" href={playlistUrl} target="_blank" rel="noreferrer">Open Spotify</a></div>
            <iframe src="https://open.spotify.com/embed/playlist/37i9dQZEVXbLZ52XmnySJg?utm_source=generator" frameBorder="0" title="Spotify playlist" className="min-h-0 flex-1 w-full" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
        </div>
    )
}
export const displaySpotify = () => <Spotify />
