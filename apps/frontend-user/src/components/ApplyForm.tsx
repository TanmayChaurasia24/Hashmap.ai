import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { Project } from '../lib/types'

interface ApplyFormProps {
  project: Project
  submitApplication: (proposal: string) => void
  goBack: () => void
}

const ApplyForm: React.FC<ApplyFormProps> = ({ project, submitApplication, goBack }) => {
  const [proposal, setProposal] = useState<string>('')

  const handleSubmit = () => {
    submitApplication(proposal)
    setProposal('')
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Apply for {project.title}</h2>
      <p className="text-gray-600 mb-4">Required Coins: {project.requiredCoins}</p>
      <textarea
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        placeholder="Write your proposal here..."
        className="w-full h-40 p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between">
        <button
          onClick={goBack}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
        >
          Back to Projects
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
        >
          <Send className="inline-block mr-2" size={18} />
          Submit Application
        </button>
      </div>
    </div>
  )
}

export default ApplyForm
