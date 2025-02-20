import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Plus, School, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";

type Education = {
  degree: string;
  school: string;
  duration: string;
};

const ProfileEducation = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [editEducation, setEditEducation] = useState(false);
  const [educations, setEducations] = useState<Education[]>([
    {
      degree: "Computer Science, BSc",
      school: "University of Technology",
      duration: "2013 - 2017",
    },
  ]);

  const [currentEducation, setCurrentEducation] = useState<Education>({
    degree: "",
    school: "",
    duration: "",
  });

  const handleEducationSave = () => {
    if (selectedItemIndex !== null) {
      const newEducations = [...educations];
      newEducations[selectedItemIndex] = currentEducation;
      setEducations(newEducations);
    } else {
      setEducations([...educations, currentEducation]);
    }
    setEditEducation(false);
    setSelectedItemIndex(null);
    setCurrentEducation({ degree: "", school: "", duration: "" });
  };

  const handleEducationDelete = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Education */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Education</h3>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={() => {
              setEditEducation(true);
              setSelectedItemIndex(null);
            }}
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div key={index} className="flex gap-4 group relative items-center">
              <School className="text-gray-600 w-12 h-12 bg-gray-100 rounded-lg p-2 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                <p className="text-gray-600">{edu.school}</p>
                <p className="text-sm text-gray-500">{edu.duration}</p>
              </div>
              <div className="absolute right-0 top-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-2"
                  onClick={() => {
                    setCurrentEducation(edu);
                    setSelectedItemIndex(index);
                    setEditEducation(true);
                  }}
                >
                  <Pencil size={16} className="text-gray-600" />
                </button>
                <button
                  className="p-2 text-red-600"
                  onClick={() => handleEducationDelete(index)}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Edit Education Modal */}
      <AlertDialog open={editEducation} onOpenChange={setEditEducation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedItemIndex !== null ? "Edit Education" : "Add Education"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={currentEducation.degree}
                    onChange={(e) =>
                      setCurrentEducation({
                        ...currentEducation,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    School
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={currentEducation.school}
                    onChange={(e) =>
                      setCurrentEducation({
                        ...currentEducation,
                        school: e.target.value,
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
                    value={currentEducation.duration}
                    onChange={(e) =>
                      setCurrentEducation({
                        ...currentEducation,
                        duration: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditEducation(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleEducationSave}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileEducation;
