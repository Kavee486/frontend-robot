import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { EngagementLog } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const engagementApi = createApi({
  reducerPath: 'engagementApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/engagement`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Engagement'],
  endpoints: (builder) => ({
    analyzeVisual: builder.mutation<EngagementLog, {
      user_id: number
      session_id: string
      interaction_id?: number
      frame_data?: string
    }>({
      query: (data) => ({
        url: '/visual',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Engagement'],
    }),
    analyzeAudio: builder.mutation<EngagementLog, {
      user_id: number
      session_id: string
      interaction_id?: number
      audio_file?: File
    }>({
      query: ({ audio_file, ...data }) => {
        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, String(value))
        })
        if (audio_file) {
          formData.append('audio_file', audio_file)
        }
        return {
          url: '/audio',
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Engagement'],
    }),
    getEngagementHistory: builder.query<EngagementLog[], {
      user_id: number
      session_id?: string
      limit?: number
    }>({
      query: (params) => ({
        url: '/history',
        params,
      }),
      providesTags: (result, error, { user_id }) => [{ type: 'Engagement', id: user_id }],
    }),
    getEngagementSummary: builder.query<{
      average_visual_engagement: number
      average_audio_confidence: number
      total_sessions: number
      engagement_trend: string
    }, {
      user_id: number
      session_id?: string
    }>({
      query: (params) => ({
        url: '/summary',
        params,
      }),
    }),
  }),
})

export const {
  useAnalyzeVisualMutation,
  useAnalyzeAudioMutation,
  useGetEngagementHistoryQuery,
  useGetEngagementSummaryQuery,
} = engagementApi
