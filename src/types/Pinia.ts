import type { Language } from './Languages'

export type Interest = {
  id: number
  interest: string
}
export interface User {
  id: number
  birthdate: string
  email: string
  username: string
  photos: {
    id: number
    url: string
  }[]
  location: string
  gender: 'male' | 'female' | 'other'
  bio: string
  interests: Interest[]
  languages: Language[]
}
