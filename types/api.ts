// API Types matching backend schemas

export interface User {
  id: number
  username: string
  email: string
  role: string
  created_at: string
}

export interface Token {
  access_token: string
  token_type: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface UserCreate {
  username: string
  email: string
  password: string
  role?: string
}

export interface Skill {
  id: number
  name: string
  description?: string
  created_at: string
}

export interface Question {
  id: number
  skill_id: number
  text: string
  difficulty?: string
  created_at: string
}

export interface StudentInteraction {
  id: number
  user_id: number
  question_id: number
  skill_id: number
  correct: boolean
  response_time?: number
  timestamp: string
}

export interface DKTPrediction {
  student_id: number
  skill_id: number
  predicted_mastery: number
  next_question_recommendation?: number
  confidence?: number
}

export interface EngagementLog {
  id: number
  user_id: number
  interaction_id?: number
  session_id?: string
  visual_engagement_score?: number
  eye_contact_duration?: number
  head_pose_stability?: number
  face_detected?: boolean
  audio_confidence_score?: number
  hesitation_count?: number
  silence_duration?: number
  speech_rate?: number
  response_latency?: number
  overall_engagement?: number
  engagement_status?: string
  confidence_level?: string
  frame_count?: number
  audio_duration?: number
  timestamp: string
}

export interface TutorQuery {
  query: string
  user_id: number
  domain?: string
  interaction_id?: number
}

export interface TutorResponse {
  response: string
  confidence: number
  sources?: string[]
  follow_up_suggestions?: string[]
}

export interface LearningPath {
  user_id: number
  current_skills: number[]
  recommended_skills: number[]
  weak_areas: string[]
  estimated_completion_time?: number
}

export interface APIError {
  detail: string
}
