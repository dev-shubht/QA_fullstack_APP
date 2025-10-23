export const ROLES = {
  MEMBER: 'member',
  MANAGER: 'manager'
}


export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login'
  },
  QUESTIONS: '/questions',
  ANSWERS: '/answers',
  INSIGHTS: '/insights'
}