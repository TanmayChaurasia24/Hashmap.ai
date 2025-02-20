import { useEffect, useMemo, useState } from 'react';
import { Header } from "@/components/Header";
import { JobCard } from "@/components/JobCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Briefcase, Search, MapPin, Building2, Clock } from 'lucide-react';
import axios from 'axios';

interface JobType {
  _id: string;
  title: string;
  description: string;
  company: string;
  salary: string;
  type: string;
  location: string;
  applicationurl: string;
  skills: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [isLoading, setIsLoading] = useState(true);
  
  const locations = useMemo(() => [...new Set(jobs.map((job) => job.location))], [jobs]);
  const companies = useMemo(() => [...new Set(jobs.map((job) => job.company))], [jobs]);
  const jobTypes = useMemo(() => [...new Set(jobs.map((job) => job.type))], [jobs]);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    const fetchAllJobs = async() => {
      try {
        const response: any = await axios.get("http://localhost:3000/api/jobs/bulk");
        if (response.data?.data?.response) {
          setJobs(response.data.data.response);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllJobs();
  }, []);

  const handleFilterChange = (filters: { 
    search: string; 
    locations: string | string[]; 
    companies: string | string[]; 
    jobTypes: string | string[]; 
  }) => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLocation =
        !filters.locations.length || filters.locations.includes(job.location);
      const matchesCompany =
        !filters.companies.length || filters.companies.includes(job.company);
      const matchesJobType =
        !filters.jobTypes.length || filters.jobTypes.includes(job.type);

      return matchesSearch && matchesLocation && matchesCompany && matchesJobType;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Find Your Dream Remote Job
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the best remote opportunities from top companies around the world
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">{companies.length} Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">{locations.length} Locations</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">{jobTypes.length} Job Types</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-24">
              <FilterSidebar
                locations={locations}
                companies={companies}
                jobTypes={jobTypes}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {isLoading ? (
              // Loading State
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}