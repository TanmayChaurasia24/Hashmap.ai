import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Project } from '../lib/types'
import { Button } from './ui/button'

interface ProjectListProps {
  projects: Project[]
  handleApply: (project: Project) => void
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, handleApply }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))]

  const filteredProjects = projects.filter(project => 
    (selectedCategory === 'All' || project.category === selectedCategory) &&
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {filteredProjects.map((project) => (
        <div key={project.id} className="bg-gray-50 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
          <p className="text-gray-600 mb-2">{project.description}</p>
          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-gray-700">Budget: <span className="font-semibold">${project.budget}</span></p>
              <p className="text-gray-700">Required Coins: <span className="font-semibold">{project.requiredCoins}</span></p>
              <p className="text-gray-700">Category: <span className="font-semibold">{project.category}</span></p>
            </div>

            <Button onClick={() => handleApply(project)}>Apply</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProjectList
