import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Skill } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const skillsApi = createApi({
  reducerPath: 'skillsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/skills`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Skills'],
  endpoints: (builder) => ({
    getSkills: builder.query<Skill[], void>({
      query: () => '/',
      providesTags: ['Skills'],
    }),
    getSkill: builder.query<Skill, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Skills', id }],
    }),
    createSkill: builder.mutation<Skill, Partial<Skill>>({
      query: (skill) => ({
        url: '/',
        method: 'POST',
        body: skill,
      }),
      invalidatesTags: ['Skills'],
    }),
    updateSkill: builder.mutation<Skill, { id: number; data: Partial<Skill> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Skills', id }, 'Skills'],
    }),
    deleteSkill: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Skills'],
    }),
  }),
})

export const {
  useGetSkillsQuery,
  useGetSkillQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillsApi
