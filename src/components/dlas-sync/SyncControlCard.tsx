
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SyncControlCardProps {
  applicationId: string;
  setApplicationId: (value: string) => void;
  handleSync: () => void;
  isSyncing: boolean;
}

export const SyncControlCard = ({ 
  applicationId, 
  setApplicationId, 
  handleSync, 
  isSyncing 
}: SyncControlCardProps) => {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Start Manual Sync</CardTitle>
        <CardDescription>
          Manually trigger a sync from DLAS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="applicationId" className="text-sm font-medium block mb-2">
              Application ID (Optional)
            </label>
            <Input
              id="applicationId"
              placeholder="Enter application ID (numbers only)"
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value.replace(/[^0-9]/g, ''))}
              className="mb-1"
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to sync all applications
            </p>
          </div>
          
          <Button 
            onClick={handleSync}
            disabled={isSyncing}
            className="gap-2 w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4" />
            {isSyncing ? "Syncing..." : "Start Sync"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
