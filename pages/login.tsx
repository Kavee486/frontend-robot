// A2 · Sign In — Editorial Warm
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Robot from '../components/Robot';
import { login, saveToken } from '../lib/api';

type Role = 'student' | 'teacher' | 'admin';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('aria.tan@school.edu');
  const [password, setPassword] = useState('atlas2026');
  const [role, setRole] = useState<Role>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      saveToken(res.token);
      router.push('/dashboard');
    } catch {
      // Offline / demo — proceed anyway for design preview
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="artboard-bar">
        <span>A2 · Sign In</span>
        <span>Editorial Warm</span>
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          minHeight: 'calc(100vh - 36px)',
          borderTop: '1px solid var(--rule)',
        }}
      >
        {/* Left: editorial pane */}
        <div style={{ padding: '52px 60px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="diamond" />
            <strong style={{ letterSpacing: '0.1em' }}>ATLAS</strong>
          </div>

          <div style={{ marginTop: 110, maxWidth: 480 }}>
            <div className="eyebrow" style={{ marginBottom: 24 }}>
              RETURNING TO LEARN
            </div>
            <h1
              className="display"
              style={{ fontSize: 'clamp(48px, 5vw, 72px)', margin: 0 }}
            >
              "Pick up exactly<br />
              where you<br />
              <span className="italic-accent">left off.</span>"
            </h1>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', marginTop: 28, maxWidth: 380 }}>
              Your knowledge model, conversation history, and mastery map travel with you
              across every device.
            </p>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 48,
              left: 60,
              fontFamily: 'var(--font-mono)',
              fontSize: 10.5,
              letterSpacing: '0.18em',
              color: 'var(--taupe)',
            }}
          >
            VOL. III · ISSUE 04
          </div>
          <div style={{ position: 'absolute', bottom: 56, right: 80 }}>
            <Robot size={140} />
          </div>
        </div>

        {/* Right: form pane */}
        <div
          style={{
            background: 'var(--cream-soft)',
            borderLeft: '1px solid var(--rule)',
            display: 'grid',
            placeItems: 'center',
            padding: '52px 80px',
          }}
        >
          <form onSubmit={submit} style={{ width: '100%', maxWidth: 440 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>SIGN IN</div>
            <h2 className="display" style={{ fontSize: 48, margin: '0 0 36px' }}>
              Continue your <span className="italic-accent">session.</span>
            </h2>

            <label className="field-label">EMAIL</label>
            <input
              className="field-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <label className="field-label" style={{ marginTop: 28 }}>PASSWORD</label>
            <input
              className="field-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {error && (
              <div style={{ color: 'var(--terracotta)', fontSize: 13, marginTop: 12 }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '16px 22px', marginTop: 32, fontSize: 15 }}
            >
              {loading ? 'Signing in…' : 'Sign in →'}
            </button>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                gap: 14,
                margin: '32px 0 20px',
                color: 'var(--taupe)',
                fontSize: 13,
              }}
            >
              <span style={{ height: 1, background: 'var(--rule)' }} />
              <span>or continue as</span>
              <span style={{ height: 1, background: 'var(--rule)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {(['student', 'teacher', 'admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--rule-strong)',
                    borderRadius: 14,
                    padding: '14px 8px',
                    textAlign: 'center',
                    borderColor: role === r ? 'var(--terracotta)' : 'var(--rule-strong)',
                    color: 'var(--ink)',
                  }}
                >
                  <div className="mono" style={{ marginBottom: 4 }}>I AM A{r === 'admin' ? 'N' : ''}</div>
                  <div className="display italic-accent" style={{ fontSize: 22 }}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </div>
                </button>
              ))}
            </div>

            <p style={{ marginTop: 24, fontSize: 14, color: 'var(--ink-soft)' }}>
              New here?{' '}
              <Link href="/register" style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>
                Create an account →
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
