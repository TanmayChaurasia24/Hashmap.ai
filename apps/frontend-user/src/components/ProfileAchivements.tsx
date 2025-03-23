import { fetchUserDetail, token } from "@/utils/FetchUserDetail";
import { Trophy, Plus, Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAsyncError } from "react-router-dom";

interface Achievement{
  title: string;
  description: string;
  date: string;
};

const ProfileAchievements = () => {
  const [editMode, setEditMode] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement>({
    title: "",
    description: "",
    date: "",
  });
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const fetchach = async () => {
    try {
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const user = await fetchUserDetail();
      setAchievements(user.achivements);
    } catch (error) {
      toast.error("Failed to fetch experience data");
    }
  };

  useEffect(() => {
    fetchach();
  }, []);

  const handleachivementsave = async () => {
    console.log("inside handle ach save");
    
    try {
      if (!token) {
        console.log("token not there");
        
        throw new Error("Authentication token not found");
      }

      console.log("goingggg");
      console.log(selectedItemIndex);
      
      
      if (selectedItemIndex === null) {
        // Add new experience
        console.log("posting");
        
        await axios.post(
          "http://localhost:3000/api/auth/add",
          {
            field: "achivements",
            item: newAchievement,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Done");
      } else {
        // Update existing experience
        await axios.put(
          "http://localhost:3000/api/auth/single",
          {
            field: "achivements",
            index: selectedItemIndex,
            item: newAchievement,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      await fetchach();
      setEditMode(false);
      setSelectedItemIndex(null);
      setNewAchievement({ title: "", description: "", date: "" });

      toast.error("Done");
    } catch (error) {
      toast.error("error");
    }
  };

  const handleDeleteAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={() => {setEditMode(!editMode); setSelectedItemIndex(null); setNewAchievement({title: "", description: "", date: ""})}}
          >
            <Pencil size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="space-y-4">
          {(achievements.length > 0) &&
            (showAllAchievements
              ? achievements
              : achievements?.slice(0, 3)
            ).map((achievement, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Trophy className="text-gray-600 w-12 h-12 bg-gray-100 rounded-lg p-2 flex-shrink-0" />
                <div className="flex-1">
                  {editMode ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={achievement.title}
                        onChange={(e) => e.target.value}
                        className="w-full border p-2 rounded-md"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={achievement.description}
                        onChange={(e) => e.target.value}
                        className="w-full border p-2 rounded-md"
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={achievement.date}
                        onChange={(e) => e.target.value}
                        className="w-full border p-2 rounded-md"
                        placeholder="Year"
                      />
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600">{achievement.description}</p>
                      <p className="text-sm text-gray-500">
                        {achievement.date}
                      </p>
                    </div>
                  )}
                </div>
                {editMode && (
                  <button
                    className="p-2 text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteAchievement(index)}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            {achievements.length > 3 && (
              <button
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => setShowAllAchievements(!showAllAchievements)}
              >
                {showAllAchievements ? "Show Less" : "View More"}
              </button>
            )}
        </div>

        {editMode && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              Add Achievement
            </h4>
            <input
              type="text"
              value={newAchievement.title}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, title: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-2"
              placeholder="Title"
            />
            <input
              type="text"
              value={newAchievement.description}
              onChange={(e) =>
                setNewAchievement({
                  ...newAchievement,
                  description: e.target.value,
                })
              }
              className="w-full border p-2 rounded-md mb-2"
              placeholder="Description"
            />
            <input
              type="text"
              value={newAchievement.date}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, date: e.target.value })
              }
              className="w-full border p-2 rounded-md mb-2"
              placeholder="Year"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleachivementsave}
            >
              <Plus size={16} className="inline mr-1" />
              Add Achievement
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileAchievements;
