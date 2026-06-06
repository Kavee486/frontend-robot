import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { DKTPrediction } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const dktApi = createApi({
  reducerPath: 'dktApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/dkt`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['DKT'],
  endpoints: (builder) => ({
    getPredictions: builder.query<DKTPrediction[], { student_id: number; skill_id?: number }>({
      query: (params) => ({
        url: '/predict',
        params,
      }),
      providesTags: (result, error, { student_id, skill_id }) => [
        { type: 'DKT', id: `${student_id}-${skill_id || 'all'}` },
      ],
    }),
    getNextQuestion: builder.query<{ question_id: number; predicted_mastery: number }, { student_id: number; skill_id: number }>({
      query: (params) => ({
        url: '/next-question',
        params,
      }),
    }),
    trainModel: builder.mutation<{ message: string; metrics: any }, void>({
      query: () => ({
        url: '/train',
        method: 'POST',
      }),
      invalidatesTags: ['DKT'],
    }),
    getModelMetrics: builder.query<{ accuracy: number; auc: number; loss: number }, void>({
      query: () => '/metrics',
    }),
  }),
})

export const {
  useGetPredictionsQuery,
  useGetNextQuestionQuery,
  useTrainModelMutation,
  useGetModelMetricsQuery,
} = dktApi
