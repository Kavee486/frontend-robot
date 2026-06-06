'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { useGetQuestionsQuery, useCreateQuestionMutation, useDeleteQuestionMutation } from '@/lib/api/questionsApi'
import { useGetSkillsQuery } from '@/lib/api/skillsApi'

export default function QuestionsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    skill_id: 1,
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: 'A',
    difficulty: 1
  })

  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'teacher' && user?.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  const { data: questions } = useGetQuestionsQuery({})
  const { data: skills } = useGetSkillsQuery()
  const [createQuestion] = useCreateQuestionMutation()
  const [deleteQuestion] = useDeleteQuestionMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createQuestion(formData).unwrap()
      setIsAdding(false)
      setFormData({
        skill_id: 1,
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: 'A',
        difficulty: 1
      })
    } catch (err) {
      console.error('Failed to create question:', err)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(id).unwrap()
      } catch (err) {
        console.error('Failed to delete question:', err)
      }
    }
  }

  if (!user) return null

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-800'>Manage Questions</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='mb-6'>
          <button
            onClick={() => setIsAdding(true)}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            + Add New Question
          </button>
        </div>

        {isAdding && (
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-xl font-bold mb-4'>Add New Question</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Skill
                </label>
                <select
                  value={formData.skill_id}
                  onChange={(e) => setFormData({ ...formData, skill_id: Number(e.target.value) })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                >
                  {skills?.map((skill: any) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Question Text
                </label>
                <textarea
                  required
                  value={formData.question_text}
                  onChange={(e) => setFormData({ ...formData, question_text: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  rows={3}
                />
              </div>

              {['A', 'B', 'C', 'D'].map((option) => (
                <div key={option}>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Option {option}
                  </label>
                  <input
                    type='text'
                    required
                    value={(formData as any)[`option_${option.toLowerCase()}`]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`option_${option.toLowerCase()}`]: e.target.value
                      })
                    }
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>
              ))}

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Correct Answer
                  </label>
                  <select
                    value={formData.correct_answer}
                    onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  >
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Difficulty (1-5)
                  </label>
                  <input
                    type='number'
                    min='1'
                    max='5'
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: Number(e.target.value) })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  />
                </div>
              </div>

              <div className='flex gap-2'>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={() => setIsAdding(false)}
                  className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='space-y-4'>
          {questions?.map((question: any) => (
            <div key={question.id} className='bg-white rounded-lg shadow p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                  <span className='text-sm text-gray-500'>Question #{question.id}</span>
                  <h3 className='text-lg font-semibold mt-1'>{question.question_text}</h3>
                </div>
                <button
                  onClick={() => handleDelete(question.id)}
                  className='text-red-600 hover:text-red-900'
                >
                  Delete
                </button>
              </div>
              
              <div className='grid grid-cols-2 gap-2 mb-2'>
                {['A', 'B', 'C', 'D'].map((opt) => (
                  <div
                    key={opt}
                    className={`p-2 rounded ${
                      opt === question.correct_answer
                        ? 'bg-green-100 border-green-500'
                        : 'bg-gray-50'
                    } border`}
                  >
                    <span className='font-semibold'>{opt}.</span> {question[`option_${opt.toLowerCase()}`]}
                  </div>
                ))}
              </div>
              
              <div className='text-sm text-gray-600'>
                Difficulty: {question.difficulty}/5
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
