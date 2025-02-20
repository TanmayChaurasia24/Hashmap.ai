import { useState } from 'react';
import { Search, MapPin, Building2, Briefcase } from 'lucide-react';

interface FilterSidebarProps {
  locations: string[];
  companies: string[];
  jobTypes: string[];
  onFilterChange: (filters: {
    search: string;
    locations: string[];
    companies: string[];
    jobTypes: string[];
  }) => void;
}

export function FilterSidebar({
  locations,
  companies,
  jobTypes,
  onFilterChange,
}: FilterSidebarProps) {
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onFilterChange({
      search: value,
      locations: selectedLocations,
      companies: selectedCompanies,
      jobTypes: selectedJobTypes,
    });
  };

  const handleLocationChange = (location: string) => {
    const updated = selectedLocations.includes(location)
      ? selectedLocations.filter((l) => l !== location)
      : [...selectedLocations, location];
    setSelectedLocations(updated);
    onFilterChange({
      search,
      locations: updated,
      companies: selectedCompanies,
      jobTypes: selectedJobTypes,
    });
  };

  const handleCompanyChange = (company: string) => {
    const updated = selectedCompanies.includes(company)
      ? selectedCompanies.filter((c) => c !== company)
      : [...selectedCompanies, company];
    setSelectedCompanies(updated);
    onFilterChange({
      search,
      locations: selectedLocations,
      companies: updated,
      jobTypes: selectedJobTypes,
    });
  };

  const handleJobTypeChange = (type: string) => {
    const updated = selectedJobTypes.includes(type)
      ? selectedJobTypes.filter((t) => t !== type)
      : [...selectedJobTypes, type];
    setSelectedJobTypes(updated);
    onFilterChange({
      search,
      locations: selectedLocations,
      companies: updated,
      jobTypes: updated,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Locations */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <MapPin className="w-4 h-4" />
            Locations
          </h3>
          <div className="space-y-2">
            {locations.map((location) => (
              <label
                key={location}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                {location}
              </label>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Building2 className="w-4 h-4" />
            Companies
          </h3>
          <div className="space-y-2">
            {companies.map((company) => (
              <label
                key={company}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedCompanies.includes(company)}
                  onChange={() => handleCompanyChange(company)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                {company}
              </label>
            ))}
          </div>
        </div>

        {/* Job Types */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
            <Briefcase className="w-4 h-4" />
            Job Types
          </h3>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedJobTypes.includes(type)}
                  onChange={() => handleJobTypeChange(type)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}