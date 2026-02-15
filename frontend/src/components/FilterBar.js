import React from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 mb-8 bg-card p-4 rounded-lg border border-border/50 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs by title or company..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Select value={filters.location} onValueChange={(val) => handleChange('location', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Locations</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hyderabad">Hyderabad</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
             <SelectItem value="Pune">Pune</SelectItem>
             <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Gurgaon">Gurgaon</SelectItem>
              <SelectItem value="Noida">Noida</SelectItem>
               <SelectItem value="Chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.mode} onValueChange={(val) => handleChange('mode', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Modes</SelectItem>
            <SelectItem value="Remote">Remote</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Onsite">Onsite</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.experience} onValueChange={(val) => handleChange('experience', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Experience</SelectItem>
            <SelectItem value="Fresher">Fresher/0-1</SelectItem>
            <SelectItem value="1-3">1-3 Years</SelectItem>
            <SelectItem value="3-5">3-5 Years</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.source} onValueChange={(val) => handleChange('source', val)}>
            <SelectTrigger>
                <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All Sources</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Naukri">Naukri</SelectItem>
                <SelectItem value="Indeed">Indeed</SelectItem>
                <SelectItem value="Internshala">Internshala</SelectItem>
            </SelectContent>
        </Select>

        <Select value={filters.sort} onValueChange={(val) => handleChange('sort', val)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
