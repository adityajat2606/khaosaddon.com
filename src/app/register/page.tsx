'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { useAuth } from '@/lib/auth-context'

function getRegisterConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)] text-[#1f2a52]',
      panel: 'border border-[#d1daf0] bg-white',
      side: 'border border-[#d7def2] bg-[#f1f5ff]',
      muted: 'text-[#4f5b85]',
      action: 'bg-[#cd1f6f] text-white hover:bg-[#aa175c]',
      icon: Building2,
      title: 'Create your publisher and listing account',
      body: 'Set up one profile for article publishing, listing management, and local discovery workflows.',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#f6f3ee] text-[#1f2a52]',
      panel: 'border border-[#d3daee] bg-[#fffdfa]',
      side: 'border border-[#d8deee] bg-[#f1f3f9]',
      muted: 'text-[#56628c]',
      action: 'bg-[#cd1f6f] text-white hover:bg-[#aa175c]',
      icon: FileText,
      title: 'Start your contributor workspace',
      body: 'Create a profile for long-form articles, editorial updates, and public listing contributions.',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      title: 'Set up your creator profile',
      body: 'Launch a visual-first account with gallery publishing, identity surfaces, and profile-led discovery.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Create a curator account',
    body: 'Build shelves, save references, and connect collections to your profile without a generic feed setup.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [intent, setIntent] = useState('')
  const [error, setError] = useState('')
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  const getNextPath = () => {
    if (typeof window === 'undefined') return null
    const next = new URLSearchParams(window.location.search).get('next')
    return next && next.startsWith('/') ? next : null
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getRegisterConfig(productKind)
  const Icon = config.icon

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please complete all required fields.')
      return
    }

    try {
      await signup(name.trim(), email.trim(), password)
      const target = getNextPath() || '/'
      router.push(target)
    } catch {
      setError('Unable to create your account right now. Please try again.')
    }
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Profile, listings, and article tools together', 'Consistent branded UX across all sections', 'Local session is saved after sign up'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <input value={name} onChange={(event) => setName(event.target.value)} className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="Full name" autoComplete="name" />
              <input value={email} onChange={(event) => setEmail(event.target.value)} className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="Email address" autoComplete="email" type="email" />
              <input value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="Password" type="password" autoComplete="new-password" />
              <input value={intent} onChange={(event) => setIntent(event.target.value)} className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm" placeholder="What are you creating or publishing?" />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button type="submit" disabled={isLoading} className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action} disabled:opacity-70`}>{isLoading ? 'Creating account...' : 'Create account'}</button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
