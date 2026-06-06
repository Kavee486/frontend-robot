'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { useGetPredictionsQuery } from '@/lib/api/dktApi'
import { useGetInteractionsQuery } from '@/lib/api/interactionsApi'
import { useGetEngagementSummaryQuery } from '@/lib/api/engagementApi'

function RobotTutor() {
  return (
    <svg width="130" height="150" viewBox="0 0 130 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="65" y1="14" x2="65" y2="38" stroke="#FAF8F4" strokeWidth="2"/>
      <circle cx="65" cy="10" r="5" fill="#C84B31"/>
      <rect x="22" y="38" width="82" height="62" rx="13" fill="#FAF8F4" opacity="0.15"/>
      <rect x="22" y="38" width="82" height="62" rx="13" fill="white" opacity="0.08"/>
      <circle cx="46" cy="68" r="8" fill="#C84B31"/>
      <circle cx="84" cy="68" r="8" fill="#C84B31"/>
      <circle cx="46" cy="68" r="3" fill="#1C1B19"/>
      <circle cx="84" cy="68" r="3" fill="#1C1B19"/>
      <circle cx="65" cy="86" r="2.5" fill="#C84B31"/>
      <rect x="53" y="100" width="24" height="10" rx="4" fill="#FAF8F4" opacity="0.15"/>
      <rect x="18" y="110" width="94" height="40" rx="13" fill="#FAF8F4" opacity="0.1"/>
      <circle cx="44" cy="132" r="5" fill="#C84B31" opacity="0.8"/>
      <circle cx="86" cy="132" r="5" fill="#C84B31" opacity="0.3"/>
    </svg>
  )
}

const skills = [
  { name: 'Linear equations', pct: 92, delta: '+8%', color: 'var(--ink)' },
  { name: 'Quadratic factoring', pct: 78, delta: '+12%', color: 'var(--terracotta)' },
  { name: 'Word problems', pct: 64, delta: '+3%', color: 'var(--ink)' },
  { name: 'Inequalities', pct: 51, delta: '+18%', color: 'var(--terracotta)' },
  { name: 'Functions & graphs', pct: 34, delta: 'new', color: 'var(--taupe)' },
]

const suggestions = [
  'Explain difference of squares',
  'Why did I get Q4 wrong?',
  'Quick recap of last lesson',
]

