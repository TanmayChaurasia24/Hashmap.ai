import { Building2, MapPin, Clock, ExternalLink } from 'lucide-react';

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

interface JobCardProps {
  job: JobType;
}

export function JobCard({ job }: JobCardProps) {
  const skillsList = job.skills.split(',').map(skill => skill.trim());

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-1">
            {job.title}
          </h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">{job.company}</span>
          </div>
        </div>
        <a
          href={job.applicationurl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      <p className="text-muted-foreground mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {skillsList.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {skillsList.length > 4 && (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            +{skillsList.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          <span>{job.type}</span>
        </div>
        <div className="flex-1 text-right font-medium text-primary">
          {job.salary}
        </div>
      </div>
    </div>
  );
}