'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'
import { useGetSkillsQuery, useCreateSkillMutation, useUpdateSkillMutation, useDeleteSkillMutation } from '@/lib/api/skillsApi'

export default function SkillsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [editingSkill, setEditingSkill] = useState<any>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })

  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'teacher' && user?.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  const { data: skills, isLoading } = useGetSkillsQuery()
  const [createSkill] = useCreateSkillMutation()
  const [updateSkill] = useUpdateSkillMutation()
  const [deleteSkill] = useDeleteSkillMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSkill) {
        await updateSkill({ id: editingSkill.id, ...formData }).unwrap()
        setEditingSkill(null)
      } else {
        await createSkill(formData).unwrap()
        setIsAddingSkill(false)
      }
      setFormData({ name: '', description: '' })
    } catch (err) {
      console.error('Failed to save skill:', err)
    }
  }

  const handleEdit = (skill: any) => {
    setEditingSkill(skill)
    setFormData({ name: skill.name, description: skill.description })
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id).unwrap()
      } catch (err) {
        console.error('Failed to delete skill:', err)
      }
    }
  }

  if (!user) return null

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-800'>Manage Skills</h1>
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
            onClick={() => setIsAddingSkill(true)}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            + Add New Skill
          </button>
        </div>

        {(isAddingSkill || editingSkill) && (
          <div className='bg-white rounded-lg shadow p-6 mb-6'>
            <h2 className='text-xl font-bold mb-4'>
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Skill Name
                </label>
                <input
                  type='text'
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md'
                  rows={3}
                />
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
                  onClick={() => {
                    setIsAddingSkill(false)
                    setEditingSkill(null)
                    setFormData({ name: '', description: '' })
                  }}
                  className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Name
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Description
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {skills?.map((skill: any) => (
                <tr key={skill.id}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                    {skill.id}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {skill.name}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500'>
                    {skill.description}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button
                      onClick={() => handleEdit(skill)}
                      className='text-blue-600 hover:text-blue-900 mr-4'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className='text-red-600 hover:text-red-900'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
