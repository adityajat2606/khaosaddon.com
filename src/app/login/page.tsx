'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, Building2, FileText, Image as ImageIcon, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'
import { useAuth } from '@/lib/auth-context'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_100%)] text-[#1f2a52]',
      panel: 'border border-[#d1daf0] bg-white',
      side: 'border border-[#d7def2] bg-[#f1f5ff]',
      muted: 'text-[#4f5b85]',
      action: 'bg-[#cd1f6f] text-white hover:bg-[#aa175c]',
      icon: Building2,
      title: 'Sign in to your discovery workspace',
      body: 'Manage listings, publish articles, and keep your local visibility profile up to date from one dashboard.',
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
      title: 'Sign in to your publication desk',
      body: 'Review submissions, publish high-quality articles, and keep your directory content synchronized.',
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
      title: 'Enter your creator workspace',
      body: 'Open your visual feed, manage profile details, and publish with the same branded layout system.',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    title: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const getNextPath = () => {
    if (typeof window === 'undefined') return null
    const next = new URLSearchParams(window.location.search).get('next')
    return next && next.startsWith('/') ? next : null
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    try {
      await login(email.trim(), password)
      const target = getNextPath() || '/'
      router.push(target)
    } catch {
      setError('Unable to sign in right now. Please try again.')
    }
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Article + listing workflow in one account', 'Branded dashboard with persistent local session', 'Fast access to posting and profile tools'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
                placeholder="Email address"
                type="email"
                autoComplete="email"
              />
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
                placeholder="Password"
                type="password"
                autoComplete="current-password"
              />
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <button type="submit" disabled={isLoading} className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action} disabled:opacity-70`}>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
