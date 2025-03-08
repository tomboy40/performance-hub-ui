
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { mockData } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Interfaces = () => {
  const [data] = useState(mockData);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardLayout>
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold tracking-tight">All Interfaces</h1>
              <Button variant="outline" size="sm" asChild>
                <Link to="/">Back to Dashboard</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {data.interfaces.map((interfaceItem, index) => (
                <motion.div
                  key={interfaceItem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{interfaceItem.name}</CardTitle>
                        <StatusBadge status={interfaceItem.status} />
                      </div>
                      <CardDescription>
                        {interfaceItem.application} → {interfaceItem.type}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Last Updated</p>
                            <p className="font-medium">{interfaceItem.lastUpdate}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">SLA Status</p>
                            <p className="font-medium capitalize">{interfaceItem.status.replace("-", " ")}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Type</p>
                            <p className="font-medium">{interfaceItem.type}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Next Run</p>
                            <p className="font-medium">{interfaceItem.nextRun}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full" asChild>
                          <Link to={`/?interface=${interfaceItem.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </DashboardLayout>
      </div>
    </SidebarProvider>
  );
};

// Helper component for status badges
const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "breached":
      return (
        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          SLA Breached
        </Badge>
      );
    case "at-risk":
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          SLA at Risk
        </Badge>
      );
    case "on-schedule":
      return (
        <Badge variant="outline" className="text-emerald-500 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-800 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          On Schedule
        </Badge>
      );
    default:
      return null;
  }
};

export default Interfaces;
