// check if VITE_API_URL exists (Vercel)
// if not, default to local machine (IntelliJ)
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';