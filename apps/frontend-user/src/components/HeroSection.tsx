import { Briefcase } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Briefcase className="w-8 h-8 text-primary" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Find Your Dream Remote Opportunity
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
      Write blogs, maintain your profile, and let AI handle your job search. 
      We automatically create your resume and apply to matching positions.
      </p>
    </div>
  </div>
  )
}

