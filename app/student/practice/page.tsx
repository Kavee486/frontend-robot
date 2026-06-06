'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { useGetQuestionsQuery } from '@/lib/api/questionsApi'
import { useGetNextQuestionQuery, useGetPredictionsQuery } from '@/lib/api/dktApi'
import { useCreateInteractionMutation } from '@/lib/api/interactionsApi'

const DEMO_QUESTION = {
  id: 1,
  question_text: 'Factor completely:',
  expression: '2x² − 18',
  options: [
    { key: 'A', text: '2(x − 3)(x + 3)' },
    { key: 'B', text: '(2x − 6)(x + 3)' },
    { key: 'C', text: '2(x² − 9)', italic: true },
    { key: 'D', text: 'Cannot be factored', italic: true },
  ],
  correct_answer: 'A',
  skill_id: 1,
}

function AtlasRobotSmall() {
  return (
    <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
      <line x1="24" y1="4" x2="24" y2="14" stroke="#1C1B19" strokeWidth="1.5"/>
      <circle cx="24" cy="3" r="3" fill="#C84B31"/>
      <rect x="6" y="14" width="36" height="26" rx="7" fill="#1C1B19"/>
      <circle cx="17" cy="26" r="4" fill="#C84B31"/>
      <circle cx="31" cy="26" r="4" fill="#C84B31"/>
      <circle cx="17" cy="26" r="1.5" fill="#1C1B19"/>
      <circle cx="31" cy="26" r="1.5" fill="#1C1B19"/>
      <circle cx="24" cy="34" r="1.5" fill="#C84B31"/>
      <rect x="19" y="40" width="10" height="5" rx="2" fill="#1C1B19"/>
      <rect x="4" y="45" width="40" height="11" rx="7" fill="#1C1B19"/>
    </svg>
  )
}

