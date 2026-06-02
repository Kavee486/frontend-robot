// A5 · AI Tutor Chat — Editorial Warm
import { useState } from 'react';
import Robot from '../components/Robot';

type Msg = { from: 'atlas' | 'user'; text: string };

const initial: Msg[] = [
  { from: 'atlas', text: '"Welcome back, Aria. Ready to pick up where we left off — quadratic factoring?"' },
  { from: 'user', text: 'Yeah, but can you re-explain the difference of squares first?' },
  { from: 'atlas', text: 'Of course. A difference of squares is any expression of the form a² − b². It always factors into (a + b)(a − b). Want a worked example?' },
  { from: 'user', text: 'Show me with x² − 49.' },
  { from: 'atlas', text: 'Here, a = x and b = 7 (because 7² = 49). So x² − 49 factors as (x + 7)(x − 7). Try one yourself: what does x² − 16 factor to?' },
];

const conversations = [
  { id: 1, title: 'Difference of squares', subtitle: 'Try one yourself: x² − 16…', active: true },
  { id: 2, title: 'Word problem strategies', subtitle: 'Underline the unknown first.' },
  { id: 3, title: 'Why did Q4 mark wrong?', subtitle: 'You distributed only one term.' },
  { id: 4, title: 'Inequality flipping', subtitle: 'Multiplying by a negative flips…' },
  { id: 5, title: 'Function vs relation', subtitle: 'Each input has exactly one…' },
];

export default function Tutor() {
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [draft, setDraft] = useState('');

  function send() {
    if (!draft.trim()) return;
    setMsgs([...msgs, { from: 'user', text: draft }]);
    setDraft('');
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <div className="artboard-bar">
        <span>A5 · AI Tutor Chat</span>
        <span>Editorial Warm</span>
      </div>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          minHeight: 'calc(100vh - 36px)',
          borderTop: '1px solid var(--rule)',
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            background: 'var(--paper)',
            borderRight: '1px solid var(--rule)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <span className="diamond" />
            <strong style={{ letterSpacing: '0.1em' }}>ATLAS</strong>
          </div>

          <div className="mono" style={{ marginBottom: 14 }}>CONVERSATIONS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {conversations.map((c) => (
              <button
                key={c.id}
                style={{
                  textAlign: 'left',
                  background: c.active ? 'var(--cream)' : 'transparent',
                  border: 'none',
                  padding: '10px 12px',
                  borderRadius: 10,
                  borderLeft: c.active ? '2px solid var(--terracotta)' : '2px solid transparent',
                }}
              >
                <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{c.title}</div>
                <div style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 2 }}>{c.subtitle}</div>
              </button>
            ))}
          </div>

          <button
            className="btn btn-ghost"
            style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}
          >
            + New conversation
          </button>
        </aside>

        {/* Chat thread */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Topbar */}
          <header
            style={{
              padding: '20px 36px',
              borderBottom: '1px solid var(--rule)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 48, height: 48, borderRadius: 12, background: 'var(--paper)',
                  border: '1px solid var(--rule)', display: 'grid', placeItems: 'center',
                }}
              >
                <Robot size={38} />
              </div>
              <div>
                <div className="display" style={{ fontSize: 22 }}>
                  Atlas · Difference of squares
                </div>
                <div className="mono">
                  <span style={{ width: 6, height: 6, background: 'var(--terracotta)', borderRadius: 999, display: 'inline-block', marginRight: 6 }} />
                  ONLINE · CONTEXT: ALGEBRA II
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost">Voice mode</button>
              <button className="btn btn-ghost">End session</button>
            </div>
          </header>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '32px 60px',
              display: 'flex',
              flexDirection: 'column',
              gap: 22,
              maxWidth: 920,
              width: '100%',
              alignSelf: 'center',
            }}
          >
            {msgs.map((m, i) => {
              const opening = i === 0;
              if (m.from === 'atlas') {
                return (
                  <div key={i} style={{ alignSelf: 'flex-start', maxWidth: 600 }}>
                    {opening && (
                      <div className="mono" style={{ marginBottom: 8 }}>
                        ATLAS OPENS WITH
                      </div>
                    )}
                    <div
                      style={{
                        padding: '14px 18px',
                        borderLeft: '3px solid var(--terracotta)',
                        background: 'var(--paper)',
                        borderRadius: 8,
                        fontFamily: opening ? 'var(--font-serif)' : 'var(--font-sans)',
                        fontSize: opening ? 26 : 15,
                        lineHeight: 1.5,
                        fontStyle: opening ? 'italic' : 'normal',
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: 'flex-end',
                    background: 'var(--ink)',
                    color: 'var(--cream)',
                    padding: '12px 18px',
                    borderRadius: 14,
                    maxWidth: 520,
                    fontSize: 14.5,
                  }}
                >
                  {m.text}
                </div>
              );
            })}

            {/* Suggestion strip */}
            <div
              style={{
                alignSelf: 'flex-start',
                padding: '14px 18px',
                border: '1px solid var(--rule)',
                borderRadius: 14,
                background: 'var(--paper)',
                maxWidth: 620,
              }}
            >
              <div className="mono" style={{ marginBottom: 10 }}>ATLAS IS SUGGESTING</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['x² − 16 = (x+4)(x-4)', '9 − y² = (3+y)(3-y)', 'Try a harder one'].map((s) => (
                  <button
                    key={s}
                    className="btn btn-ghost"
                    style={{ padding: '8px 14px', fontSize: 12.5 }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Composer */}
          <div
            style={{
              borderTop: '1px solid var(--rule)',
              padding: '18px 60px 12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--paper)',
                border: '1px solid var(--rule-strong)',
                borderRadius: 14,
                padding: '10px 12px',
              }}
            >
              <button
                style={{
                  width: 32, height: 32, borderRadius: 999,
                  background: 'transparent', border: '1px solid var(--rule-strong)',
                  color: 'var(--ink)',
                }}
              >
                +
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask Atlas anything about today's lesson…"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: 15,
                  fontFamily: 'var(--font-sans)',
                }}
              />
              <span className="mono">⌘↵</span>
              <button onClick={send} className="btn btn-primary">Send</button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 10,
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                letterSpacing: '0.12em',
                color: 'var(--taupe)',
                textTransform: 'uppercase',
              }}
            >
              <span>CONTEXT: ALGEBRA II · LAST QUESTION · MASTERY MAP</span>
              <span>RESPONSE STYLE: GUIDED</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
