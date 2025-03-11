
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import Overview from "@/components/Overview";
import InterfaceStatus from "@/components/InterfaceStatus";
import InterfaceDetails from "@/components/InterfaceDetails";
import { mockData } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle, ArrowRight, Clock, Eye, Folder, Database, Pin, PinOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedInterface, setSelectedInterface] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [data] = useState(mockData);
  const [pinnedItems, setPinnedItems] = useState<string[]>([]);

  const closeDetails = () => {
    setShowDetails(false);
    setTimeout(() => {
      setSelectedInterface(null);
    }, 300);
  };

  const openDetails = (id: string) => {
    setSelectedInterface(id);
    setTimeout(() => {
      setShowDetails(true);
    }, 100);
  };

  const togglePin = (itemName: string) => {
    if (pinnedItems.includes(itemName)) {
      setPinnedItems(pinnedItems.filter(name => name !== itemName));
      toast({
        title: "Item unpinned",
        description: `${itemName} has been removed from your pinned items.`,
      });
    } else {
      setPinnedItems([...pinnedItems, itemName]);
      toast({
        title: "Item pinned",
        description: `${itemName} has been added to your pinned items.`,
      });
    }
  };

  const breached = data.interfaces.filter(i => i.status === "breached").length;
  const atRisk = data.interfaces.filter(i => i.status === "at-risk").length;
  const onSchedule = data.interfaces.filter(i => i.status === "on-schedule").length;
  const total = data.interfaces.length;

  const statusData = [
    { name: "SLA Breached", value: breached, color: "#ef4444" },
    { name: "SLA at Risk", value: atRisk, color: "#f97316" },
    { name: "On Schedule", value: onSchedule, color: "#10b981" }
  ];

  const recentItems = [
    { 
      type: "application", 
      name: "Order Processing System", 
      date: "Today, 10:30 AM", 
      icon: Folder,
      status: "on-schedule" 
    },
    { 
      type: "interface", 
      name: "Payment Gateway API", 
      date: "Yesterday, 3:45 PM", 
      icon: ArrowRight,
      status: "at-risk" 
    },
    { 
      type: "dataset", 
      name: "Customer Records", 
      date: "Yesterday, 11:20 AM", 
      icon: Database,
      status: "breached" 
    },
    { 
      type: "application", 
      name: "Inventory Management", 
      date: "2 days ago", 
      icon: Folder,
      status: "on-schedule" 
    },
    { 
      type: "interface", 
      name: "Shipping Integration", 
      date: "3 days ago", 
      icon: ArrowRight,
      status: "breached" 
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardLayout>
          <div className="container mx-auto px-4 md:px-6 py-6">
            <h1 className="text-2xl font-bold tracking-tight mb-6">
              System Health Dashboard
            </h1>
            
            <div className={`transition-all duration-500 ease-in-out ${showDetails ? 'opacity-0 scale-95 h-0 overflow-hidden' : 'opacity-100 scale-100'}`}>
              <Overview data={data} />
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Interface Status Overview</h2>
                  <Button variant="outline" size="sm" asChild className="gap-1">
                    <Link to="/interfaces">
                      <span>View All Interfaces</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="lg:col-span-1"
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>SLA Status</CardTitle>
                        <CardDescription>
                          Current status of all interfaces
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center gap-1">
                                <AlertCircle className="h-4 w-4 text-destructive" />
                                SLA Breached
                              </span>
                              <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                                {breached}
                              </Badge>
                            </div>
                            <Progress value={breached/total*100} className="h-2" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(breached/total*100)}% of total interfaces
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center gap-1">
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                SLA at Risk
                              </span>
                              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                {atRisk}
                              </Badge>
                            </div>
                            <Progress value={atRisk/total*100} className="h-2" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(atRisk/total*100)}% of total interfaces
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                                On Schedule
                              </span>
                              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                {onSchedule}
                              </Badge>
                            </div>
                            <Progress value={onSchedule/total*100} className="h-2" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(onSchedule/total*100)}% of total interfaces
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="lg:col-span-2"
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>SLA Status Comparison</CardTitle>
                        <CardDescription>
                          Visual comparison of interface statuses
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={statusData}
                              margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip 
                                formatter={(value) => [`${value} interfaces`, "Count"]}
                                contentStyle={{ 
                                  borderRadius: '6px', 
                                  border: '1px solid hsl(var(--border))',
                                  backgroundColor: 'hsl(var(--card))',
                                  color: 'hsl(var(--foreground))'
                                }} 
                              />
                              <Bar dataKey="value">
                                {statusData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Recently Viewed Items</CardTitle>
                    <CardDescription>
                      Quick access to your recent applications, interfaces, and datasets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-card rounded-lg p-3 border border-border hover:bg-accent/50 transition-all cursor-pointer group"
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-md text-primary">
                                <item.icon className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium group-hover:text-primary transition-colors">{item.name}</h3>
                                  <StatusBadge status={item.status} />
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.date}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="capitalize">
                                {item.type}
                              </Badge>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  togglePin(item.name);
                                }}
                              >
                                {pinnedItems.includes(item.name) ? (
                                  <Pin className="h-4 w-4 text-primary" />
                                ) : (
                                  <PinOff className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className={`transition-all duration-500 ease-in-out ${!showDetails ? 'opacity-0 scale-95 h-0 overflow-hidden' : 'opacity-100 scale-100'}`}>
              {selectedInterface && (
                <InterfaceDetails 
                  interfaceData={data.interfaces.find(i => i.id === selectedInterface)!} 
                  onBack={closeDetails}
                />
              )}
            </div>
          </div>
        </DashboardLayout>
      </div>
    </SidebarProvider>
  );
};

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

export default Index;
