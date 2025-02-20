import { Trophy, Plus, Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";

type Achievement = {
  title: string;
  description: string;
  date: string;
};

const ProfileAchievements = () => {
  const [editMode, setEditMode] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      title: "Best Developer Award",
      description: "Awarded for outstanding contributions to the team",
      date: "2023",
    },
    {
      title: "Conference Speaker",
      description: "Spoke at React Conference 2022",
      date: "2022",
    },
    {
      title: "Open Source Contributor",
      description: "Major contributor to popular React libraries",
      date: "2021",
    },
    {
      title: "Hackathon Winner",
      description: "Won first place in company hackathon",
      date: "2020",
    },
  ]);
  const [newAchievement, setNewAchievement] = useState<Achievement>({
    title: "",
    description: "",
    date: "",
  });

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description && newAchievement.date) {
      setAchievements([...achievements, newAchievement]);
      setNewAchievement({ title: "", description: "", date: "" });
    }
  };

  const handleDeleteAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  const handleEditAchievement = (index: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    setAchievements(updatedAchievements);
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={() => setEditMode(!editMode)}
          >
            <Pencil size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="space-y-4">
          {(showAllAchievements ? achievements : achievements.slice(0, 3)).map(
            (achievement, index) => (
              <div key={index} className="flex gap-4 items-center">
                <Trophy className="text-gray-600 w-12 h-12 bg-gray-100 rounded-lg p-2 flex-shrink-0" />
                <div className="flex-1">
                  {editMode ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={achievement.title}
                        onChange={(e) => handleEditAchievement(index, "title", e.target.value)}
                        className="w-full border p-2 rounded-md"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={achievement.description}
                        onChange={(e) => handleEditAchievement(index, "description", e.target.value)}
                        className="w-full border p-2 rounded-md"
                        placeholder="Description"
                      />
                      <input
                        type="text"
                        value={achievement.date}
                        onChange={(e) => handleEditAchievement(index, "date", e.target.value)}
                        className="w-full border p-2 rounded-md"
                        placeholder="Year"
                      />
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-gray-600">{achievement.description}</p>
                      <p className="text-sm text-gray-500">{achievement.date}</p>
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
            )
          )}
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
            <h4 className="font-semibold text-gray-900 mb-2">Add Achievement</h4>
            <input
              type="text"
              value={newAchievement.title}
              onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              className="w-full border p-2 rounded-md mb-2"
              placeholder="Title"
            />
            <input
              type="text"
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
              className="w-full border p-2 rounded-md mb-2"
              placeholder="Description"
            />
            <input
              type="text"
              value={newAchievement.date}
              onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
              className="w-full border p-2 rounded-md mb-2"
              placeholder="Year"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={handleAddAchievement}
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
