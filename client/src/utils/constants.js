export const ROLES = {
  MEMBER: 'member',
  MANAGER: 'manager'
}


export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || https://team-q-a.onrender.com;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login'
  },
  QUESTIONS: '/questions',
  ANSWERS: '/answers',
  INSIGHTS: '/insights'
}
