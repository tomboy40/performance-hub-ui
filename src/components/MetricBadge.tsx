
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MetricBadgeProps {
  value: number;
  type: "breached" | "atRisk" | "onSchedule";
  size?: "sm" | "md" | "lg";
}

const MetricBadge = ({ value, type, size = "md" }: MetricBadgeProps) => {
  // Skip rendering if the value is 0
  if (value === 0) return null;
  
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0",
    md: "text-xs px-2 py-0.5",
    lg: "text-sm px-2.5 py-1"
  };
  
  let badgeStyles = "";
  
  switch (type) {
    case "breached":
      badgeStyles = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      break;
    case "atRisk":
      badgeStyles = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      break;
    case "onSchedule":
      badgeStyles = "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      break;
  }
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-semibold border-transparent",
        badgeStyles,
        sizeClasses[size]
      )}
    >
      {value}
    </Badge>
  );
};

export default MetricBadge;
