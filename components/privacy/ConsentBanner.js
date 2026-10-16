import React, { useEffect, useState } from 'react'
import { CONSENT_STORAGE_KEY, getConsent, recordConsent } from '../../lib/telemetry'
import { withBasePath } from '../../lib/routes'

export default function ConsentBanner() {
    const [consent, setConsent] = useState(null)

    useEffect(() => {
        setConsent(getConsent())
    }, [])

    const choose = async (value) => {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, value)
        setConsent(value)
        window.dispatchEvent(new Event('voidx3d-consent-change'))
        await recordConsent(value === 'accepted' ? 'accepted' : 'rejected')
    }

    if (consent) return null

    return (
        <div className="fixed bottom-3 left-3 right-3 md:left-auto md:right-5 md:max-w-md z-[90] rounded-xl border border-white/15 bg-black/90 p-4 text-white shadow-2xl backdrop-blur-xl" role="dialog" aria-label="Privacy choices">
            <p className="text-sm font-bold text-orange-200">Privacy choices</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-300">VoidX3D uses essential local storage for desktop preferences. Optional analytics are off until you allow them. Read the <a className="underline text-orange-200" href={withBasePath('/privacy')}>Privacy Policy</a> and <a className="underline text-orange-200" href={withBasePath('/cookies')}>Cookie Policy</a>.</p>
            <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" onClick={() => choose('accepted')} className="rounded bg-ub-orange px-3 py-1.5 text-xs font-bold hover:brightness-110">Allow analytics</button>
                <button type="button" onClick={() => choose('rejected')} className="rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10">Reject optional</button>
                <a href={`${withBasePath('/privacy')}#settings`} className="rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10">Settings</a>
            </div>
        </div>
    )
}
