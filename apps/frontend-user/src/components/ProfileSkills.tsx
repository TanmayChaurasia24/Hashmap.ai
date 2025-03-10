import { Trash2, Plus } from "lucide-react";
import  { useEffect, useState } from "react";
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

type Skill = {
  name: string;
  level: number;
};

const ProfileSkills = () => {
  const [editSkills, setEditSkills] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [newSkill, setNewSkill] = useState<Skill>({ name: "", level: 50 });
  const fetchskills = async () => {
    try {
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const user = await fetchUserDetail();
      setSkills(user.skills);
    } catch (error) {
      toast.error("Failed to fetch skills");
    }
  };

  useEffect(() => {
    fetchskills();
  }, []);

  const handleAddSkill = () => {
    if (newSkill.name.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill({ name: "", level: 50 });
      setEditSkills(false);
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
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
            <AlertDialogTitle>Add New Skill</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={newSkill.name}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, name: e.target.value })
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
                    value={newSkill.level}
                    onChange={(e) =>
                      setNewSkill({ ...newSkill, level: Number(e.target.value) })
                    }
                  />
                  <span className="text-gray-600">{newSkill.level}%</span>
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
