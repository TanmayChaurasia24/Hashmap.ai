import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"; 

import {
  Pencil,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import Cookies from "js-cookie"
import { useState } from "react";
import axios from "axios";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
}

const ProfileBasicInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "San Francisco, CA",
    title: "Senior Software Engineer",
  });

  const [tempProfileData, setTempProfileData] = useState(profileData); // Store temporary changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempProfileData({
      ...tempProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async() => {
    setProfileData(tempProfileData); 
    console.log("inside handle save of profilebasicinfo...");
    
    try {
      const token = Cookies.get("User");
      if(!token) {
        console.log("token not available..", token);
        return;
      }
      const response = await axios.put("http://localhost:3000/api/auth/single", {profileData}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })

      if(!response) {
        console.log("response not available form backend at basic profile info..");
        return;
      }

      console.log("reponse from backend at basic profile update is: ", response);
      
    } catch (error) {
      console.log("error while updating profile basic information");
      return;
    }
  };

  return (
    <div>
      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {profileData.name}
          </h2>
          <button
            onClick={() => setEditMode(true)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
          >
            <Pencil size={16} className="text-gray-600" />
          </button>
        </div>
        <div>
          <p className="text-lg sm:text-xl text-gray-600">
            {profileData.title}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin size={18} />
              {profileData.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail size={18} />
              {profileData.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone size={18} />
              {profileData.phone}
            </span>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AlertDialog open={editMode} onOpenChange={setEditMode}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Profile</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={tempProfileData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={tempProfileData.title}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={tempProfileData.location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={tempProfileData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                    value={tempProfileData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditMode(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSave}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileBasicInfo;
