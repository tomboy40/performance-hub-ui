
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { StatusType } from "@/data/organizationData";

interface StatusIndicatorProps {
  status: StatusType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const StatusIndicator = ({ 
  status, 
  size = "md", 
  showLabel = false,
  className 
}: StatusIndicatorProps) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };
  
  let statusColor = "";
  let statusText = "";
  
  switch (status) {
    case "breached":
      statusColor = "bg-red-500";
      statusText = "SLA Breached";
      break;
    case "at-risk":
      statusColor = "bg-amber-500";
      statusText = "SLA at Risk";
      break;
    case "on-schedule":
      statusColor = "bg-emerald-500";
      statusText = "On Schedule";
      break;
  }
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "rounded-full",
        sizeClasses[size],
        statusColor
      )} />
      {showLabel && <span className="text-xs font-medium">{statusText}</span>}
    </div>
  );
};

export default StatusIndicator;
