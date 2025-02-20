export interface Contact {
    email: string;
    portfolio: string;
    github: string;
    linkedin: string;
  }
  
  export interface Experience {
    title: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }
  

  
  export interface Project {
    name: string;
    description: string;
    tech_stack: string[];
  }
  
  export interface Certification {
    name: string;
    issued_by: string;
    year: number;
  }
  
  export interface UserDetail {
    name: string;
    headline: string;
    location: string;
    contact: Contact;
    experience: Experience[];
    skills: string[];
    projects: Project[];
    certifications: Certification[];
    interests: string[];
  }
  
  export interface JobRequirements {
    education: string;
    experience: string;
    technical_skills: string[];
    soft_skills: string[];
  }
  
  export interface JobDescription {
    job_title: string;
    company: string;
    location: string;
    employment_type: string;
    salary_range: string;
    job_description: string;
    responsibilities: string[];
    requirements: JobRequirements;
    benefits: string[];
    how_to_apply: string;
  }