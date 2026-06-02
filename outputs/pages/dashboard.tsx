// A3 · Student Dashboard — Editorial Warm
import Nav from '../components/Nav';
import Robot from '../components/Robot';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const engagement = [
  { d: 'T', v: 62 },
  { d: 'W', v: 68 },
  { d: 'T', v: 71 },
  { d: 'F', v: 73 },
  { d: 'S', v: 79 },
  { d: 'S', v: 84 },
  { d: 'M', v: 88 },
  { d: 'T', v: 92 },
];

type Skill = { name: string; pct: number; delta: string; tone?: 'new' };
const skills: Skill[] = [
  { name: 'Linear equations', pct: 92, delta: '+8%' },
  { name: 'Quadratic factoring', pct: 78, delta: '+12%' },
  { name: 'Word problems', pct: 64, delta: '+3%' },
  { name: 'Inequalities', pct: 51, delta: '+18%' },
  { name: 'Functions & graphs', pct: 34, delta: 'new', tone: 'new' },
];

export default function Dashboard() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="artboard-bar">
        <span>A3 · Student Dashboard</span>
        <span>Editorial Warm</span>
      </div>

      <Nav variant="app" />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 40px 80px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div className="mono" style={{ marginBottom: 10 }}>
              TUESDAY · 26 MAY · 14:32
            </div>
            <h1 className="display" style={{ fontSize: 56, margin: 0 }}>
              Good afternoon, <span className="italic-accent">Aria.</span>
            </h1>
          </div>
          <div className="mono" style={{ textAlign: 'right' }}>
            SESSION 47 ·{' '}
            <strong style={{ color: 'var(--ink)' }}>47/60 MINUTES TODAY</strong>
          </div>
        </div>

        {/* Today's lesson */}
        <div
          className="card"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '32px 36px' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>TODAY'S LESSON</div>
            <h2 className="display" style={{ fontSize: 44, margin: '0 0 10px' }}>
              Quadratic <span className="italic-accent">factoring</span>
            </h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 440, marginBottom: 26 }}>
              12 questions queued, hand-picked by your knowledge model. Estimated 18 minutes.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="/practice" className="btn btn-primary">Begin session →</a>
              <button className="btn btn-ghost">Skip for now</button>
            </div>
          </div>
          <div
            style={{
              background: 'var(--ink)',
              display: 'grid',
              placeItems: 'center',
              position: 'relative',
              color: 'var(--cream)',
              padding: 24,
            }}
          >
            <Robot size={170} tone="flat" />
            <div
              style={{
                position: 'absolute',
                bottom: 18,
                right: 24,
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                letterSpacing: '0.18em',
                color: 'var(--taupe-soft)',
              }}
            >
              YOUR TUTOR · ATLAS-7
            </div>
          </div>
        </div>

        {/* Three cards row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 22 }}>
          {/* Mastery snapshot */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
              <span className="mono">MASTERY SNAPSHOT</span>
              <span className="mono">5 SKILLS</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {skills.map((s) => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                    <span>{s.name}</span>
                    <span style={{ display: 'flex', gap: 10 }}>
                      <strong>{s.pct}%</strong>
                      <span
                        style={{
                          color: s.tone === 'new' ? 'var(--terracotta)' : 'var(--forest)',
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                      >
                        {s.delta}
                      </span>
                    </span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(26,23,20,0.07)', borderRadius: 4 }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${s.pct}%`,
                        background: 'var(--ink)',
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono">ENGAGEMENT · LAST 7 DAYS</span>
            </div>
            <div className="display" style={{ fontSize: 56, lineHeight: 1 }}>
              92<span style={{ fontSize: 22 }}>%</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--forest)', marginTop: 4 }}>
              +6 pts from last week
            </div>
            <div style={{ height: 130, marginTop: 18 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagement}>
                  <XAxis dataKey="d" tick={{ fontSize: 10, fill: '#6B5D52' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip cursor={{ stroke: '#C84B31', strokeDasharray: '2 3' }} contentStyle={{ background: '#FBF6EC', border: '1px solid #1A171420' }} />
                  <Line type="monotone" dataKey="v" stroke="#C84B31" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Ask Atlas */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="mono">ASK ATLAS</span>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--terracotta)' }} />
            </div>
            <p className="display italic-accent" style={{ fontSize: 22, lineHeight: 1.25, margin: '4px 0 18px' }}>
              "Ready when you are — what should we work on?"
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                '↗ Explain difference of squares',
                '↗ Why did I get Q4 wrong?',
                '↗ Quick recap of last lesson',
              ].map((q) => (
                <button
                  key={q}
                  className="btn btn-ghost"
                  style={{ justifyContent: 'flex-start', padding: '10px 14px', fontSize: 13 }}
                >
                  {q}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 'auto', position: 'relative' }}>
              <input
                placeholder="Ask anything…"
                style={{
                  width: '100%',
                  marginTop: 14,
                  padding: '12px 44px 12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--rule-strong)',
                  background: 'var(--cream-soft)',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  right: 8,
                  bottom: 8,
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: 'var(--ink)',
                  color: 'var(--cream)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 14,
                }}
              >
                ↑
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
