
import { CheckCircle, Clock, Calendar, XCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type SyncStatus = "idle" | "running" | "error" | "completed";

interface SyncStatusCardProps {
  status: SyncStatus;
  lastRun: string;
  nextRun: string;
  isLoading?: boolean;
}

export const SyncStatusCard = ({ status, lastRun, nextRun, isLoading = false }: SyncStatusCardProps) => {
  const StatusIndicator = () => {
    switch (status) {
      case "idle":
        return (
          <div className="flex items-center gap-2 text-emerald-500">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Idle</span>
          </div>
        );
      case "running":
        return (
          <div className="flex items-center gap-2 text-amber-500">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500"></span>
            </span>
            <span className="font-medium">Running</span>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            <span className="font-medium">Error</span>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-2 text-emerald-500">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Completed</span>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Status</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          {isLoading ? <Skeleton className="h-6 w-24" /> : <StatusIndicator />}
        </CardContent>
      </Card>

      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Last Run</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            {isLoading ? <Skeleton className="h-6 w-24" /> : (
              <span className="font-medium text-lg">{lastRun}</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Next Run</CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div>
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              {isLoading ? <Skeleton className="h-6 w-24" /> : (
                <span className="font-medium text-lg">{nextRun}</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Daily sync at 6:00 AM
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
