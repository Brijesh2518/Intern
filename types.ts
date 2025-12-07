
export interface Internship {
  id: number;
  title: string;
  domain: string;
  description: string;
  duration: string;
  stipend: string;
  skills: string[];
}

export interface Trainer {
  id: number;
  name: string;
  domain: string;
  expertise: string[];
  experience: string;
  bio: string;
  image?: string;
  availability: string;
}

export interface User {
  id: number;
  name?: string;
  email: string;
  password?: string; // Should not be stored long-term, but needed for mock auth
  contactNumber?: string;
  collegeName?: string;
  courseName?: string;
  year?: string;
  role: 'user' | 'admin';
  appliedInternships: number[]; // array of internship IDs
}

export type View = 'home' | 'login' | 'register' | 'user-dashboard' | 'admin-dashboard' | 'about' | 'profile-page';
