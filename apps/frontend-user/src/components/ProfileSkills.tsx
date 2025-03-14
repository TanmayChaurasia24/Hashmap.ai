import { Trash2, Plus, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { fetchUserDetail, token } from "@/utils/FetchUserDetail";
import toast from "react-hot-toast";

// Skill Type
type Skill = {
  name: string;
  level: number;
};

const ProfileSkills = () => {
  const [editSkills, setEditSkills] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [currskills, setCurrSkills] = useState<Skill>({ name: "", level: 0 });


  // Fetch user skills
  const fetchSkills = async () => {
    try {
      if (!token) throw new Error("Authentication token not found");

      const user = await fetchUserDetail();
      setSkills(user?.skills || []); // Ensure fallback to empty array
    } catch (error) {
      toast.error("Failed to fetch skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Add or update skill
  const handleAddSkill = async () => {
    if (currskills.name.trim() !== "") {
      try {
        if (!token) throw new Error("Authentication token not found");

        if (selectedItemIndex === null) {
          const response: any = await axios.post(
            "http://localhost:3000/api/auth/add",
            { field: "skills", item: currskills },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("response while adding new skill: ", response);

          toast.success("Skill added successfully!");
        } else {
          await axios.put(
            "http://localhost:3000/api/auth/single",
            { field: "skills", index: selectedItemIndex, item: currskills },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          toast.success("Skill updated successfully!");
        }

        await fetchSkills();
        setEditSkills(false);
        setSelectedItemIndex(null);
        setCurrSkills({ name: "", level: 0 });
      } catch (error) {
        toast.error("Failed to add/update skill");
      }
    }
  };

  // Remove skill
  const handleRemoveSkill = async (index: number) => {
    try {
      await axios.delete("http://localhost:3000/api/auth/remove", {
        headers: { Authorization: `Bearer ${token}` },
        // data: { field: "skills", index },
      });
      toast.success("Skill removed");
      await fetchSkills();
    } catch (error) {
      toast.error("Failed to remove skill");
    }
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Skills</h3>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={() => setEditSkills(true)}
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 relative">
              <span className="font-medium text-gray-700">{skill.name}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
              <button
                className=""
                onClick={() => {
                  setCurrSkills(skill);
                  setSelectedItemIndex(index);
                  setEditSkills(true);
                }}
              >
                <Pencil size={16} className="text-gray-600" />
              </button>
              <button
                className="p-1 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveSkill(index)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Add Skill Modal */}
      <AlertDialog open={editSkills} onOpenChange={setEditSkills}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedItemIndex !== null
                ? "Edit Skills"
                : "Add Skills"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={currskills.name}
                    onChange={(e) =>
                      setCurrSkills({ ...currskills, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skill Level (%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="mt-1 w-full"
                    value={currskills.level}
                    onChange={(e) =>
                      setCurrSkills({
                        ...currskills,
                        level: Number(e.target.value),
                      })
                    }
                  />
                  <span className="text-gray-600">{currskills.level}%</span>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditSkills(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleAddSkill}>
              Add Skill
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileSkills;
