export type Project = {
    id: number
    title: string
    description: string
    budget: number
    requiredCoins: number
    category: string
  }
  
  export type Application = {
    projectId: number
    proposal: string
  }
  
  export type UserProfile = {
    name: string
    email: string
    skills: string[]
  }