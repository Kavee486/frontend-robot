'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRegisterMutation } from '@/lib/api/authApi'

export default function RegisterPage() {
  const router = useRouter()
  const [register, { isLoading, error }] = useRegisterMutation()
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(formData).unwrap()
      router.push('/auth/login')
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-xl p-8'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
          Create Account
        </h1>
        
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Username
            </label>
            <input
              type='text'
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500'
            >
              <option value='student'>Student</option>
              <option value='teacher'>Teacher</option>
            </select>
          </div>

          {error && (
            <div className='text-red-500 text-sm'>
              Registration failed. Please try again.
            </div>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400'
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className='mt-4 text-center text-sm text-gray-600'>
          Already have an account?{' '}
          <Link href='/auth/login' className='text-blue-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
