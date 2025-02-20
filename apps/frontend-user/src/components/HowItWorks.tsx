export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Sign up and build your professional profile with your experience and skills.",
    },
    {
      number: 2,
      title: "Share Your Knowledge",
      description: "Write blogs about your expertise and experiences to build your personal brand.",
    },
    {
      number: 3,
      title: "Let AI Work for You",
      description: "Our system automatically creates targeted resumes and applies to matching positions.",
    },
  ]

  return (
    <div className="min-h-[40vh] w-full max-w-[80vw] mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-4 sm:mb-6 md:mb-8">How It Works</h1>
      <div className="flex justify-center items-center mx-auto">
        <div className="flex flex-col p-2 justify-center gap-6 sm:gap-8 md:gap-10 w-full max-w-[70vw]">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0">
                {step.number}
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

