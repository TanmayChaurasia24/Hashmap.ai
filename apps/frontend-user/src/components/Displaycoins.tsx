import React from 'react'
import { Briefcase, User, Coins } from 'lucide-react'

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: 'projects' | 'apply' | 'profile') => void
  userCoins: number
}

const Displaycoins: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, userCoins }) => {
  return (
    <header className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Freelance Marketplace</h1>
      <nav className="flex justify-between items-center">
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage('projects')}
            className={`px-4 py-2 rounded transition-colors ${currentPage === 'projects' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Briefcase className="inline-block mr-2" size={18} />
            Projects
          </button>
          <button
            onClick={() => setCurrentPage('profile')}
            className={`px-4 py-2 rounded transition-colors ${currentPage === 'profile' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <User className="inline-block mr-2" size={18} />
            Profile
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Coins className="text-yellow-500" size={24} />
          <span className="text-xl font-semibold text-gray-700">{userCoins}</span>
        </div>
      </nav>
    </header>
  )
}

export default Displaycoins
