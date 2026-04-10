'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'

export default function SettingsPage() {
  const router = useRouter()
  const { user, updateUser, logout } = useAuth()
  const { toast } = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public')

  useEffect(() => {
    if (!user) {
      router.replace('/login?next=/settings')
      return
    }

    setName(user.name || '')
    setEmail(user.email || '')
    setBio(user.bio || '')
    setLocation(user.location || '')
    setWebsite(user.website || '')

    const stored = loadFromStorage<Record<string, any>>(storageKeys.settings, {})
    if (typeof stored.emailNotifications === 'boolean') setEmailNotifications(stored.emailNotifications)
    if (typeof stored.weeklyDigest === 'boolean') setWeeklyDigest(stored.weeklyDigest)
    if (stored.profileVisibility === 'private' || stored.profileVisibility === 'public') {
      setProfileVisibility(stored.profileVisibility)
    }
  }, [router, user])

  const saveSettings = () => {
    if (!user) return

    updateUser({
      name: name.trim() || user.name,
      email: email.trim() || user.email,
      bio: bio.trim() || user.bio,
      location: location.trim() || undefined,
      website: website.trim() || undefined,
    })

    const stored = loadFromStorage<Record<string, any>>(storageKeys.settings, {})
    saveToStorage(storageKeys.settings, {
      ...stored,
      emailNotifications,
      weeklyDigest,
      profileVisibility,
    })

    toast({
      title: 'Settings saved',
      description: 'Your account preferences were updated.',
    })
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f5f8ff_0%,#ffffff_100%)]">
      <NavbarShell />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-[#1f2a52]">Settings</h1>
        <p className="mt-2 text-sm text-[#4f5b85]">Simple account settings for profile and preferences.</p>

        <div className="mt-8 grid gap-6">
          <Card className="border-[#d2daf0] bg-white">
            <CardHeader>
              <CardTitle className="text-[#1f2a52]">Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#d2daf0] bg-white">
            <CardHeader>
              <CardTitle className="text-[#1f2a52]">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1f2a52]">Email notifications</p>
                  <p className="text-xs text-[#5c6994]">Receive updates about your posts and account.</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#1f2a52]">Weekly digest</p>
                  <p className="text-xs text-[#5c6994]">Get a weekly activity summary.</p>
                </div>
                <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="visibility">Profile visibility</Label>
                <select
                  id="visibility"
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility((e.target.value as 'public' | 'private') || 'public')}
                  className="h-10 rounded-xl border border-[#ccd4ed] bg-white px-3 text-sm text-[#1f2a52]"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#d2daf0] bg-white">
            <CardHeader>
              <CardTitle className="text-[#1f2a52]">Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-[#4f5b85]">Use this if you want to sign out from this browser.</p>
              <Separator />
              <Button variant="outline" onClick={handleLogout}>Sign out</Button>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={saveSettings} className="bg-[#cd1f6f] text-white hover:bg-[#aa175c]">
              Save changes
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
