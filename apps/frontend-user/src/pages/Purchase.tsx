'use client'

import React, { useState } from 'react'
import { Coins, CreditCard } from 'lucide-react'
import { Header } from '@/components/Header'

interface TokenPackage {
  id: number
  tokens: number
  price: number
}

const TokenPurchase: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage | null>(null)
  const [customTokens, setCustomTokens] = useState<number>(0)
  const [customPrice, setCustomPrice] = useState<number>(0)

  const tokenPackages: TokenPackage[] = [
    { id: 1, tokens: 100, price: 10 },
    { id: 2, tokens: 500, price: 45 },
    { id: 3, tokens: 1000, price: 80 },
  ]

  const handleCustomTokenChange = (value: number) => {
    setCustomTokens(value)
    setCustomPrice(Math.ceil(value * 0.09)) // $0.09 per token, rounded up
  }

  const handlePurchase = () => {
    if (selectedPackage) {
      alert(`Thank you for purchasing ${selectedPackage.tokens} tokens for $${selectedPackage.price}!`)
    } else if (customTokens > 0) {
      alert(`Thank you for purchasing ${customTokens} tokens for $${customPrice}!`)
    } else {
      alert('Please select a package or enter a custom amount of tokens.')
    }
    // Here you would typically integrate with a payment processor
  }

  return (
   <>
   <Header/>
       <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Purchase Tokens</h1>
      <p className="mb-6 text-gray-600">Tokens are required to apply for freelance projects. Purchase tokens to start applying!</p>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {tokenPackages.map((pkg) => (
          <div 
            key={pkg.id} 
            className={`border rounded-lg p-6 cursor-pointer transition-all ${
              selectedPackage?.id === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedPackage(pkg)}
          >
            <h2 className="text-xl font-semibold mb-2">{pkg.tokens} Tokens</h2>
            <p className="text-2xl font-bold text-blue-600">${pkg.price}</p>
            <p className="text-sm text-gray-500 mt-2">${(pkg.price / pkg.tokens).toFixed(2)} per token</p>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Custom Amount</h2>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            value={customTokens}
            onChange={(e) => handleCustomTokenChange(parseInt(e.target.value) || 0)}
            className="border rounded-md p-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tokens"
          />
          <span className="text-lg font-semibold">=</span>
          <span className="text-lg font-semibold">${customPrice}</span>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Selected Package</h2>
        {selectedPackage ? (
          <div>
            <p className="text-lg"><Coins className="inline-block mr-2" size={20} /> {selectedPackage.tokens} Tokens</p>
            <p className="text-lg"><CreditCard className="inline-block mr-2" size={20} /> ${selectedPackage.price}</p>
          </div>
        ) : customTokens > 0 ? (
          <div>
            <p className="text-lg"><Coins className="inline-block mr-2" size={20} /> {customTokens} Tokens</p>
            <p className="text-lg"><CreditCard className="inline-block mr-2" size={20} /> ${customPrice}</p>
          </div>
        ) : (
          <p className="text-gray-500">No package selected</p>
        )}
      </div>

      <button
        onClick={handlePurchase}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors w-full"
      >
        Purchase Tokens
      </button>
    </div>
   </> 
  )
}

export default TokenPurchase

