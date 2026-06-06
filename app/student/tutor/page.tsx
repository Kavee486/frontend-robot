'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { useAskTutorMutation, useGetHintsMutation, useTranscribeAudioMutation } from '@/lib/api/tutorApi'
import { Mic, MicOff } from 'lucide-react'

const INITIAL_MESSAGES = [
  {
    role: 'atlas-opener',
    content: 'Welcome back, Aria. Ready to pick up where we left off — quadratic factoring?',
  },
]

const CONVERSATIONS = [
  { id: 1, title: 'Difference of squares', preview: 'Try one yourself: x² − 16…', active: true },
  { id: 2, title: 'Word problem strategies', preview: 'Underline the unknown first.' },
  { id: 3, title: 'Why did Q4 mark wrong?', preview: 'You distributed only one term.' },
  { id: 4, title: 'Inequality flipping', preview: 'Multiplying by a negative flips…' },
  { id: 5, title: 'Function vs relation', preview: 'Each input has exactly one…' },
]

const SUGGESTIONS = [
  'x² − 16 = (x+4)(x−4)',
  '9 − y² = (3+y)(3−y)',
  'Try a harder one',
]

function AtlasRobotChat() {
  return (
    <svg width="36" height="42" viewBox="0 0 36 42" fill="none">
      <line x1="18" y1="3" x2="18" y2="10" stroke="#1C1B19" strokeWidth="1.5"/>
      <circle cx="18" cy="2" r="2.5" fill="#C84B31"/>
      <rect x="4" y="10" width="28" height="20" rx="6" fill="#1C1B19"/>
      <circle cx="13" cy="19" r="3" fill="#C84B31"/>
      <circle cx="23" cy="19" r="3" fill="#C84B31"/>
      <circle cx="13" cy="19" r="1.2" fill="#1C1B19"/>
      <circle cx="23" cy="19" r="1.2" fill="#1C1B19"/>
      <circle cx="18" cy="27" r="1.2" fill="#C84B31"/>
      <rect x="13" y="30" width="10" height="4" rx="2" fill="#1C1B19"/>
      <rect x="2" y="34" width="32" height="8" rx="5" fill="#1C1B19"/>
    </svg>
  )
}

