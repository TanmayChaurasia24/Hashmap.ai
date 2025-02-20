import { Globe, LinkedinIcon, Twitter, Github, Edit } from "lucide-react";

import About from "@/components/About";
import ProfileSkills from "@/components/ProfileSkills";
import ProfileProjects from "@/components/ProfileProjects";
import ProfileEducation from "@/components/ProfileEducation";
import ProfileBasicInfo from "@/components/ProfileBasicInfo";
import ProfileAchivements from "@/components/ProfileAchivements";
import Header from "@/components/Header";
import ProfileExperience from "@/components/ProfileExperience";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header/>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Cover Photo */}
          <div
            className="h-60 rounded-t-lg bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80")',
            }}
          />

          {/* Profile Section */}
          <div className="px-4 sm:px-8 pb-8">
            {/* Profile Picture */}
            <div className="relative -mt-20 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                alt="Profile"
                className="w-32 sm:w-40 h-32 sm:h-40 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                <Edit size={20} className="text-gray-600" />
              </button>
            </div>

            <ProfileBasicInfo />
            <About />
            <ProfileEducation />
            <ProfileExperience/>
            <ProfileSkills />
            <ProfileProjects />
            <ProfileAchivements />

            {/* Social Links */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect</h3>
              <div className="flex gap-4">
                <LinkedinIcon
                  size={24}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                />
                <Twitter
                  size={24}
                  className="text-gray-600 hover:text-blue-400 cursor-pointer"
                />
                <Github
                  size={24}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                />
                <Globe
                  size={24}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
