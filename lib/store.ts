import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/authApi'
import { skillsApi } from './api/skillsApi'
import { questionsApi } from './api/questionsApi'
import { interactionsApi } from './api/interactionsApi'
import { dktApi } from './api/dktApi'
import { engagementApi } from './api/engagementApi'
import { tutorApi } from './api/tutorApi'
import authReducer from './features/authSlice'

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      // API slices
      [authApi.reducerPath]: authApi.reducer,
      [skillsApi.reducerPath]: skillsApi.reducer,
      [questionsApi.reducerPath]: questionsApi.reducer,
      [interactionsApi.reducerPath]: interactionsApi.reducer,
      [dktApi.reducerPath]: dktApi.reducer,
      [engagementApi.reducerPath]: engagementApi.reducer,
      [tutorApi.reducerPath]: tutorApi.reducer,
      // Regular slices
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        skillsApi.middleware,
        questionsApi.middleware,
        interactionsApi.middleware,
        dktApi.middleware,
        engagementApi.middleware,
        tutorApi.middleware
      ),
  })

  setupListeners(store.dispatch)

  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
