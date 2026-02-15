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
import { MapPin, Briefcase, Clock, Building2, Banknote, Star } from 'lucide-react';

const JobCard = ({ job, onSave, isSaved }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold line-clamp-1" title={job.title}>
              {job.title}
            </CardTitle>
            <div className="flex items-center text-muted-foreground text-sm">
              <Building2 className="w-4 h-4 mr-1" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-secondary/50 text-xs whitespace-nowrap">
            {job.source}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
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
        
        <div className="text-xs text-muted-foreground flex items-center mt-2">
            <Clock className="w-3.5 h-3.5 mr-1" />
            Posted {job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo} days ago`}
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
              <DialogTitle className="text-2xl font-serif">{job.title}</DialogTitle>
              <DialogDescription className="text-base flex flex-col gap-1 mt-2">
                <span className="font-medium text-foreground">{job.company}</span>
                <span className="flex items-center gap-2">
                    {job.location} • {job.mode} • {job.salaryRange}
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
