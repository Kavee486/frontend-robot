import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { TutorQuery, TutorResponse, LearningPath } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const tutorApi = createApi({
  reducerPath: 'tutorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/tutor`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Tutor'],
  endpoints: (builder) => ({
    askTutor: builder.mutation<TutorResponse, TutorQuery>({
      query: (data) => ({
        url: '/ask',
        method: 'POST',
        body: data,
      }),
    }),
    getHints: builder.mutation<{ hints: string[] }, {
      user_id: number
      question_id: number
      difficulty_level?: string
    }>({
      query: (data) => ({
        url: '/hints',
        method: 'POST',
        body: data,
      }),
    }),
    getLearningPath: builder.query<LearningPath, number>({
      query: (userId) => `/learning-path?user_id=${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Tutor', id: `path-${userId}` }],
    }),
    getAdaptiveSettings: builder.query<{
      learning_pace: string
      difficulty_level: string
      recommended_break_time: number
      next_session_duration: number
    }, number>({
      query: (userId) => `/adaptive-settings?user_id=${userId}`,
    }),
    getProgress: builder.query<{
      user_id: number
      learning_pace: string
      mastery_levels: Record<number, number>
      weak_concepts: Array<{ name: string; mastery: number }>
      total_interactions: number
    }, number>({
      query: (userId) => `/progress?user_id=${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Tutor', id: `progress-${userId}` }],
    }),
    transcribeAudio: builder.mutation<{
      text: string
      language: string
      confidence: number
    }, FormData>({
      query: (formData) => ({
        url: '/transcribe',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const {
  useAskTutorMutation,
  useGetHintsMutation,
  useGetLearningPathQuery,
  useGetAdaptiveSettingsQuery,
  useGetProgressQuery,
  useTranscribeAudioMutation,
} = tutorApi
