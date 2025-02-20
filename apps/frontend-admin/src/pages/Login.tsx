import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios" // Added missing import

export default function AdminLogin() {
  const [data, setData] = useState({
    // Changed 'setdata' to 'setData' for consistency
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate() // Changed 'router' to 'navigate' to match React Router's naming

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("inside handle submit func")
    console.log(data.username, data.password) // Fixed to use data object

    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("sending")

      const response = await axios.post("http://localhost:8000/api/admin/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("arrived")

      if (!response) {
        console.log("no response from backend: ", response)
        throw new Error("No response from backend")
      }
      navigate("/dashboard") 
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1></h1>
        <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900">Hashmap.ai</h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={data.username}
                  onChange={(e) => setData({ ...data, username: e.target.value })} // Fixed onChange handler
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={data.password} 
                  onChange={(e) => setData({ ...data, password: e.target.value })} 
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {error && <div className="mt-4 text-center text-sm text-red-600">{error}</div>}
        </div>
      </div>
    </div>
  )
}

