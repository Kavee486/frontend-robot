// A4 · Practice — Editorial Warm
import { useState } from 'react';
import Link from 'next/link';
import Robot from '../components/Robot';

const options = [
  { id: 'A', label: '2(x − 3)(x + 3)', correct: true },
  { id: 'B', label: '(2x − 6)(x + 3)' },
  { id: 'C', label: '2(x² − 9)' },
  { id: 'D', label: 'Cannot be factored' },
];

export default function Practice() {
  const [selected, setSelected] = useState<string | null>('A');

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="artboard-bar">
        <span>A4 · Practice</span>
        <span>Editorial Warm</span>
      </div>

      {/* Session bar */}
      <header
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          alignItems: 'center',
          padding: '18px 40px',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Link href="/dashboard" style={{ fontSize: 20, color: 'var(--ink)' }}>←</Link>
          <span className="diamond" />
          <strong style={{ letterSpacing: '0.1em' }}>ATLAS</strong>
          <span className="mono" style={{ marginLeft: 16 }}>
            SESSION 47 · QUADRATIC FACTORING
          </span>
        </div>
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>03 / 12</span>
          <div style={{ width: 220, height: 4, background: 'rgba(26,23,20,0.08)', borderRadius: 4 }}>
            <div style={{ width: '25%', height: '100%', background: 'var(--terracotta)', borderRadius: 4 }} />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="mono" style={{ color: 'var(--forest)' }}>+3% MASTERY</span>
        </div>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', minHeight: 'calc(100vh - 110px)' }}>
        {/* Question column */}
        <div style={{ padding: '64px 60px' }}>
          <div className="mono" style={{ marginBottom: 18 }}>
            QUESTION 03 · MEDIUM
          </div>
          <h2 className="display" style={{ fontSize: 64, margin: '0 0 28px' }}>
            Factor <span className="italic-accent">completely:</span>
          </h2>
          <div
            className="display"
            style={{
              fontSize: 88,
              margin: '0 0 56px',
              letterSpacing: '0.02em',
            }}
          >
            2x<sup style={{ fontSize: 36 }}>2</sup> − 18
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 720 }}>
            {options.map((o) => {
              const active = selected === o.id;
              return (
                <button
                  key={o.id}
                  onClick={() => setSelected(o.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '18px 22px',
                    background: active ? 'var(--ink)' : 'var(--paper)',
                    color: active ? 'var(--cream)' : 'var(--ink)',
                    border: `1px solid ${active ? 'var(--ink)' : 'var(--rule-strong)'}`,
                    borderRadius: 14,
                    fontFamily: 'var(--font-serif)',
                    fontSize: 24,
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      background: active ? 'var(--terracotta)' : 'transparent',
                      border: active ? '1px solid var(--terracotta)' : '1px solid var(--rule-strong)',
                      color: active ? 'var(--cream)' : 'var(--ink)',
                    }}
                  >
                    {o.id}
                  </span>
                  {o.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 720, marginTop: 36 }}>
            <span style={{ fontSize: 14, color: 'var(--taupe)' }}>
              Stuck? <span style={{ color: 'var(--terracotta)' }}>Ask Atlas for a hint →</span>
            </span>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost">Skip</button>
              <button className="btn btn-primary">Submit answer →</button>
            </div>
          </div>
        </div>

        {/* Tutor side panel */}
        <aside
          style={{
            borderLeft: '1px solid var(--rule)',
            background: 'var(--cream-soft)',
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: 14, background: 'var(--paper)',
                border: '1px solid var(--rule)', display: 'grid', placeItems: 'center',
              }}
            >
              <Robot size={42} />
            </div>
            <div>
              <div className="display" style={{ fontSize: 22 }}>Atlas</div>
              <div className="mono">
                <span style={{ width: 6, height: 6, background: 'var(--terracotta)', display: 'inline-block', borderRadius: 999, marginRight: 6 }} />
                LISTENING
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              padding: '16px 18px',
              borderLeft: '3px solid var(--terracotta)',
              background: 'var(--paper)',
              borderRadius: 6,
              fontSize: 15,
              lineHeight: 1.55,
            }}
          >
            Look for a common factor in <em>both</em> terms before anything else. What's the biggest number that divides 2 and 18?
          </div>

          <div className="mono" style={{ marginTop: 12 }}>HINT TIER · 1 OF 3</div>

          <div style={{ marginTop: 'auto', borderTop: '1px solid var(--rule)', paddingTop: 18 }}>
            <div className="mono" style={{ marginBottom: 10 }}>YOUR SESSION SO FAR</div>
            {[
              ['Correct', '2 / 2'],
              ['Avg time', '48 s'],
              ['Mastery Δ', '+3.4%'],
            ].map(([k, v], i) => (
              <div
                key={i}
                style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--rule)' : 'none' }}
              >
                <span style={{ fontSize: 13, color: 'var(--taupe)' }}>{k}</span>
                <span style={{ fontSize: 13, color: i === 2 ? 'var(--forest)' : 'var(--ink)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ position: 'relative', marginTop: 16 }}>
              <input
                placeholder="Ask for a deeper hint…"
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--rule-strong)',
                  background: 'var(--paper)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <span
                style={{
                  position: 'absolute', right: 8, bottom: 8,
                  width: 26, height: 26, borderRadius: 999, background: 'var(--ink)', color: 'var(--cream)',
                  display: 'grid', placeItems: 'center', fontSize: 13,
                }}
              >
                ↑
              </span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
