import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
export const supabase = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null

export const CONSENT_STORAGE_KEY = 'voidx3d-consent'
export const SESSION_STORAGE_KEY = 'voidx3d-session'

export function getConsent() {
    if (typeof window === 'undefined') return null
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
}

export function getSessionKey() {
    if (typeof window === 'undefined') return null
    let sessionKey = window.localStorage.getItem(SESSION_STORAGE_KEY)
    if (!sessionKey) {
        sessionKey = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`
        window.localStorage.setItem(SESSION_STORAGE_KEY, sessionKey)
    }
    return sessionKey
}

export async function recordConsent(decision) {
    if (!supabase || typeof window === 'undefined') return
    const sessionKey = getSessionKey()
    if (!sessionKey) return
    await supabase.from('consent_events').insert({
        session_key: sessionKey,
        decision,
        analytics_allowed: decision === 'accepted',
        functional_allowed: true,
    })
}

export async function trackEvent(eventName, payload = {}) {
    if (!supabase || getConsent() !== 'accepted') return
    const sessionKey = getSessionKey()
    if (!sessionKey) return
    const safeMetadata = Object.fromEntries(
        Object.entries(payload).filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value)).slice(0, 20)
    )
    await supabase.from('analytics_events').insert({
        session_key: sessionKey,
        event_name: eventName,
        page_path: window.location.pathname,
        app_id: safeMetadata.app_id || null,
        metadata: safeMetadata,
    })
}

export async function getPublishedProjects() {
    if (!supabase) return []
    const { data } = await supabase.from('portfolio_projects').select('slug,name,summary,url,repository_url,technologies,featured').eq('is_published', true).order('sort_order', { ascending: true }).limit(12)
    return data || []
}