// Simple sparkline SVG
function Sparkline() {
  const pts = [20, 30, 22, 40, 38, 55, 70, 85]
  const maxH = 60
  const w = 180
  const points = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${maxH - (v / 100) * maxH}`)
  return (
    <svg width={w} height={maxH + 10} viewBox={`0 0 ${w} ${maxH + 10}`} fill="none">
      <polyline
        points={points.join(' ')}
        stroke="var(--ink)"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points={`${points.join(' ')} ${w},${maxH + 10} 0,${maxH + 10}`}
        fill="var(--ink)"
        opacity="0.06"
      />
      {/* Dashed baseline */}
      <line x1="0" y1={maxH} x2={w} y2={maxH} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3"/>
    </svg>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector(s => s.auth)

  useEffect(() => {
    if (!isAuthenticated) router.push('/auth/login')
  }, [isAuthenticated, router])

  const { data: predictions } = useGetPredictionsQuery(
    { student_id: user?.id || 0, skill_id: 1 }, { skip: !user }
  )
  const { data: interactions } = useGetInteractionsQuery(
    { student_id: user?.id }, { skip: !user }
  )
  const { data: engagement } = useGetEngagementSummaryQuery(
    user?.id || 0, { skip: !user }
  )

  if (!user) return null

  const masteryPct = predictions?.mastery_probability
    ? Math.round(predictions.mastery_probability * 100)
    : 78
  const engagementScore = engagement?.average_score
    ? (engagement.average_score * 100).toFixed(0)
    : 92

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2.5rem', height: '60px',
        borderBottom: '1px solid var(--border)', background: 'var(--cream)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill="#C84B31"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9375rem', letterSpacing: '0.02em', color: 'var(--ink)' }}>ATLAS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['Today','Practice','Mastery','History','Tutor'].map((item, i) => (
            <button
              key={item}
              onClick={() => {
                if (item === 'Practice') router.push('/student/practice')
                if (item === 'Tutor') router.push('/student/tutor')
              }}
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '0.9375rem', fontWeight: i === 0 ? 500 : 400,
                color: i === 0 ? 'var(--ink)' : 'var(--taupe)',
                background: 'none', border: 'none', cursor: 'pointer',
                textDecoration: i === 0 ? 'underline' : 'none',
                textUnderlineOffset: '4px',
              }}
            >{item}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500 }}>
            Streak · 12 Days
          </span>
          <button
            onClick={() => router.push('/auth/login')}
            style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--ink)', color: '#fff',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {(user.username?.[0] || 'A').toUpperCase()}
          </button>
        </div>
      </nav>

      <div style={{ flex: 1, padding: '2.5rem 2.5rem 2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '0.375rem' }}>
              {dateStr} · {timeStr}
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: '2.5rem', color: 'var(--ink)', margin: 0 }}>
              {getGreeting()},{' '}
              <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>{user.username || 'Aria'}.</em>
            </h1>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', textAlign: 'right', marginTop: '0.5rem' }}>
            Session 47 · 47/60 Minutes Today
          </div>
        </div>

        {/* Dark lesson card */}
        <div style={{
          background: 'var(--ink)', borderRadius: '1rem',
          padding: '2.25rem 2.5rem', marginBottom: '1.5rem',
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: '2rem', alignItems: 'center', minHeight: '220px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '0.75rem' }}>
              Today's Lesson
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: '2.25rem', color: '#FAF8F4', margin: '0 0 0.875rem 0', lineHeight: 1.1 }}>
              Quadratic <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>factoring</em>
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'rgba(250,248,244,0.55)', lineHeight: 1.6, margin: '0 0 1.75rem 0', maxWidth: '380px' }}>
              12 questions queued, hand-picked by your knowledge model. Estimated 18 minutes.
            </p>
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => router.push('/student/practice')}
                style={{
                  background: 'var(--terracotta)', color: '#fff',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500,
                  padding: '0.75rem 1.5rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                }}
              >Begin session →</button>
              <button style={{
                background: 'transparent', color: 'rgba(250,248,244,0.65)',
                fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 400,
                padding: '0.75rem 1.5rem', borderRadius: '2rem',
                border: '1.5px solid rgba(250,248,244,0.2)', cursor: 'pointer',
              }}>Skip for now</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <RobotTutor />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.35)', fontWeight: 400 }}>
              Your Tutor · Atlas-7
            </span>
          </div>
        </div>

        {/* Three cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
          {/* Mastery Snapshot */}
          <div style={{ background: 'var(--card-white)', border: '1px solid var(--border)', borderRadius: '0.875rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)' }}>Mastery Snapshot</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: 'var(--taupe)' }}>5 skills</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {skills.map(s => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: 'italic', fontSize: '0.8125rem', color: 'var(--ink)' }}>{s.name}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--ink)', fontWeight: 500 }}>{s.pct}%</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: s.delta === 'new' ? 'var(--taupe)' : 'var(--terracotta)', fontWeight: 500 }}>{s.delta}</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '2px', background: 'var(--border)', borderRadius: '1px' }}>
                    <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: '1px' }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div style={{ background: 'var(--card-white)', border: '1px solid var(--border)', borderRadius: '0.875rem', padding: '1.5rem' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '1.25rem' }}>
              Engagement · Last 7 Days
            </div>
            <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '3.5rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1, marginBottom: '0.25rem' }}>
              {engagementScore}<span style={{ fontSize: '1.25rem' }}>%</span>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--taupe)', marginBottom: '1.5rem' }}>+6 pts from last week</div>
            <Sparkline />
          </div>

          {/* Ask Atlas */}
          <div style={{ background: 'var(--card-white)', border: '1px solid var(--border)', borderRadius: '0.875rem', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)' }}>Ask Atlas</span>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--terracotta)' }}/>
            </div>
            <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: 'italic', fontSize: '0.9375rem', color: 'var(--ink)', lineHeight: 1.45, margin: '0 0 1.25rem 0' }}>
              "Ready when you are — what should we work on?"
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => router.push('/student/tutor')}
                  style={{
                    background: 'var(--cream)', border: '1px solid var(--border)',
                    borderRadius: '0.5rem', padding: '0.625rem 0.875rem',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--ink)',
                    textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                >
                  <span style={{ color: 'var(--terracotta)', fontSize: '0.7rem' }}>↗</span> {s}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                placeholder="Ask anything…"
                style={{
                  flex: 1, background: 'var(--cream)', border: '1px solid var(--border)',
                  borderRadius: '2rem', padding: '0.5rem 0.875rem',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--ink)',
                  outline: 'none',
                }}
                onKeyDown={e => { if (e.key === 'Enter') router.push('/student/tutor') }}
              />
              <button
                onClick={() => router.push('/student/tutor')}
                style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'var(--terracotta)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '0.875rem',
                }}
              >↑</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
