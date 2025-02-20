import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";

const About = () => {
  const [editabout, seteditabout] = useState(false);
  const [aboutText, setAboutText] = useState(
    "Passionate software engineer with 8+ years of experience in full-stack development. Specialized in React, TypeScript, and cloud technologies. Always eager to learn and share knowledge with the community."
  );
  return (
    <div>
      {/* About */}
      <section className="mb-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={() => seteditabout(true)}
          >
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
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => seteditabout(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => seteditabout(false)}>
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default About;
