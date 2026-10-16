import Head from 'next/head'
import { withBasePath } from '../../lib/routes'

const content = {
    privacy: {
        title: 'Privacy Policy',
        intro: 'VoidX3D keeps this portfolio simple and privacy-minded. Essential preferences stay in your browser. Optional analytics are disabled until you choose to allow them.',
        sections: [
            ['What is collected', 'If you allow analytics, the site may record an anonymous session identifier, page or app events, locale, and timezone. The site does not intentionally store raw IP addresses or sensitive personal details in analytics. Contact messages include the information you submit.'],
            ['Why it is collected', 'Analytics help identify broken apps and improve the interface. Contact details are used only to respond to your message.'],
            ['Your choices', 'You can reject optional analytics, change your choice, or clear local storage from your browser. Functional preferences such as wallpaper and app history can be reset from the desktop context menu.'],
            ['Retention and sharing', 'Analytics and contact records are stored in the VoidX3D Supabase project. Contact submissions are private and are not published. Service providers may process data only to operate hosting, analytics, email, and database features.'],
            ['Contact', 'For privacy questions, email playzspreston2@gmail.com or use the Contact Me app.'],
        ],
    },
    cookies: {
        title: 'Cookie Policy',
        intro: 'This portfolio primarily uses browser local storage rather than tracking cookies.',
        sections: [
            ['Essential storage', 'The desktop uses local storage for wallpaper choice, first-visit state, app frequency, lock state, and consent preference. These features do not require optional analytics consent.'],
            ['Optional analytics', 'Vercel Analytics, Speed Insights, and anonymous Supabase event logging are loaded only after you select Allow analytics.'],
            ['Managing choices', 'Use the Privacy Policy settings link to review your decision. You can also clear site data in your browser settings.'],
        ],
    },
    terms: {
        title: 'Terms of Use',
        intro: 'This is a personal portfolio and interactive demonstration. Please use external links and embedded services according to their own terms.',
        sections: [
            ['Content', 'Project names, descriptions, and links are provided for portfolio and educational purposes. External services and repositories remain owned by their respective providers.'],
            ['Availability', 'The site is provided as-is. Embedded services can be unavailable, blocked, or changed by their providers; direct fallback links are provided where possible.'],
            ['Contact submissions', 'Do not send passwords, payment details, private keys, or other sensitive information through the contact form.'],
            ['Updates', 'These terms may change when the portfolio gains new services or data practices. The effective version is the one published on this page.'],
        ],
    },
}

export default function LegalPage({ kind }) {
    const page = content[kind]
    return <>
        <Head><title>{page.title} — VoidX3D</title><meta name="description" content={page.intro} /></Head>
        <main className="min-h-screen bg-[#111] px-5 py-12 font-sans text-gray-100">
            <article className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl md:p-10">
                <a href={withBasePath('/')} className="text-sm text-orange-300 underline">← Return to VoidX3D</a>
                <p className="mt-8 text-xs uppercase tracking-[0.3em] text-orange-300">VoidX3D</p>
                <h1 className="mt-2 text-4xl font-bold">{page.title}</h1>
                <p className="mt-4 leading-7 text-gray-300">{page.intro}</p>
                {page.sections.map(([heading, body]) => <section key={heading} className="mt-8" id={heading === 'Managing choices' ? 'settings' : undefined}><h2 className="text-xl font-bold text-white">{heading}</h2><p className="mt-2 leading-7 text-gray-300">{body}</p></section>)}
                <p className="mt-10 border-t border-white/10 pt-4 text-xs text-gray-500">Last updated: October 16, 2026</p>
            </article>
        </main>
    </>
}
