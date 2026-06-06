import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Question } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/questions`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Questions'],
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], { skill_id?: number }>({
      query: (params) => ({
        url: '/',
        params,
      }),
      providesTags: ['Questions'],
    }),
    getQuestion: builder.query<Question, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Questions', id }],
    }),
    createQuestion: builder.mutation<Question, Partial<Question>>({
      query: (question) => ({
        url: '/',
        method: 'POST',
        body: question,
      }),
      invalidatesTags: ['Questions'],
    }),
    updateQuestion: builder.mutation<Question, { id: number; data: Partial<Question> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Questions', id }, 'Questions'],
    }),
    deleteQuestion: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Questions'],
    }),
  }),
})

export const {
  useGetQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApi
