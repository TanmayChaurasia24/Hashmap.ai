import React from 'react'
import { Application, Project } from '../lib/types'

interface ApplicationListProps {
  applications: Application[]
  projects: Project[]
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, projects }) => {
  return (
    <div className="mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Applications</h2>
      {applications.map((app, index) => {
        const project = projects.find(p => p.id === app.projectId)
        return (
          <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{project?.title}</h3>
            <p className="text-gray-600">{app.proposal}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ApplicationList
