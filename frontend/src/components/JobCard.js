import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MapPin, Briefcase, Clock, Building2, Banknote, Star, ChevronDown, CheckCircle2, XCircle, Clock4, Send } from 'lucide-react';
import { getScoreColor } from '../utils/scoring';

const JobCard = ({ job, onSave, isSaved, matchScore, status = "Not Applied", onStatusChange }) => {

  const getStatusColor = (s) => {
      switch (s) {
          case 'Applied': return 'text-blue-600 border-blue-200 bg-blue-200';
          case 'Rejected': return 'text-red-600 border-red-200 bg-red-200';
          case 'Selected': return 'text-green-600 border-green-200 bg-green-200';
          default: return 'text-slate-600 border-slate-200 bg-slate-200';
      }
  };

  const getStatusIcon = (s) => {
      switch (s) {
          case 'Applied': return <Send className="w-3 h-3 mr-1" />;
          case 'Rejected': return <XCircle className="w-3 h-3 mr-1" />;
          case 'Selected': return <CheckCircle2 className="w-3 h-3 mr-1" />;
          default: return <Clock4 className="w-3 h-3 mr-1" />;
      }
  };

  const handleStatusSelect = (newStatus) => {
      if (onStatusChange) {
          onStatusChange(job.id, newStatus);
      }
  };

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 bg-card relative overflow-hidden group border-2 ${status === 'Applied' ? 'border-blue-200' : status === 'Selected' ? 'border-green-200' : status === 'Rejected' ? 'border-red-200' : 'border-border/50'}`}>
      
      {/* Match Score Badge */}
      {typeof matchScore === 'number' && (
          <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-xs font-bold border-l border-b ${getScoreColor(matchScore)}`}>
              {matchScore}% Match
          </div>
      )}

      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start mr-16">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold line-clamp-1" title={job.title}>
              {job.title}
            </CardTitle>
            <div className="flex items-center text-muted-foreground text-sm">
              <Building2 className="w-4 h-4 mr-1" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status Bar */}
        <div className="flex items-center justify-between">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className={`h-7 text-xs font-medium border ${getStatusColor(status)} hover:bg-transparent`}>
                        {getStatusIcon(status)}
                        {status}
                        <ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleStatusSelect('Not Applied')}>Not Applied</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusSelect('Applied')}>Applied</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusSelect('Rejected')}>Rejected</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusSelect('Selected')}>Selected</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <span className="text-xs text-muted-foreground flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}
            </span>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="font-normal text-muted-foreground bg-transparent hover:bg-transparent">
             {job.source}
          </Badge>
          <div className="flex items-center bg-muted/30 px-2 py-1 rounded">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            {job.location} ({job.mode})
          </div>
          <div className="flex items-center bg-muted/30 px-2 py-1 rounded">
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            {job.experience} Yrs
          </div>
          <div className="flex items-center bg-muted/30 px-2 py-1 rounded">
            <Banknote className="w-3.5 h-3.5 mr-1" />
            {job.salaryRange}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex justify-between items-start">
                   <DialogTitle className="text-2xl font-serif">{job.title}</DialogTitle>
                   {typeof matchScore === 'number' && (
                        <Badge variant="outline" className={`ml-2 ${getScoreColor(matchScore)}`}>
                             {matchScore}% Match
                        </Badge>
                    )}
              </div>
              <DialogDescription className="text-base flex flex-col gap-1 mt-2">
                <span className="font-medium text-foreground">{job.company}</span>
                <span className="flex items-center gap-2">
                    {job.location} • {job.mode} • {job.salaryRange}
                </span>
                <span className={`inline-flex items-center mt-2 w-fit px-2 py-1 rounded text-xs font-medium border ${getStatusColor(status)}`}>
                    {getStatusIcon(status)}
                    Status: {status}
                </span>
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Description</h4>
                <p className="text-sm leading-relaxed">{job.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

               <div className="flex gap-3 pt-4">
                  <Button className="flex-1" onClick={() => window.open(job.applyUrl, '_blank')}>
                    Apply Now
                </Button>
                 <Button 
                    variant={isSaved ? "secondary" : "outline"}
                    className="flex-1"
                    onClick={() => onSave(job.id)}
                >
                    {isSaved ? "Saved" : "Save for Later"}
                </Button>
               </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button 
            variant="ghost" 
            size="icon" 
            className={isSaved ? "text-yellow-500 hover:text-yellow-600" : "text-muted-foreground hover:text-foreground"}
            onClick={() => onSave(job.id)}
            title={isSaved ? "Unsave" : "Save"}
        >
          <Star className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
        </Button>

        <Button className="flex-1" onClick={() => window.open(job.applyUrl, '_blank')}>
          Apply
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
