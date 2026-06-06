'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useLoginMutation } from '@/lib/api/authApi'
import { useAppDispatch } from '@/lib/hooks'
import { setCredentials } from '@/lib/features/authSlice'

function RobotSmall() {
  return (
    <svg width="140" height="170" viewBox="0 0 140 170" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="70" y1="18" x2="70" y2="42" stroke="#1C1B19" strokeWidth="2"/>
      <circle cx="70" cy="14" r="5" fill="#C84B31"/>
      <rect x="30" y="42" width="80" height="66" rx="14" fill="#1C1B19"/>
      <circle cx="52" cy="73" r="9" fill="#C84B31"/>
      <circle cx="88" cy="73" r="9" fill="#C84B31"/>
      <circle cx="52" cy="73" r="3.5" fill="#1C1B19"/>
      <circle cx="88" cy="73" r="3.5" fill="#1C1B19"/>
      <circle cx="70" cy="94" r="2.5" fill="#C84B31"/>
      <rect x="59" y="108" width="22" height="12" rx="4" fill="#1C1B19"/>
      <rect x="22" y="120" width="96" height="50" rx="14" fill="#1C1B19"/>
      <circle cx="50" cy="148" r="5" fill="#C84B31"/>
      <circle cx="90" cy="148" r="5" fill="#C84B31" opacity="0.35"/>
      <rect x="14" y="60" width="12" height="7" rx="3.5" fill="#FAF8F4" opacity="0.12"/>
      <rect x="114" y="60" width="12" height="7" rx="3.5" fill="#FAF8F4" opacity="0.12"/>
    </svg>
  )
}

type Role = 'student' | 'teacher' | 'admin'

export default function LoginPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const [role, setRole] = useState<Role>('student')
  const [formData, setFormData] = useState({ username: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await login(formData).unwrap()
      const userResponse = await fetch('http://localhost:8000/api/v1/auth/me', {
        headers: { 'Authorization': `Bearer ${result.access_token}` }
      })
      const user = await userResponse.json()
      dispatch(setCredentials({ user, token: result.access_token }))
      router.push('/dashboard')
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const roles: Role[] = ['student', 'teacher', 'admin']
  const roleLabels: Record<Role, string> = { student: 'Student', teacher: 'Teacher', admin: 'Admin' }
  const rolePrefixes: Record<Role, string> = { student: 'I AM A', teacher: 'I AM A', admin: 'I AM AN' }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--cream)',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
    }}>
      {/* Left — editorial panel */}
      <div style={{
        padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column',
        background: 'var(--cream)',
        borderRight: '1px solid var(--border)',
        position: 'relative',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill="#C84B31"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '0.02em', color: 'var(--ink)' }}>ATLAS</span>
        </div>

        {/* Quote block */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '1.5rem' }}>
            Returning to Learn
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3.25rem)', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 1.5rem 0' }}>
            "Pick up exactly<br />
            where you<br />
            <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>left off.</em>"
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--taupe)', lineHeight: 1.7, maxWidth: '340px', fontWeight: 400 }}>
            Your knowledge model, conversation history, and mastery map travel with you across every device.
          </p>
        </div>

        {/* Robot + footer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem' }}>
          <RobotSmall />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 400 }}>
            Vol. III · Issue 04
          </span>
        </div>
      </div>

      {/* Right — form */}
      <div style={{
        padding: '2.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: 'var(--cream-dark)',
      }}>
        <div style={{ maxWidth: '440px', width: '100%' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '0.75rem' }}>
            Sign In
          </div>
          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: '2.25rem', lineHeight: 1.1, color: 'var(--ink)', margin: '0 0 3rem 0' }}>
            Continue your session.
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)', display: 'block', marginBottom: '0.75rem' }}>
                Email
              </label>
              <input
                type="text"
                required
                placeholder="aria.tan@school.edu"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  borderBottom: '1px solid var(--border)', padding: '0.5rem 0',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--ink)',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)', display: 'block', marginBottom: '0.75rem' }}>
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  borderBottom: '1px solid var(--border)', padding: '0.5rem 0',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--ink)',
                  outline: 'none',
                }}
              />
            </div>

            {error && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--terracotta)' }}>
                Login failed. Please check your credentials.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', background: 'var(--terracotta)', color: '#fff',
                fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', fontWeight: 500,
                padding: '1rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                opacity: isLoading ? 0.7 : 1, transition: 'background 0.2s',
              }}
            >
              {isLoading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          {/* OR divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}/>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--taupe)' }}>or continue as</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}/>
          </div>

          {/* Role pills */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1, border: `1.5px solid ${role === r ? 'var(--ink)' : 'var(--border)'}`,
                  borderRadius: '2rem', padding: '0.875rem 0.5rem', background: 'transparent',
                  cursor: 'pointer', textAlign: 'center', transition: 'border-color 0.2s',
                }}
              >
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.5625rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '0.25rem', fontWeight: 500 }}>
                  {rolePrefixes[r]}
                </div>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: 'var(--ink)', fontWeight: 400 }}>
                  {roleLabels[r]}
                </div>
              </button>
            ))}
          </div>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--taupe)' }}>
            New here?{' '}
            <Link href="/auth/register" style={{ color: 'var(--terracotta)', fontStyle: 'italic', fontFamily: 'Playfair Display, Georgia, serif', textDecoration: 'none' }}>
              Create an account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
