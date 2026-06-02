import Link from 'next/link';
import { useRouter } from 'next/router';

type Variant = 'marketing' | 'app';

export default function Nav({ variant = 'marketing' }: { variant?: Variant }) {
  const router = useRouter();
  if (variant === 'app') {
    const items = [
      { href: '/dashboard', label: 'Today' },
      { href: '/practice', label: 'Practice' },
      { href: '/mastery', label: 'Mastery' },
      { href: '/history', label: 'History' },
      { href: '/tutor', label: 'Tutor' },
    ];
    return (
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 40px',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="diamond" />
          <strong style={{ letterSpacing: '0.1em' }}>ATLAS</strong>
        </Link>
        <nav style={{ display: 'flex', gap: 28 }}>
          {items.map((it) => {
            const active = router.pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                style={{
                  fontSize: 14,
                  color: active ? 'var(--ink)' : 'var(--taupe)',
                  borderBottom: active ? '2px solid var(--terracotta)' : '2px solid transparent',
                  paddingBottom: 4,
                }}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="mono">STREAK · 12 DAYS</span>
          <div
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--ink)', color: 'var(--cream)',
              display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600,
            }}
          >
            A
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 40px',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="diamond" />
        <strong style={{ letterSpacing: '0.1em' }}>ATLAS</strong>
        <span className="mono" style={{ marginLeft: 8 }}>· Personalized Robot</span>
      </Link>
      <nav style={{ display: 'flex', gap: 30 }}>
        {['Platform', 'Research', 'For Students', 'For Educators', 'About'].map((l) => (
          <a key={l} href="#" style={{ fontSize: 14, color: 'var(--ink)' }}>
            {l}
          </a>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Link href="/login" style={{ fontSize: 14 }}>Sign in</Link>
        <Link href="/dashboard" className="btn btn-dark">
          Begin learning →
        </Link>
      </div>
    </header>
  );
}
