import React, { useState } from "react";
import {
  UserDetail,
  JobDescription,
  Experience,
  Project,
  Certification,
} from "../types";
import {
  PlusCircle,
  MinusCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { any } from "zod";
import Header from "@/components/Header";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    userDetail: any;
    jobDescription: any;
  }>({
    userDetail: {
      name: "",
      headline: "",
      location: "",
      contact: {
        email: "",
        portfolio: "",
        github: "",
        linkedin: "",
      },
      experience: [],
      education: {
        degree: "",
        institution: "",
        graduation_year: new Date().getFullYear(),
      },
      skills: [],
      projects: [],
      certifications: [],
      interests: [],
    },
    jobDescription: {
      job_title: "",
      company: "",
      location: "",
      employment_type: "",
      salary_range: "",
      job_description: "",
      responsibilities: [""],
      requirements: {
        education: "",
        experience: "",
        technical_skills: [""],
        soft_skills: [""],
      },
      benefits: [""],
      how_to_apply: "",
    },
  });

  const handleInputChange = (
    section: "userDetail" | "jobDescription",
    field: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleContactChange = (field: string, value: string): any => {
    setFormData((prev) => ({
      ...prev,
      userDetail: {
        ...prev.userDetail,
        contact: {
          ...prev.userDetail.contact,
          [field]: value,
        },
      },
    }));
  };

  const handleEducationChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      userDetail: {
        ...prev.userDetail,
        education: {
          ...prev.userDetail.education,
          [field]: value,
        },
      },
    }));
  };

  const handleArrayChange = (
    section: "userDetail" | "jobDescription",
    field: string,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].map((item: string, i: number) =>
          i === index ? value : item
        ),
      },
    }));
  };

  const addArrayItem = (
    section: "userDetail" | "jobDescription",
    field: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], ""],
      },
    }));
  };

  const removeArrayItem = (
    section: "userDetail" | "jobDescription",
    field: string,
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter(
          (_: string, i: number) => i !== index
        ),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          value={formData.userDetail.name}
          onChange={(e) =>
            handleInputChange("userDetail", "name", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Headline"
          className="input-field"
          value={formData.userDetail.headline}
          onChange={(e) =>
            handleInputChange("userDetail", "headline", e.target.value)
          }
        />
      </div>
      <input
        type="text"
        placeholder="Location"
        className="input-field"
        value={formData.userDetail.location}
        onChange={(e) =>
          handleInputChange("userDetail", "location", e.target.value)
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={formData.userDetail.contact?.email}
          onChange={(e) => handleContactChange("email", e.target.value)}
        />
        <input
          type="url"
          placeholder="Portfolio URL"
          className="input-field"
          value={formData.userDetail.contact?.portfolio}
          onChange={(e) => handleContactChange("portfolio", e.target.value)}
        />
        <input
          type="url"
          placeholder="GitHub URL"
          className="input-field"
          value={formData.userDetail.contact?.github}
          onChange={(e) => handleContactChange("github", e.target.value)}
        />
        <input
          type="url"
          placeholder="LinkedIn URL"
          className="input-field"
          value={formData.userDetail.contact?.linkedin}
          onChange={(e) => handleContactChange("linkedin", e.target.value)}
        />
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Education</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Degree"
          className="input-field"
          value={formData.userDetail.education?.degree}
          onChange={(e) => handleEducationChange("degree", e.target.value)}
        />
        <input
          type="text"
          placeholder="Institution"
          className="input-field"
          value={formData.userDetail.education?.institution}
          onChange={(e) => handleEducationChange("institution", e.target.value)}
        />
        <input
          type="number"
          placeholder="Graduation Year"
          className="input-field"
          value={formData.userDetail.education?.graduation_year}
          onChange={(e) =>
            handleEducationChange("graduation_year", parseInt(e.target.value))
          }
        />
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Skills</h3>
      <div className="space-y-2">
        {formData.userDetail.skills?.map((skill: any, index: any) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Skill"
              className="input-field flex-1"
              value={skill}
              onChange={(e) =>
                handleArrayChange("userDetail", "skills", index, e.target.value)
              }
            />
            <button
              type="button"
              onClick={() => removeArrayItem("userDetail", "skills", index)}
              className="text-red-500 hover:text-red-700"
            >
              <MinusCircle size={24} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("userDetail", "skills")}
          className="btn-secondary w-full"
        >
          <PlusCircle size={20} className="inline mr-2" /> Add Skill
        </button>
      </div>
    </div>
  );

  const renderJobDetails = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Job Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Job Title"
          className="input-field"
          value={formData.jobDescription.job_title}
          onChange={(e) =>
            handleInputChange("jobDescription", "job_title", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Company"
          className="input-field"
          value={formData.jobDescription.company}
          onChange={(e) =>
            handleInputChange("jobDescription", "company", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Location"
          className="input-field"
          value={formData.jobDescription.location}
          onChange={(e) =>
            handleInputChange("jobDescription", "location", e.target.value)
          }
        />
        <input
          type="text"
          placeholder="Employment Type"
          className="input-field"
          value={formData.jobDescription.employment_type}
          onChange={(e) =>
            handleInputChange(
              "jobDescription",
              "employment_type",
              e.target.value
            )
          }
        />
        <input
          type="text"
          placeholder="Salary Range"
          className="input-field"
          value={formData.jobDescription.salary_range}
          onChange={(e) =>
            handleInputChange("jobDescription", "salary_range", e.target.value)
          }
        />
      </div>
      <textarea
        placeholder="Job Description"
        className="input-field h-32"
        value={formData.jobDescription.job_description}
        onChange={(e) =>
          handleInputChange("jobDescription", "job_description", e.target.value)
        }
      />
    </div>
  );

  const renderResponsibilities = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Responsibilities</h3>
      <div className="space-y-2">
        {formData.jobDescription.responsibilities?.map(
          (resp: any, index: any) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Responsibility"
                className="input-field flex-1"
                value={resp}
                onChange={(e) =>
                  handleArrayChange(
                    "jobDescription",
                    "responsibilities",
                    index,
                    e.target.value
                  )
                }
              />
              <button
                type="button"
                onClick={() =>
                  removeArrayItem("jobDescription", "responsibilities", index)
                }
                className="text-red-500 hover:text-red-700"
              >
                <MinusCircle size={24} />
              </button>
            </div>
          )
        )}
        <button
          type="button"
          onClick={() => addArrayItem("jobDescription", "responsibilities")}
          className="btn-secondary w-full"
        >
          <PlusCircle size={20} className="inline mr-2" /> Add Responsibility
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderEducation();
      case 3:
        return renderSkills();
      case 4:
        return renderJobDetails();
      case 5:
        return renderResponsibilities();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {step === 1 && "Personal Information"}
              {step === 2 && "Education Details"}
              {step === 3 && "Skills"}
              {step === 4 && "Job Details"}
              {step === 5 && "Responsibilities"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                  className={`btn-secondary ${step === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <ChevronLeft size={20} className="inline mr-2" /> Previous
                </button>
                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="btn-primary"
                  >
                    Next <ChevronRight size={20} className="inline ml-2" />
                  </button>
                ) : (
                  <button type="submit" className="btn-primary">
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
