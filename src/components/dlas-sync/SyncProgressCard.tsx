
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface SyncData {
  applications: {
    total: number;
    processed: number;
    successRate: number;
  };
  interfaces: {
    total: number;
    processed: number;
    successRate: number;
  };
  datasets: {
    total: number;
    processed: number;
    successRate: number;
  };
  elapsedTime: string;
}

interface SyncProgressCardProps {
  progress: number;
  syncData: SyncData;
  isSyncing: boolean;
}

export const SyncProgressCard = ({ progress, syncData, isSyncing }: SyncProgressCardProps) => {
  const getBadgeVariant = (rate: number) => {
    if (rate === 100) return "default";
    if (rate > 50) return "secondary";
    return "destructive";
  };

  return (
    <Card className="mb-8 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>
              {progress === 100 
                ? "Sync completed successfully" 
                : isSyncing 
                  ? "Sync in progress..." 
                  : "Ready to sync"}
            </CardDescription>
          </div>
          <div className="text-base font-medium">
            {progress}% completed
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2 mb-6" />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-card border rounded-lg p-4 transition-all hover:border-primary/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Applications</h3>
              <Badge variant={getBadgeVariant(syncData.applications.successRate)}>
                {syncData.applications.successRate}%
              </Badge>
            </div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between">
                <span className="text-sm">Total:</span>
                <span className="font-medium">{syncData.applications.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Processed:</span>
                <span className="font-medium">
                  {isSyncing 
                    ? <Skeleton className="h-4 w-8 inline-block" /> 
                    : syncData.applications.processed}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4 transition-all hover:border-primary/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Interfaces</h3>
              <Badge variant={getBadgeVariant(syncData.interfaces.successRate)}>
                {syncData.interfaces.successRate}%
              </Badge>
            </div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between">
                <span className="text-sm">Total:</span>
                <span className="font-medium">{syncData.interfaces.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Processed:</span>
                <span className="font-medium">
                  {isSyncing 
                    ? <Skeleton className="h-4 w-8 inline-block" /> 
                    : syncData.interfaces.processed}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-4 transition-all hover:border-primary/30">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-muted-foreground">Datasets</h3>
              <Badge variant={getBadgeVariant(syncData.datasets.successRate)}>
                {syncData.datasets.successRate}%
              </Badge>
            </div>
            <div className="space-y-1 mt-2">
              <div className="flex justify-between">
                <span className="text-sm">Total:</span>
                <span className="font-medium">{syncData.datasets.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Processed:</span>
                <span className="font-medium">
                  {isSyncing 
                    ? <Skeleton className="h-4 w-8 inline-block" /> 
                    : syncData.datasets.processed}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground flex items-center">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          <span>Elapsed time: {syncData.elapsedTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};
