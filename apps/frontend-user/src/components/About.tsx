import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { fetchUserDetail, token } from "@/utils/FetchUserDetail";
import axios from "axios";

const About = () => {
  const [editabout, seteditabout] = useState(false);
  const [aboutText, setAboutText] = useState<string>("Loading...");
  const [tempAboutText, setTempAboutText] = useState<string>("");

  // Fetch user details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUserDetail();
        setAboutText(user.bio || "No bio available.");
        setTempAboutText(user.bio || "");
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      if (!token) {
        console.error("Token not available.");
        return;
      }

      const response = await axios.put(
        "http://localhost:3000/api/auth/single",
        { bio: tempAboutText }, // Send only the updated field
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        console.error("Failed to update profile:", response);
        return;
      }

      setAboutText(tempAboutText);
      seteditabout(false);
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50" onClick={() => seteditabout(true)}>
            <Pencil size={20} className="text-gray-600" />
          </button>
        </div>
        <p className="text-gray-600">{aboutText}</p>
      </section>

      {/* Edit About Modal */}
      <AlertDialog open={editabout} onOpenChange={seteditabout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit About</AlertDialogTitle>
            <AlertDialogDescription>
              <textarea
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-md"
                value={tempAboutText}
                onChange={(e) => setTempAboutText(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => seteditabout(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default About;