export default function PracticePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector(s => s.auth)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [questionNum, setQuestionNum] = useState(3)
  const [totalQuestions] = useState(12)
  const [sessionStats, setSessionStats] = useState({ correct: 2, total: 2, avgTime: 48, masteryDelta: 3.4 })

  useEffect(() => {
    if (!isAuthenticated) router.push('/auth/login')
  }, [isAuthenticated, router])

  const { data: questions } = useGetQuestionsQuery({})
  const { data: nextQuestion } = useGetNextQuestionQuery(
    { student_id: user?.id || 0 }, { skip: !user }
  )
  const { data: prediction } = useGetPredictionsQuery(
    { student_id: user?.id || 0, skill_id: currentQuestion?.skill_id || 1 },
    { skip: !currentQuestion || !user }
  )
  const [createInteraction, { isLoading }] = useCreateInteractionMutation()

  useEffect(() => {
    if (questions && questions.length > 0 && !currentQuestion) {
      setCurrentQuestion(questions[0])
    } else if (!currentQuestion) {
      setCurrentQuestion(DEMO_QUESTION)
    }
  }, [questions, currentQuestion])

  const question = currentQuestion || DEMO_QUESTION

  const handleSubmit = async () => {
    if (!user || !question || !selectedAnswer) return
    try {
      await createInteraction({
        student_id: user.id,
        question_id: question.id,
        skill_id: question.skill_id,
        is_correct: selectedAnswer === question.correct_answer,
        time_taken: 30,
        hint_used: false,
      }).unwrap()
      const isCorrect = selectedAnswer === question.correct_answer
      setSessionStats(prev => ({
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        total: prev.total + 1,
        avgTime: 48,
        masteryDelta: prev.masteryDelta + (isCorrect ? 1.2 : -0.5),
      }))
      setSelectedAnswer('')
      setQuestionNum(q => Math.min(q + 1, totalQuestions))
      if (nextQuestion?.question_id) {
        const next = questions?.find((q: any) => q.id === nextQuestion.question_id)
        if (next) setCurrentQuestion(next)
      }
    } catch (err) {
      console.error('Failed to submit answer:', err)
    }
  }

  if (!user) return null

  const options = question.options || DEMO_QUESTION.options
  const expression = question.expression || DEMO_QUESTION.expression
  const progressPct = ((questionNum - 1) / totalQuestions) * 100

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '52px',
        borderBottom: '1px solid var(--border)', background: 'var(--cream)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--taupe)', fontSize: '1rem', padding: 0 }}
          >←</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <rect x="7" y="0" width="7" height="7" transform="rotate(45 7 0)" fill="#C84B31"/>
            </svg>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)' }}>ATLAS</span>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--taupe)', letterSpacing: '0.06em' }}>
            Session 47 · Quadratic Factoring
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--taupe)', fontWeight: 500 }}>
            {String(questionNum).padStart(2,'0')} / {totalQuestions}
          </span>
          <div style={{ width: '120px', height: '2px', background: 'var(--border)', borderRadius: '1px' }}>
            <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--terracotta)', borderRadius: '1px', transition: 'width 0.4s' }}/>
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--terracotta)' }}>
            +{sessionStats.masteryDelta.toFixed(1)}% Mastery
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 340px' }}>
        {/* Main question area */}
        <div style={{ padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: '1.5rem' }}>
            Question {String(questionNum).padStart(2,'0')} · Medium
          </div>

          <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 400, fontSize: '2.75rem', color: 'var(--ink)', margin: '0 0 0.5rem 0', lineHeight: 1.1 }}>
            Factor{' '}
            <em style={{ color: 'var(--terracotta)', fontStyle: 'italic' }}>completely:</em>
          </h2>

          <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontWeight: 700, fontSize: '3.5rem', color: 'var(--ink)', margin: '1rem 0 2.5rem 0', lineHeight: 1 }}>
            {expression}
          </div>

          {/* Options */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', maxWidth: '580px', marginBottom: '2.5rem' }}>
            {options.map((opt: any) => {
              const selected = selectedAnswer === opt.key
              return (
                <button
                  key={opt.key}
                  onClick={() => setSelectedAnswer(opt.key)}
                  style={{
                    background: selected ? 'var(--ink)' : 'var(--card-white)',
                    border: `1.5px solid ${selected ? 'var(--ink)' : 'var(--border)'}`,
                    borderRadius: '0.75rem', padding: '1.125rem 1.25rem',
                    textAlign: 'left', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    border: `1.5px solid ${selected ? 'var(--terracotta)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 600,
                    color: selected ? 'var(--terracotta)' : 'var(--taupe)',
                    flexShrink: 0,
                    background: selected ? 'transparent' : 'transparent',
                  }}>{opt.key}</span>
                  <span style={{
                    fontFamily: opt.italic ? 'Playfair Display, Georgia, serif' : 'Inter, sans-serif',
                    fontStyle: opt.italic ? 'italic' : 'normal',
                    fontSize: '0.9375rem',
                    color: selected ? '#FAF8F4' : 'var(--ink)',
                  }}>{opt.text}</span>
                </button>
              )
            })}
          </div>

          {/* Action row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '580px' }}>
            <button style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--taupe)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Stuck? Ask Atlas for a hint →
            </button>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{
                background: 'transparent', border: '1.5px solid var(--border)',
                borderRadius: '2rem', padding: '0.6875rem 1.25rem',
                fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: 'var(--taupe)', cursor: 'pointer',
              }}>Skip</button>
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer || isLoading}
                style={{
                  background: selectedAnswer ? 'var(--terracotta)' : 'var(--border)',
                  border: 'none', borderRadius: '2rem', padding: '0.6875rem 1.5rem',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500,
                  color: '#fff', cursor: selectedAnswer ? 'pointer' : 'default',
                  transition: 'background 0.2s',
                }}
              >{isLoading ? 'Submitting…' : 'Submit answer →'}</button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{
          borderLeft: '1px solid var(--border)', padding: '2rem 1.75rem',
          background: 'var(--cream-dark)', display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>
          {/* Atlas hint panel */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1rem' }}>
              <AtlasRobotSmall />
              <div>
                <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '1rem', color: 'var(--ink)', fontWeight: 400 }}>Atlas</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--terracotta)' }}/>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', fontWeight: 500 }}>Listening</span>
                </div>
              </div>
            </div>
            <div style={{
              background: 'var(--card-white)', border: '1px solid var(--border)',
              borderRadius: '0.75rem', borderLeft: '3px solid var(--terracotta)',
              padding: '1rem 1.125rem',
            }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--ink)', lineHeight: 1.6, margin: 0 }}>
                Look for a common factor in <em style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>both</em> terms before anything else. What's the biggest number that divides 2 and 18?
              </p>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--taupe)', marginTop: '0.625rem', fontWeight: 500 }}>
              Hint Tier · 1 of 3
            </div>
          </div>

          {/* Session stats */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '1rem' }}>
              Your Session So Far
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { label: 'Correct', value: `${sessionStats.correct} / ${sessionStats.total}`, color: 'var(--ink)' },
                { label: 'Avg time', value: `${sessionStats.avgTime}s`, color: 'var(--ink)' },
                { label: 'Mastery Δ', value: `+${sessionStats.masteryDelta.toFixed(1)}%`, color: 'var(--terracotta)' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: 'var(--taupe)' }}>{item.label}</span>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep hint input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              placeholder="Ask for a deeper hint…"
              style={{
                flex: 1, background: 'var(--cream)', border: '1px solid var(--border)',
                borderRadius: '2rem', padding: '0.5rem 0.875rem',
                fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                fontStyle: 'italic', color: 'var(--taupe)', outline: 'none',
              }}
            />
            <button style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'var(--terracotta)', border: 'none', cursor: 'pointer',
              color: '#fff', fontSize: '0.875rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>↑</button>
          </div>
        </div>
      </div>
    </div>
  )
}
