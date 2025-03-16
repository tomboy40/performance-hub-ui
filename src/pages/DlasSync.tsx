
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Clock, Play, Calendar, ArrowUp, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const DlasSync = () => {
  const [syncStatus, setSyncStatus] = useState<"idle" | "running" | "error" | "completed">("idle");
  const [progress, setProgress] = useState(0);
  const [applicationId, setApplicationId] = useState("");
  const [isConnected, setIsConnected] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Mock sync data
  const syncData = {
    lastRun: "08:27 PM",
    nextRun: "06:00 AM",
    applications: {
      total: 15,
      processed: 15,
      successRate: 100
    },
    interfaces: {
      total: 4,
      processed: 2,
      successRate: 50
    },
    datasets: {
      total: 12,
      processed: 0,
      successRate: 0
    },
    elapsedTime: "1s",
    errors: [
      "Error processing dataset 'Customer Records': Connection timeout",
      "Error processing interface 'Shipping API': Invalid response format"
    ]
  };

  const handleSync = () => {
    // Reset progress
    setProgress(0);
    setIsSyncing(true);
    setSyncStatus("running");
    
    toast({
      title: "Sync started",
      description: applicationId 
        ? `Syncing application ID: ${applicationId}` 
        : "Syncing all applications"
    });
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncStatus("completed");
          setIsSyncing(false);
          
          toast({
            title: "Sync completed",
            description: "Data has been synchronized from DLAS"
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 800);
  };

  const StatusIndicator = () => {
    switch (syncStatus) {
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
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardLayout>
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight">DLAS Data Sync</h1>
              <p className="text-muted-foreground">
                Synchronize application interface data from DLAS
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StatusIndicator />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Last Run</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-foreground">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium text-lg">{syncData.lastRun}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-medium">Next Run</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium text-lg">{syncData.nextRun}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Daily sync at 6:00 AM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mb-8"
            >
              <Card>
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
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Applications</h3>
                      <div className="space-y-1">
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
                        <div className="flex justify-between">
                          <span className="text-sm">Success Rate:</span>
                          <span className="font-medium text-emerald-500">
                            {isSyncing 
                              ? <Skeleton className="h-4 w-12 inline-block" /> 
                              : `${syncData.applications.successRate}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Interfaces</h3>
                      <div className="space-y-1">
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
                        <div className="flex justify-between">
                          <span className="text-sm">Success Rate:</span>
                          <span className="font-medium text-amber-500">
                            {isSyncing 
                              ? <Skeleton className="h-4 w-12 inline-block" /> 
                              : `${syncData.interfaces.successRate}%`}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card border rounded-lg p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Datasets</h3>
                      <div className="space-y-1">
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
                        <div className="flex justify-between">
                          <span className="text-sm">Success Rate:</span>
                          <span className="font-medium text-destructive">
                            {isSyncing 
                              ? <Skeleton className="h-4 w-12 inline-block" /> 
                              : `${syncData.datasets.successRate}%`}
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
            </motion.div>

            {syncData.errors.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mb-8"
              >
                <Card className="border-destructive/20">
                  <CardHeader 
                    className="pb-2 cursor-pointer"
                    onClick={() => setShowErrors(!showErrors)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-destructive">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <CardTitle className="text-destructive">
                          {syncData.errors.length} errors occurred during sync
                        </CardTitle>
                      </div>
                      <ArrowUp 
                        className={`h-5 w-5 transition-transform duration-200 ${showErrors ? "rotate-180" : ""}`}
                      />
                    </div>
                  </CardHeader>
                  {showErrors && (
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        {syncData.errors.map((error, index) => (
                          <div key={index} className="p-3 bg-destructive/10 rounded text-sm">
                            {error}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mb-4"
            >
              <div className="flex items-center text-sm mb-6">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-destructive"} mr-2`}></div>
                <span>{isConnected ? "Connected to live updates" : "Not connected"}</span>
              </div>

              <Card>
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
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" />
                      {isSyncing ? "Syncing..." : "Start Sync"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </DashboardLayout>
      </div>
    </SidebarProvider>
  );
};

export default DlasSync;
