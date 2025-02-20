import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { Plus, Briefcase, Pencil } from "lucide-react";
import React, { useState } from "react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";

type Experience = {
  title: string;
  company: string;
  duration: string;
};

const ProfileExperience = () => {
  const [editExperience, setEditExperience] = useState(false);
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    title: "",
    company: "",
    duration: "",
  });
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      title: "Senior Software Engineer",
      company: "Tech Corp Inc.",
      duration: "2020 - Present · 3 years",
    },
    {
      title: "Software Engineer",
      company: "Innovation Labs",
      duration: "2018 - 2020 · 2 years",
    },
    {
      title: "Junior Developer",
      company: "Startup Co",
      duration: "2016 - 2018 · 2 years",
    },
    {
      title: "Software Developer Intern",
      company: "Tech Solutions",
      duration: "2015 - 2016 · 1 year",
    },
  ]);

  const handleExperienceSave = () => {
    if (selectedItemIndex !== null) {
      const newExperiences = [...experiences];
      newExperiences[selectedItemIndex] = currentExperience;
      setExperiences(newExperiences);
    } else {
      setExperiences([...experiences, currentExperience]);
    }
    setEditExperience(false);
    setSelectedItemIndex(null);
    setCurrentExperience({ title: "", company: "", duration: "" });
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Experience</h3>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={() => {
              setEditExperience(true);
              setSelectedItemIndex(null);
            }}
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="space-y-4">
          {(showAllExperiences ? experiences : experiences.slice(0, 3)).map(
            (exp, index) => (
              <div key={index} className="flex gap-4 group relative">
                <Briefcase className="text-gray-600 w-12 h-12 bg-gray-100 rounded-lg p-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                </div>
                <button
                  className="absolute right-0 top-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    setCurrentExperience(exp);
                    setSelectedItemIndex(index);
                    setEditExperience(true);
                  }}
                >
                  <Pencil size={16} className="text-gray-600" />
                </button>
              </div>
            )
          )}
          {experiences.length > 3 && (
            <button
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => setShowAllExperiences(!showAllExperiences)}
            >
              {showAllExperiences ? "Show Less" : "View More"}
            </button>
          )}
        </div>
      </section>
      {/* Edit Experience Modal */}
      <AlertDialog open={editExperience} onOpenChange={setEditExperience}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedItemIndex !== null
                ? "Edit Experience"
                : "Add Experience"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={currentExperience.title}
                    onChange={(e) =>
                      setCurrentExperience({
                        ...currentExperience,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={currentExperience.company}
                    onChange={(e) =>
                      setCurrentExperience({
                        ...currentExperience,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={currentExperience.duration}
                    onChange={(e) =>
                      setCurrentExperience({
                        ...currentExperience,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditExperience(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleExperienceSave}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileExperience;
function setSelectedItemIndex(arg0: null) {
  throw new Error("Function not implemented.");
}
