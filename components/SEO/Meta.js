import React from 'react'
import Head from 'next/head'

const siteUrl = 'https://voidx3d.vercel.app'
const title = 'VoidX3D — Privacy-minded Developer Portfolio'
const description = 'Explore VoidX3D’s interactive Ubuntu-style portfolio, local-first projects, developer tools, and ways to get in touch.'

export default function Meta() {
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="description" content={description} />
            <meta name="author" content="VoidX3D (Sincere Bhattarai)" />
            <meta name="keywords" content="VoidX3D, Sincere Bhattarai, developer portfolio, local-first software, privacy-oriented software, React, Next.js, Kotlin, Linux" />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#E95420" />
            <link rel="canonical" href={`${siteUrl}/`} />
            <link rel="manifest" href="/Portfolio/site.webmanifest" />
            <link rel="icon" href="/Portfolio/images/logos/fevicon.svg" />
            <link rel="apple-touch-icon" href="/Portfolio/images/logos/logo.png" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={`${siteUrl}/`} />
            <meta property="og:site_name" content="VoidX3D" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:creator" content="@VoidX3D" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
        </Head>
    )
}
