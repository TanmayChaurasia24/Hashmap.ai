import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Plus, School, Pencil, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import axios from "axios";
import { fetchUserDetail, token } from "@/utils/FetchUserDetail";
import toast from "react-hot-toast";

type Education = {
  _id?: string; // Add _id for MongoDB documents
  degree: string;
  school: string;
  duration: string;
};

const ProfileEducation = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [editEducation, setEditEducation] = useState(false);
  const [educations, setEducations] = useState<Education[]>([]);
  const [currentEducation, setCurrentEducation] = useState<Education>({
    degree: "",
    school: "",
    duration: "",
  });


  // Fetch user's education data
  const fetchEducation = async () => {
    try {
      const user = await fetchUserDetail();
      setEducations(user.education);
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };
  useEffect(() => {
    fetchEducation();
  }, []);

  const handleEducationSave = async () => {
    if (!token) {
      console.log("token not available");
      return;
    }
    try {
      console.log("current education is: ", currentEducation);
      const response: any = await axios.post(
        "http://localhost:3000/api/auth/add",
        {
          field: "education",
          item: currentEducation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if(response.status !== 200) {
        console.log("Error saving education:", response);
        return;
      }

      console.log("added education successfully", response.data);
      await fetchEducation()
      toast.success("Done!");
      console.log("toast shown!");
      
      return;
    } catch (error) {
      console.log("error while saving the new education");
      return;
    }
  };

  // Delete education entry
  const handleEducationDelete = async (id: string, index: number) => {

  };

  return (
    <div>
      {/* Education Section */}
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
            <div
              key={edu._id}
              className="flex gap-4 group relative items-center"
            >
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
                  onClick={() =>
                    handleEducationDelete(edu._id as string, index)
                  }
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
