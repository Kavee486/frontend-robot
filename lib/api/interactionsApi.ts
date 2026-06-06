import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { StudentInteraction } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const interactionsApi = createApi({
  reducerPath: 'interactionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/interactions`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Interactions'],
  endpoints: (builder) => ({
    getInteractions: builder.query<StudentInteraction[], { user_id?: number; skill_id?: number }>({
      query: (params) => ({
        url: '/',
        params,
      }),
      providesTags: ['Interactions'],
    }),
    getInteraction: builder.query<StudentInteraction, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Interactions', id }],
    }),
    createInteraction: builder.mutation<StudentInteraction, Partial<StudentInteraction>>({
      query: (interaction) => ({
        url: '/',
        method: 'POST',
        body: interaction,
      }),
      invalidatesTags: ['Interactions'],
    }),
    getStudentHistory: builder.query<StudentInteraction[], number>({
      query: (userId) => `/student/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Interactions', id: `student-${userId}` }],
    }),
  }),
})

export const {
  useGetInteractionsQuery,
  useGetInteractionQuery,
  useCreateInteractionMutation,
  useGetStudentHistoryQuery,
} = interactionsApi
