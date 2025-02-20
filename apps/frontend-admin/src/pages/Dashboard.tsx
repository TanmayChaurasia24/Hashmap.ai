"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Home, FileText, Briefcase, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

type Blog = {
  id: number;
  title: string;
  content: string;
};

type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio: string;
  skills: [];
  blogs: [];
  appliedjobs: [];
  profilepic: [];
};

interface Jobs {
  _id: string;
  title: string;
  description: string;
  company: string;
  salary: string;
  type: string;
  location: string;
  applicationurl: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [applicationurl, setApplicationUrl] = useState("");
  const [bulkUsers, setUsers] = useState<User[]>([]);
  const [bulkjobs, setjobs] = useState<Jobs[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isjobdeleted, setisjobdeleted] = useState(false);

  const handleAddBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const newBlog: Blog = {
      id: Date.now(),
      title: blogTitle,
      content: blogContent,
    };
    setBlogs([...blogs, newBlog]);
    setBlogTitle("");
    setBlogContent("");
  };

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/jobs/create",
        {
          title: jobTitle,
          description: jobDescription,
          company: company,
          salary: salary,
          type: type,
          location: location,
          applicationurl: applicationurl,
          postedby: "tanmay2026",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        // Reset form fields after successful job posting
        setJobTitle("");
        setJobDescription("");
        setCompany("");
        setSalary("");
        setType("");
        setLocation("");
        setApplicationUrl("");
      }
    } catch (error: any) {
      console.error("Error while posting new job: ", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response: any = await axios.get(
          "http://localhost:8000/api/admin/showall"
        );
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        }

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [bulkUsers]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsres: any = await axios.get(
          "http://localhost:8000/api/jobs/showall"
        );

        if (jobsres.data) {
          setjobs(jobsres.data.response);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [isjobdeleted, bulkjobs]);

  const handledeletejob = async (jobid: string) => {
    try {
      const response = await axios.delete("http://localhost:8000/api/jobs/del", {
        headers: {
          _id: jobid
        }
      });
      if(!response){
        console.log("Job deleted successfully");
      }
      
    } catch (error: any){
      console.error("Error deleting job: ", error.message);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-6">
          {[
            { name: "Dashboard", icon: Home },
            { name: "Blogs", icon: FileText },
            { name: "Create Job", icon: Briefcase },
            { name: "Users", icon: Users },
            { name: "All Jobs", icon: Briefcase },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() =>
                setActiveTab(item.name.toLowerCase().replace(/\s+/g, ""))
              }
              className={`flex items-center w-full px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                activeTab === item.name.toLowerCase().replace(/\s+/g, "")
                  ? "bg-gray-100"
                  : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to your Dashboard
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Blogs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{blogs.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{10}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="blogs">
            <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Blog</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddBlog} className="space-y-4">
                  <Input
                    placeholder="Blog Title"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Blog Content"
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    required
                    rows={5}
                  />
                  <Button type="submit">Add Blog</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Blogs</CardTitle>
              </CardHeader>
              <CardContent>
                {blogs.map((blog) => (
                  <div key={blog.id} className="mb-4 p-4 border rounded">
                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                    <p className="text-gray-600">{blog.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="createjob">
            <h2 className="text-2xl font-bold mb-4">Manage Job Openings</h2>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Add New Job Opening</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddJob} className="space-y-4">
                  <Input
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                  />
                  <Textarea
                    placeholder="Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                    rows={5}
                  />
                  <Input
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Expected Salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Job Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Application URL"
                    value={applicationurl}
                    onChange={(e) => setApplicationUrl(e.target.value)}
                    required
                  />
                  <Button type="submit">Add Job Opening</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users" className="">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {bulkUsers.length > 0 ? (
                bulkUsers.map((user: User) => (
                  <Card key={user.id} className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-xl">{user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-semibold">Username:</span>{" "}
                        {user.username}
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-semibold">Email:</span>{" "}
                        {user.email}
                      </p>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="destructive"
                          onClick={() => {
                            /* Handle delete user */
                          }}
                        >
                          Delete User
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                        >
                          Show more
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No users available.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="alljobs">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">All Job Openings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {bulkjobs.length > 0 ? (
                  bulkjobs.map((job) => (
                    <Card key={job._id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-xl line-clamp-2">
                          {job.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col">
                        <div className="flex-grow space-y-2">
                          <JobDetail label="Company" value={job.company} />
                          <JobDetail label="Salary" value={job.salary} />
                          <JobDetail label="Type" value={job.type} />
                          <JobDetail label="Location" value={job.location} />
                          <JobDetail
                            label="Application URL"
                            value={job.applicationurl}
                          />
                        </div>
                        <div className="mt-4">
                          <Button
                            variant="destructive"
                            onClick={() => handledeletejob(job._id)}
                            className="w-full"
                          >
                            Delete Job
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="col-span-full text-center text-gray-500">
                    No jobs available.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="mt-4">
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Bio:</strong> {selectedUser.bio || "Not Provided"}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedUser.address || "Not Provided"}
              </p>
              <p>
                <strong>Blogs:</strong> {selectedUser.blogs || "Not Provided"}
              </p>
              <p>
                <strong>appliedjobs:</strong>{" "}
                {selectedUser.appliedjobs || "Not Provided"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function JobDetail({ label, value }: { label: string; value: string }) {
  return label === "Application URL" ? (
    <p className="text-sm">
      <span className="font-semibold">{label}:</span>{" "}
      <a href={value} target="_blank" className="text-gray-600 break-words">
        {value}
      </a>
    </p>
  ) : (
    <p className="text-sm">
      <span className="font-semibold">{label}:</span>{" "}
      <span className="text-gray-600 break-words">{value}</span>
    </p>
  );
}
