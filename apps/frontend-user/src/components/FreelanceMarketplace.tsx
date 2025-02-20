'use client'

import React, { useState } from 'react'
import ProjectList from './ProjectList'
import ApplyForm from './ApplyForm'
import Displaycoins from './Displaycoins'
import ApplicationList from './ApplicationList'
import { Project, Application, UserProfile as UserProfileType } from '../lib/types'

const FreelanceMarketplace: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, title: "Responsive Web Development", description: "Create a modern, responsive website for a local business", budget: 800, requiredCoins: 15, category: "Web Development" },
    { id: 2, title: "Brand Identity Design", description: "Design a complete brand identity including logo, color scheme, and style guide", budget: 500, requiredCoins: 10, category: "Graphic Design" },
    { id: 3, title: "Mobile App Development", description: "Develop a cross-platform mobile app for iOS and Android", budget: 2000, requiredCoins: 30, category: "Mobile Development" },
    { id: 4, title: "Content Writing for Blog", description: "Write engaging blog posts on various tech topics", budget: 300, requiredCoins: 5, category: "Writing" },
    { id: 5, title: "E-commerce Website", description: "Build a full-featured e-commerce website with payment integration", budget: 1500, requiredCoins: 25, category: "Web Development" },
  ])

  const [userCoins, setUserCoins] = useState<number>(100)
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentPage, setCurrentPage] = useState<'projects' | 'apply' | 'profile'>('projects')
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    name: "John Doe",
    email: "john@example.com",
    skills: ["JavaScript", "React", "Node.js", "UI/UX Design"]
  })

  const handleApply = (project: Project) => {
    setSelectedProject(project)
    setCurrentPage('apply')
  }

  const submitApplication = (proposal: string) => {
    if (selectedProject && proposal) {
      if (userCoins >= selectedProject.requiredCoins) {
        setApplications([...applications, { projectId: selectedProject.id, proposal }])
        setUserCoins(userCoins - selectedProject.requiredCoins)
        setCurrentPage('projects')
        alert('Application submitted successfully!')
      } else {
        alert('Not enough coins to apply!')
      }
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Displaycoins currentPage={currentPage} setCurrentPage={setCurrentPage} userCoins={userCoins} />

      {currentPage === 'projects' && (
        <ProjectList projects={projects} handleApply={handleApply} />
      )}

      {currentPage === 'apply' && selectedProject && (
        <ApplyForm 
          project={selectedProject} 
          submitApplication={submitApplication} 
          goBack={() => setCurrentPage('projects')} 
        />
      )}

      <ApplicationList applications={applications} projects={projects} />
    </div>
  )
}

export default FreelanceMarketplace
