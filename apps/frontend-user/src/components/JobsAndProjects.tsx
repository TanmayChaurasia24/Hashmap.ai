import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Code } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  skills: string[];
}

interface Project {
  id: number;
  title: string;
  budget: string;
  duration: string;
  skills: string[];
}

interface JobsAndProjectsProps {
  jobs: Job[];
  projects: Project[];
  selectedSkills: string[];
}

export function JobsAndProjects({ jobs, projects, selectedSkills }: JobsAndProjectsProps) {
  const filteredJobs = jobs.filter(job => 
    selectedSkills.length === 0 || selectedSkills.some(skill => job.skills.includes(skill))
  );

  const filteredProjects = projects.filter(project => 
    selectedSkills.length === 0 || selectedSkills.some(skill => project.skills.includes(skill))
  );

  return (
    <Tabs defaultValue="jobs" className="mb-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="jobs">Remote Jobs</TabsTrigger>
        <TabsTrigger value="projects">Freelance Projects</TabsTrigger>
      </TabsList>
      <TabsContent value="jobs">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <p><Briefcase className="inline mr-2 h-4 w-4" />{job.type}</p>
                <p>{job.location}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="projects">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.budget}</CardDescription>
              </CardHeader>
              <CardContent>
                <p><Code className="inline mr-2 h-4 w-4" />{project.duration}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Bid Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

