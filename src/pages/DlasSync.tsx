
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { SyncStatusCard } from "@/components/dlas-sync/SyncStatusCard";
import { SyncProgressCard } from "@/components/dlas-sync/SyncProgressCard";
import { SyncErrorsCard } from "@/components/dlas-sync/SyncErrorsCard";
import { SyncControlCard } from "@/components/dlas-sync/SyncControlCard";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const DlasSync = () => {
  const [syncStatus, setSyncStatus] = useState<"idle" | "running" | "error" | "completed">("idle");
  const [progress, setProgress] = useState(0);
  const [applicationId, setApplicationId] = useState("");
  const [isConnected, setIsConnected] = useState(true);
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardLayout>
          <div className="container mx-auto px-4 md:px-6 py-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold tracking-tight">DLAS Data Sync</h1>
              <p className="text-muted-foreground">
                Synchronize application interface data from DLAS
              </p>
            </motion.div>

            <SyncStatusCard 
              status={syncStatus}
              lastRun={syncData.lastRun}
              nextRun={syncData.nextRun}
              isLoading={false}
            />

            <SyncProgressCard 
              progress={progress}
              syncData={syncData}
              isSyncing={isSyncing}
            />

            <SyncErrorsCard errors={syncData.errors} />

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center text-sm mb-6">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500" : "bg-destructive"} mr-2`}></div>
                <span>{isConnected ? "Connected to live updates" : "Not connected"}</span>
              </div>

              <SyncControlCard 
                applicationId={applicationId}
                setApplicationId={setApplicationId}
                handleSync={handleSync}
                isSyncing={isSyncing}
              />
            </motion.div>
          </div>
        </DashboardLayout>
      </div>
    </SidebarProvider>
  );
};

export default DlasSync;