export default function TutorPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector(s => s.auth)
  const [messages, setMessages] = useState<any[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [activeConv, setActiveConv] = useState(1)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const [askTutor, { isLoading }] = useAskTutorMutation()
  const [getHints] = useGetHintsMutation()
  const [transcribeAudio, { isLoading: isTranscribing }] = useTranscribeAudioMutation()

  useEffect(() => {
    if (!isAuthenticated) router.push('/auth/login')
  }, [isAuthenticated, router])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !user) return
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    try {
      const response = await askTutor({ user_id: user.id, query: input }).unwrap()
      setMessages(prev => [...prev, { role: 'atlas', content: response.response }])
    } catch {
      setMessages(prev => [...prev, { role: 'atlas', content: 'I\'m here when you\'re ready. What would you like to explore?' }])
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', blob, 'recording.webm')
        try {
          const result = await transcribeAudio(formData).unwrap()
          setInput(result.text)
        } catch { }
        stream.getTracks().forEach(t => t.stop())
      }
      mediaRecorder.start()
      setIsRecording(true)
    } catch { }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setIsRecording(false)
  }

  if (!user) return null

  return (
    <div style={{ height: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ height: '52px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem', background: 'var(--cream)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill="#C84B31"/>
          </svg>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)' }}>ATLAS</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '280px 1fr', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{
          borderRight: '1px solid var(--border)', background: 'var(--cream)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ padding: '1.5rem 1.5rem 0.75rem', flexShrink: 0 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
              Conversations
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 0.75rem' }}>
            {CONVERSATIONS.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveConv(conv.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '0.875rem 0.75rem',
                  borderRadius: '0.625rem', marginBottom: '0.25rem',
                  background: activeConv === conv.id ? 'var(--cream-dark)' : 'transparent',
                  border: activeConv === conv.id ? '1px solid var(--border)' : '1px solid transparent',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: 'italic', fontSize: '0.875rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>
                  {conv.title}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--taupe)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {conv.preview}
                </div>
              </button>
            ))}
          </div>
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
            <button style={{
              width: '100%', padding: '0.75rem', borderRadius: '2rem',
              border: '1.5px solid var(--border)', background: 'transparent',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--taupe)',
              cursor: 'pointer',
            }}>＋ New conversation</button>
          </div>
        </div>

        {/* Chat area */}
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <AtlasRobotChat />
              <div>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: 'var(--ink)', fontWeight: 400 }}>
                  Atlas · Difference of squares
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22C55E' }}/>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 400 }}>
                    Online · Context: Algebra II
                  </span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{
                border: '1.5px solid var(--border)', background: 'transparent', borderRadius: '2rem',
                padding: '0.5rem 1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem',
                color: 'var(--ink)', cursor: 'pointer',
              }}>Voice mode</button>
              <button
                onClick={() => router.push('/dashboard')}
                style={{
                  border: '1.5px solid var(--border)', background: 'transparent', borderRadius: '2rem',
                  padding: '0.5rem 1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem',
                  color: 'var(--ink)', cursor: 'pointer',
                }}
              >End session</button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg, idx) => {
              if (msg.role === 'atlas-opener') {
                return (
                  <div key={idx}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: '0.625rem' }}>
                      Atlas opens with
                    </div>
                    <div style={{ borderLeft: '3px solid var(--terracotta)', paddingLeft: '1.25rem' }}>
                      <p style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: 'italic', fontSize: '1.375rem', color: 'var(--ink)', lineHeight: 1.4, margin: 0 }}>
                        "{msg.content}"
                      </p>
                    </div>
                  </div>
                )
              }
              if (msg.role === 'user') {
                return (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{
                      background: 'var(--ink)', color: '#FAF8F4',
                      borderRadius: '1rem 1rem 0.25rem 1rem',
                      padding: '0.875rem 1.25rem', maxWidth: '65%',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.55,
                    }}>{msg.content}</div>
                  </div>
                )
              }
              // atlas
              return (
                <div key={idx} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    background: 'var(--card-white)', border: '1px solid var(--border)',
                    borderRadius: '1rem 1rem 1rem 0.25rem',
                    padding: '0.875rem 1.25rem', maxWidth: '72%',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--ink)',
                  }}>{msg.content}</div>
                </div>
              )
            })}

            {/* Suggestions chip row */}
            <div style={{
              background: 'var(--cream-dark)', border: '1px solid var(--border)',
              borderRadius: '1rem', padding: '0.875rem 1.125rem',
              maxWidth: '560px',
            }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500, marginBottom: '0.625rem' }}>
                Atlas is suggesting
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    style={{
                      background: 'var(--card-white)', border: '1.5px solid var(--border)',
                      borderRadius: '2rem', padding: '0.375rem 0.875rem',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'var(--ink)',
                      cursor: 'pointer',
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>

            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div style={{ borderTop: '1px solid var(--border)', padding: '1rem 2rem', flexShrink: 0, background: 'var(--cream)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--card-white)', border: '1px solid var(--border)', borderRadius: '0.875rem', padding: '0.625rem 0.75rem 0.625rem 1rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--border)' }}>＋</span>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask Atlas anything about today's lesson…"
                disabled={isTranscribing}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontSize: '0.875rem',
                  color: 'var(--ink)',
                }}
              />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', color: 'var(--taupe)', whiteSpace: 'nowrap' }}>⌘↵</span>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: isRecording ? '#EF4444' : 'var(--cream-dark)',
                  border: '1px solid var(--border)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isRecording ? '#fff' : 'var(--taupe)',
                }}
              >
                {isTranscribing ? <span style={{ fontSize: '0.6rem' }}>…</span> : isRecording ? <MicOff size={14}/> : <Mic size={14}/>}
              </button>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || isTranscribing}
                style={{
                  background: 'var(--terracotta)', border: 'none', borderRadius: '2rem',
                  padding: '0.5rem 1.125rem',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 500,
                  color: '#fff', cursor: input.trim() ? 'pointer' : 'default',
                  opacity: !input.trim() || isLoading ? 0.5 : 1,
                }}
              >{isLoading ? '…' : 'Send'}</button>
            </div>
            {/* Footer context */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.625rem' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 400 }}>
                Context: Algebra II · Last Question · Mastery Map
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 400 }}>
                Response Style: Guided
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
