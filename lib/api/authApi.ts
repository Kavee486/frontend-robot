import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { 
  User, 
  Token, 
  LoginRequest, 
  UserCreate 
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/auth`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<Token, LoginRequest>({
      query: (credentials) => {
        const formData = new URLSearchParams()
        formData.append('username', credentials.username)
        formData.append('password', credentials.password)
        
        return {
          url: '/login',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem('token', data.access_token)
        } catch (error) {
          console.error('Login failed:', error)
        }
      },
    }),
    register: builder.mutation<User, UserCreate>({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/me',
      providesTags: ['User'],
    }),
    logout: builder.mutation<void, void>({
      queryFn: () => {
        localStorage.removeItem('token')
        return { data: undefined }
      },
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useLogoutMutation,
} = authApi
