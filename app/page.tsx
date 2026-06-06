'use client'

import Link from 'next/link'

// Robot SVG illustration matching Direction A
function RobotIllustration() {
  return (
    <svg width="220" height="260" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric rings */}
      <circle cx="110" cy="130" r="105" stroke="#D8D0C4" strokeWidth="1" fill="none" opacity="0.5"/>
      <circle cx="110" cy="130" r="75" stroke="#D8D0C4" strokeWidth="1" fill="none" opacity="0.7"/>
      {/* Antenna */}
      <line x1="110" y1="40" x2="110" y2="70" stroke="#1C1B19" strokeWidth="2"/>
      <circle cx="110" cy="36" r="6" fill="#C84B31"/>
      {/* Head */}
      <rect x="65" y="70" width="90" height="80" rx="16" fill="#1C1B19"/>
      {/* Eyes */}
      <circle cx="90" cy="108" r="10" fill="#C84B31"/>
      <circle cx="130" cy="108" r="10" fill="#C84B31"/>
      <circle cx="90" cy="108" r="4" fill="#1C1B19"/>
      <circle cx="130" cy="108" r="4" fill="#1C1B19"/>
      {/* Mouth dot */}
      <circle cx="110" cy="130" r="3" fill="#C84B31"/>
      {/* Neck */}
      <rect x="98" y="150" width="24" height="14" rx="4" fill="#1C1B19"/>
      {/* Body */}
      <rect x="60" y="164" width="100" height="70" rx="16" fill="#1C1B19"/>
      {/* Body accents */}
      <circle cx="85" cy="195" r="6" fill="#C84B31"/>
      <circle cx="135" cy="195" r="6" fill="#C84B31" opacity="0.4"/>
      {/* Ear bumps */}
      <rect x="52" y="95" width="13" height="8" rx="4" fill="#FAF8F4" opacity="0.15"/>
      <rect x="155" y="95" width="13" height="8" rx="4" fill="#FAF8F4" opacity="0.15"/>
    </svg>
  )
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '64px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--cream)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill="#C84B31"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '0.02em', color: 'var(--ink)' }}>ATLAS</span>
          <span style={{ color: 'var(--border)', margin: '0 0.25rem' }}>·</span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--taupe)', fontWeight: 400 }}>Personalized Robot</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['Platform','Research','For Students','For Educators','About'].map(item => (
            <a key={item} href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--taupe)', textDecoration: 'none', fontWeight: 400 }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--taupe)')}
            >{item}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/auth/login" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--ink)', textDecoration: 'none', fontWeight: 400 }}>Sign in</Link>
          <Link href="/auth/login" style={{
            background: 'var(--ink)', color: '#fff',
            fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 500,
            padding: '0.5rem 1.25rem', borderRadius: '2rem', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '0.375rem',
          }}>Begin learning →</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 64px - 56px)' }}>
        {/* Left */}
        <div style={{ padding: '4rem 3rem 3rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--terracotta)' }}/>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
              Adaptive Learning · Est. 2025
            </span>
          </div>

          <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 1.05, color: 'var(--ink)', margin: '0 0 1.5rem 0' }}>
            A tutor that<br />
            learns the<br />
            way <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>you</em> learn.
          </h1>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', color: 'var(--taupe)', lineHeight: 1.7, maxWidth: '440px', margin: '0 0 2.5rem 0', fontWeight: 400 }}>
            Atlas pairs Bayesian knowledge tracing with conversational AI, so every question, hint, and lesson adapts to the learner in the chair — in real time.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/auth/login" style={{
              background: 'var(--terracotta)', color: '#fff',
              fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500,
              padding: '0.8125rem 1.75rem', borderRadius: '2rem', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center',
            }}>Start a session</Link>
            <button style={{
              background: 'transparent', border: '1.5px solid var(--border)',
              fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 400,
              padding: '0.75rem 1.5rem', borderRadius: '2rem', cursor: 'pointer',
              color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '0.375rem',
            }}>Watch the demo · 2:14</button>
          </div>
        </div>

        {/* Right — robot panel */}
        <div style={{
          background: 'var(--cream-dark)', borderLeft: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', padding: '2rem',
        }}>
          {/* Engagement chip */}
          <div style={{
            position: 'absolute', top: '2.5rem', right: '2.5rem',
            background: 'var(--card-white)', border: '1px solid var(--border)',
            borderRadius: '2rem', padding: '0.5rem 1rem',
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--ink)',
            display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--terracotta)' }}/>
            Engagement detected
          </div>
          {/* Voice latency chip */}
          <div style={{
            position: 'absolute', right: '2.5rem', top: '50%', transform: 'translateY(-50%)',
            background: 'var(--card-white)', border: '1px solid var(--border)',
            borderRadius: '0.5rem', padding: '0.5rem 1rem',
            fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            Voice Latency · 320 ms
          </div>
          {/* Robot */}
          <RobotIllustration />
          {/* Mastery card */}
          <div style={{
            position: 'absolute', bottom: '2.5rem', left: '2.5rem',
            background: 'var(--card-white)', border: '1px solid var(--border)',
            borderRadius: '0.75rem', padding: '1rem 1.25rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            minWidth: '110px',
          }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: '0.25rem' }}>Mastery</div>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>
              78<span style={{ fontSize: '1rem' }}>%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '1rem 3rem',
        display: 'flex', alignItems: 'center', gap: '2.5rem',
        fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase',
        background: 'var(--cream)',
      }}>
        <span style={{ color: 'var(--taupe)', fontWeight: 400 }}>Now Teaching <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>12,438</strong> Learners</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span style={{ color: 'var(--taupe)', fontWeight: 400 }}>Across <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>47</strong> Schools</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span style={{ color: 'var(--taupe)', fontWeight: 400 }}>Uptime <strong style={{ color: 'var(--ink)', fontWeight: 600 }}>99.98%</strong></span>
      </div>
    </div>
  )
}
