
import React, { useState } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  DepartmentItem, 
  TeamItem, 
  ApplicationItem 
} from "@/data/organizationData";
import StatusIndicator from "./StatusIndicator";
import MetricBadge from "./MetricBadge";
import { Building, Users, AppWindow, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface OrganizationTreeProps {
  data: DepartmentItem[];
}

const OrganizationTree = ({ data }: OrganizationTreeProps) => {
  const [expandedDepts, setExpandedDepts] = useState<string[]>([]);
  
  const toggleDepartment = (deptId: string) => {
    if (expandedDepts.includes(deptId)) {
      setExpandedDepts(expandedDepts.filter(id => id !== deptId));
    } else {
      setExpandedDepts([...expandedDepts, deptId]);
    }
  };
  
  return (
    <div className="border rounded-lg">
      {data.map((dept) => (
        <DepartmentNode 
          key={dept.id}
          department={dept}
          isExpanded={expandedDepts.includes(dept.id)}
          onToggle={() => toggleDepartment(dept.id)}
        />
      ))}
    </div>
  );
};

const DepartmentNode = ({ 
  department, 
  isExpanded, 
  onToggle 
}: { 
  department: DepartmentItem; 
  isExpanded: boolean; 
  onToggle: () => void;
}) => {
  return (
    <div>
      <div 
        className={cn(
          "p-3 flex items-center justify-between cursor-pointer hover:bg-accent/50",
          isExpanded ? "border-b" : ""
        )}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            isExpanded ? "rotate-90" : ""
          )} />
          <Building className="h-5 w-5 text-blue-500" />
          <span className="font-medium">{department.name}</span>
          <StatusIndicator status={department.status} />
        </div>
        <div className="flex items-center gap-2">
          <MetricBadge value={department.metrics.breached} type="breached" />
          <MetricBadge value={department.metrics.atRisk} type="atRisk" />
          <MetricBadge value={department.metrics.onSchedule} type="onSchedule" />
        </div>
      </div>
      
      {isExpanded && (
        <div className="pl-6 border-l ml-6">
          {department.teams.map((team) => (
            <TeamNode key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
};

const TeamNode = ({ team }: { team: TeamItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div>
      <div 
        className={cn(
          "p-3 flex items-center justify-between cursor-pointer hover:bg-accent/50",
          isExpanded ? "border-b" : ""
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <ChevronRight className={cn(
            "h-4 w-4 transition-transform",
            isExpanded ? "rotate-90" : ""
          )} />
          <Users className="h-5 w-5 text-indigo-500" />
          <span className="font-medium">{team.name}</span>
          <StatusIndicator status={team.status} />
        </div>
        <div className="flex items-center gap-2">
          <MetricBadge value={team.metrics.breached} type="breached" />
          <MetricBadge value={team.metrics.atRisk} type="atRisk" />
          <MetricBadge value={team.metrics.onSchedule} type="onSchedule" />
        </div>
      </div>
      
      {isExpanded && (
        <div className="pl-6 border-l ml-6">
          {team.applications.map((app) => (
            <ApplicationNode key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
};

const ApplicationNode = ({ application }: { application: ApplicationItem }) => {
  return (
    <Link to={`/interfaces`} className="block">
      <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-accent/50">
        <div className="flex items-center gap-3">
          <AppWindow className="h-5 w-5 text-violet-500 ml-4" />
          <span className="font-medium">{application.name}</span>
          <StatusIndicator status={application.status} />
        </div>
        <div className="flex items-center gap-2">
          <MetricBadge value={application.metrics.breached} type="breached" />
          <MetricBadge value={application.metrics.atRisk} type="atRisk" />
          <MetricBadge value={application.metrics.onSchedule} type="onSchedule" />
        </div>
      </div>
    </Link>
  );
};

export default OrganizationTree;
