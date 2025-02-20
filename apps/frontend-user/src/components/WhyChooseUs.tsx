import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Send, Users } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Curated Opportunities",
      description: "We handpick the best remote jobs and freelance projects for you."
    },
    {
      title: "Global Network",
      description: "Connect with employers and clients from around the world."
    },
    {
      title: "Secure Payments",
      description: "Our platform ensures timely and secure payments for your work."
    }
  ];

  return (
    <section id="features" className="py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-16">Why Choose Hashmap.ai?</h2>
      <div className="grid md:grid-cols-3 gap-12">
        <FeatureCard 
          icon={<FileText className="w-8 h-8" />}
          title="Smart Profile Management"
          description="Build your professional profile like LinkedIn, but smarter. Our AI understands your experience and skills."
        />
        <FeatureCard 
          icon={<Users className="w-8 h-8" />}
          title="Blog Platform"
          description="Share your knowledge and experiences. Build your personal brand through engaging content."
        />
        <FeatureCard 
          icon={<Send className="w-8 h-8" />}
          title="Automated Applications"
          description="Let our AI match you with perfect opportunities and apply automatically with tailored resumes."
        />
      </div>
    </div>
  </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}