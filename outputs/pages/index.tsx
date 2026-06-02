// A1 · Landing — Editorial Warm
import Nav from '../components/Nav';
import Robot from '../components/Robot';

export default function Landing() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="artboard-bar">
        <span>A1 · Landing</span>
        <span>Editorial Warm</span>
      </div>

      <Nav variant="marketing" />

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          minHeight: 'calc(100vh - 140px)',
          borderTop: '1px solid var(--rule)',
        }}
      >
        {/* Left: hero copy */}
        <div style={{ padding: '64px 60px 40px' }}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>
            ADAPTIVE LEARNING · EST. 2025
          </div>
          <h1
            className="display"
            style={{
              fontSize: 'clamp(56px, 7vw, 96px)',
              margin: '0 0 28px',
              maxWidth: 640,
            }}
          >
            A tutor that<br />
            learns the<br />
            way <span className="italic-accent">you</span> learn.
          </h1>
          <p
            style={{
              fontSize: 18,
              maxWidth: 460,
              color: 'var(--ink-soft)',
              lineHeight: 1.55,
              margin: '0 0 36px',
            }}
          >
            Atlas pairs Bayesian knowledge tracing with conversational AI, so every
            question, hint, and lesson adapts to the learner in the chair — in real time.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="/dashboard" className="btn btn-primary">
              Start a session
            </a>
            <a href="#demo" className="btn btn-ghost">
              Watch the demo · 2:14
            </a>
          </div>

          <div
            style={{
              marginTop: 80,
              display: 'flex',
              gap: 48,
              borderTop: '1px solid var(--rule)',
              paddingTop: 22,
              fontSize: 13,
              color: 'var(--taupe)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span>
              NOW TEACHING <strong style={{ color: 'var(--ink)', marginLeft: 8 }}>12,438</strong> LEARNERS
            </span>
            <span>
              ACROSS <strong style={{ color: 'var(--ink)', marginLeft: 8 }}>47</strong> SCHOOLS
            </span>
            <span>
              UPTIME <strong style={{ color: 'var(--ink)', marginLeft: 8 }}>99.98%</strong>
            </span>
          </div>
        </div>

        {/* Right: robot canvas */}
        <div
          style={{
            background: 'var(--cream-soft)',
            position: 'relative',
            borderLeft: '1px solid var(--rule)',
            display: 'grid',
            placeItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Concentric rings */}
          <svg
            viewBox="0 0 600 600"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {[260, 200, 140, 90].map((r) => (
              <circle
                key={r}
                cx="300"
                cy="300"
                r={r}
                fill="none"
                stroke="rgba(26,23,20,0.08)"
                strokeWidth="1"
              />
            ))}
            <circle cx="300" cy="300" r="90" fill="rgba(200,75,49,0.05)" />
          </svg>

          {/* Top-right chip */}
          <div
            style={{
              position: 'absolute',
              top: 32,
              right: 36,
              background: 'var(--paper)',
              padding: '8px 14px',
              borderRadius: 999,
              border: '1px solid var(--rule)',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--terracotta)' }} />
            Engagement detected
          </div>

          {/* Middle-right voice latency */}
          <div
            style={{
              position: 'absolute',
              top: '40%',
              right: 28,
              background: 'var(--paper)',
              padding: '10px 14px',
              borderRadius: 12,
              border: '1px solid var(--rule)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              letterSpacing: '0.12em',
            }}
          >
            VOICE LATENCY · <strong style={{ color: 'var(--ink)' }}>320 ms</strong>
          </div>

          {/* Bottom-left mastery */}
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              left: 36,
              background: 'var(--paper)',
              padding: '14px 18px',
              borderRadius: 12,
              border: '1px solid var(--rule)',
              minWidth: 130,
            }}
          >
            <div className="mono">MASTERY</div>
            <div
              className="display"
              style={{ fontSize: 40, lineHeight: 1, marginTop: 4 }}
            >
              78<span style={{ fontSize: 18 }}>%</span>
            </div>
          </div>

          <Robot size={260} />
        </div>
      </section>
    </main>
  );
}
