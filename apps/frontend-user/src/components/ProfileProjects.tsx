import { Code, Pencil, Trash2, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
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
import axios from "axios";

type Project = {
  name: string;
  description: string;
  link: string;
  image: string;
  skills: string[];
};

const ProfileProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectData, setProjectData] = useState<Project>({
    name: "",
    description: "",
    link: "",
    image: "",
    skills: []
  });

  const fetchproject = async () => {
    try {
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const user = await fetchUserDetail();
      setProjects(user.projects);
    } catch (error) {
      toast.error("Failed to fetch experience data");
    }
  };

  useEffect(() => {
    fetchproject();
  }, []);

  const handleProjectSave = async () => {
    try {
      if(!token) {
        throw new Error("Authentication token not found")
      }

      if(selectedItemIndex === null) {
        // add the project
        await axios.post(
          "http://localhost:3000/api/auth/add",
          {
            field: "projects",
            item: projectData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )

        toast.success("Project Added!");
      } else {
        // Update existing project
        await axios.put(
          "http://localhost:3000/api/auth/single",
          {
            field: "projects",
            index: selectedItemIndex,
            item: projectData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      
      await fetchproject();
      setModalOpen(false);
      setSelectedItemIndex(null);
      setProjectData({name:"", description:"", link:"", image:"", skills:[]})
    } catch (error) {
      
    }
  };

  // const handleAddProject = () => {
  //   if (editIndex !== null) {
  //     const updatedProjects = [...projects];
  //     updatedProjects[editIndex] = projectData;
  //     setProjects(updatedProjects);
  //   } else {
  //     setProjects([...projects, projectData]);
  //   }
  //   setModalOpen(false);
  //   setProjectData({ name: "", description: "", technologies: [], link: "" });
  //   setEditIndex(null);
  // };

  // const handleEditProject = (index: number) => {
  //   setProjectData(projects[index]);
  //   setEditIndex(index);
  //   setModalOpen(true);
  // };

  const handleDeleteProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div>
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Projects</h3>
          <button
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
            onClick={() => setModalOpen(true)}
          >
            <Plus size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(showAllProjects ? projects : projects.slice(0, 3)).map(
            (project, index) => (
              <div key={index} className="p-4 border rounded-lg relative">
                <h4 className="font-semibold text-gray-900">{project.name}</h4>
                <p className="text-gray-600 text-sm mt-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.skills.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                >
                  View Project
                </a>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setProjectData(project);
                      setSelectedItemIndex(index);
                      setModalOpen(true);
                    }}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteProject(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        {projects.length > 3 && (
          <button
            className="text-blue-600 hover:text-blue-700 font-medium mt-4"
            onClick={() => setShowAllProjects(!showAllProjects)}
          >
            {showAllProjects ? "Show Less" : "View More"}
          </button>
        )}
      </section>

      {/* Add/Edit Project Modal */}
      <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedItemIndex !== null ? "Edit Project" : "Add New Project"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  className="w-full p-2 border rounded"
                  value={projectData.name}
                  onChange={(e) =>
                    setProjectData({ ...projectData, name: e.target.value })
                  }
                />
                <textarea
                  placeholder="Project Description"
                  className="w-full p-2 border rounded"
                  value={projectData.description}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Technologies (comma separated)"
                  className="w-full p-2 border rounded"
                  value={projectData.skills.join(", ")}
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      skills: e.target.value
                        .split(",")
                        .map((tech) => tech.trim()),
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Project Link"
                  className="w-full p-2 border rounded"
                  value={projectData.link}
                  onChange={(e) =>
                    setProjectData({ ...projectData, link: e.target.value })
                  }
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setModalOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleProjectSave}>
              {selectedItemIndex !== null ? "Update" : "Add"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileProjects;
