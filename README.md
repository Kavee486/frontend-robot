# DKT Learning Analytics - Frontend

##  Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit + RTK Query
- **API Integration**: 7 API slices for complete backend integration

##  Project Structure

\\\
app/
 auth/
    login/          # Login page with authentication
    register/       # User registration
 dashboard/          # Main dashboard with stats
 student/
    practice/       # Question practice with DKT predictions
    tutor/          # AI tutor chat interface
 admin/
     skills/         # Skill management (CRUD)
     questions/      # Question management (CRUD)

lib/
 api/                # RTK Query API slices
    authApi.ts      # Authentication endpoints
    skillsApi.ts    # Skills CRUD
    questionsApi.ts # Questions CRUD
    interactionsApi.ts  # Student interactions
    dktApi.ts       # DKT predictions
    engagementApi.ts    # Multimodal engagement
    tutorApi.ts     # AI tutor
 features/
    authSlice.ts    # Auth state management
 store.ts            # Redux store configuration
 hooks.ts            # Typed Redux hooks
 StoreProvider.tsx   # Redux provider component

types/
 api.ts              # TypeScript interfaces for all API types
\\\

##  Setup

1. **Install dependencies**:
\\\ash
npm install
\\\

2. **Configure environment**:
Create \.env.local\:
\\\
NEXT_PUBLIC_API_URL=http://localhost:8000
\\\

3. **Start development server**:
\\\ash
npm run dev
\\\

4. **Open browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

##  Features

### Authentication
- Login/Register with JWT tokens
- Token stored in localStorage
- Automatic header injection for API calls
- Protected routes with role checking

### Student Features
- **Practice Mode**: Answer questions with real-time DKT predictions
- **Mastery Tracking**: Visual progress bars showing skill mastery
- **AI Tutor**: Chat interface with LLM-powered tutoring
- **Engagement Monitoring**: Visual/audio analysis (multimodal)

### Admin Features
- **Skills Management**: CRUD operations for learning skills
- **Questions Management**: Create/edit/delete questions
- **Student Analytics**: View engagement and performance data

### DKT Integration
- Real-time mastery probability predictions
- Next question recommendations
- Student-skill proficiency tracking
- Historical interaction analysis

##  API Slices

All API slices use RTK Query for:
- Automatic caching
- Request deduplication
- Optimistic updates
- Tag-based invalidation

### Available Hooks

**Authentication:**
- \useLoginMutation\
- \useRegisterMutation\
- \useGetCurrentUserQuery\
- \useLogoutMutation\

**Skills:**
- \useGetSkillsQuery\
- \useGetSkillQuery\
- \useCreateSkillMutation\
- \useUpdateSkillMutation\
- \useDeleteSkillMutation\

**Questions:**
- \useGetQuestionsQuery\
- \useGetQuestionQuery\
- \useCreateQuestionMutation\
- \useDeleteQuestionMutation\

**Interactions:**
- \useGetInteractionsQuery\
- \useGetInteractionQuery\
- \useCreateInteractionMutation\
- \useGetStudentHistoryQuery\

**DKT Predictions:**
- \useGetPredictionsQuery\
- \useGetNextQuestionQuery\
- \useTrainModelMutation\
- \useGetModelMetricsQuery\

**Engagement:**
- \useAnalyzeVisualMutation\
- \useAnalyzeAudioMutation\
- \useGetEngagementHistoryQuery\
- \useGetEngagementSummaryQuery\

**AI Tutor:**
- \useAskTutorMutation\
- \useGetHintsMutation\
- \useGetLearningPathQuery\
- \useGetAdaptiveSettingsQuery\
- \useGetProgressQuery\

##  User Roles

- **Student**: Practice questions, view progress, access AI tutor
- **Teacher/Admin**: Manage skills and questions, view analytics

##  UI Components

- Responsive design with Tailwind CSS
- Gradient backgrounds
- Shadow cards
- Focus states and hover effects
- Loading states and error handling

##  Usage Example

\\\	ypescript
'use client'

import { useGetPredictionsQuery } from '@/lib/api/dktApi'
import { useAppSelector } from '@/lib/hooks'

export default function MyComponent() {
  const { user } = useAppSelector((state) => state.auth)
  
  const { data, isLoading, error } = useGetPredictionsQuery({
    student_id: user?.id || 0,
    skill_id: 1
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading predictions</div>

  return (
    <div>
      Mastery: {(data.mastery_probability * 100).toFixed(1)}%
    </div>
  )
}
\\\

##  Running the Full Stack

1. **Backend** (Terminal 1):
\\\ash
cd backend
python -m uvicorn app.main:app --reload
\\\

2. **Frontend** (Terminal 2):
\\\ash
cd Frontend/dkt-frontend
npm run dev
\\\

3. **Access**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

##  State Management Flow

1. **User logs in**  Token stored in localStorage
2. **authApi.login**  Dispatches \setCredentials\ to authSlice
3. **Protected routes**  Check \isAuthenticated\ from state
4. **API calls**  Automatically include token in headers
5. **Data fetching**  RTK Query caches responses
6. **Mutations**  Invalidate cache tags for auto-refetch

##  Next Steps

- Add charts for mastery visualization
- Implement webcam integration for engagement
- Add real-time notifications
- Create admin analytics dashboard
- Add export/import for questions
- Implement learning path visualization

##  License

MIT
