
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle, Clock, ChevronRight, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockData, Interface, MockDataType } from "@/data/mockData";
import { Button } from "@/components/ui/button";

interface InterfaceStatusProps {
  data: MockDataType;
  onSelectInterface: (id: string) => void;
  summaryView?: boolean;
}

const InterfaceStatus = ({ data, onSelectInterface, summaryView = false }: InterfaceStatusProps) => {
  const { interfaces } = data;
  const [activeTab, setActiveTab] = useState("all");

  const filteredInterfaces = 
    activeTab === "all" 
      ? interfaces 
      : interfaces.filter(item => item.status === activeTab);
  
  const breached = interfaces.filter(i => i.status === "breached").length;
  const atRisk = interfaces.filter(i => i.status === "at-risk").length;
  const onSchedule = interfaces.filter(i => i.status === "on-schedule").length;
  const total = interfaces.length;
  
  const pieData = [
    { name: "SLA Breached", value: breached, color: "#ef4444" },
    { name: "SLA at Risk", value: atRisk, color: "#f97316" },
    { name: "SLA On Schedule", value: onSchedule, color: "#10b981" }
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Interface Status</h2>
        {summaryView && (
          <Button variant="outline" size="sm" asChild>
            <a href="/interfaces" className="flex items-center gap-1">
              <span>View All Interfaces</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {summaryView ? (
          // Summary view - show only the stats and chart
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>SLA Status Summary</CardTitle>
                  <CardDescription>
                    Overview of interface SLA status across all systems
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-card p-4 rounded-lg border border-border flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          SLA Breached
                        </span>
                        <Badge variant="outline" className="bg-red-50 text-red-500 border-red-200 dark:bg-red-950/30 dark:border-red-800">
                          {breached}
                        </Badge>
                      </div>
                      <Progress value={breached/total*100} className="h-2 bg-muted mb-1" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(breached/total*100)}% of total interfaces
                      </span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="bg-card p-4 rounded-lg border border-border flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          SLA at Risk
                        </span>
                        <Badge variant="outline" className="bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
                          {atRisk}
                        </Badge>
                      </div>
                      <Progress value={atRisk/total*100} className="h-2 bg-muted mb-1" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(atRisk/total*100)}% of total interfaces
                      </span>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="bg-card p-4 rounded-lg border border-border flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          On Schedule
                        </span>
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-500 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800">
                          {onSchedule}
                        </Badge>
                      </div>
                      <Progress value={onSchedule/total*100} className="h-2 bg-muted mb-1" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(onSchedule/total*100)}% of total interfaces
                      </span>
                    </motion.div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Recent Critical Issues</h3>
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                      {interfaces.filter(i => i.status === "breached").slice(0, 3).map(item => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.01 }}
                          className="bg-card rounded-lg shadow-sm p-3 cursor-pointer border border-border hover:bg-accent/50 transition-all"
                          onClick={() => onSelectInterface(item.id)}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-sm">{item.name}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.type} • {item.application}
                              </p>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              <span className="text-xs">{item.nextRun}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {interfaces.filter(i => i.status === "breached").length === 0 && (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No breached interfaces found
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>SLA Distribution</CardTitle>
                  <CardDescription>
                    Visual breakdown of interface status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} interfaces`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-sm">SLA Breached</span>
                      </div>
                      <div className="text-sm font-medium">{breached} ({Math.round(breached/total*100)}%)</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        <span className="text-sm">SLA at Risk</span>
                      </div>
                      <div className="text-sm font-medium">{atRisk} ({Math.round(atRisk/total*100)}%)</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="text-sm">SLA On Schedule</span>
                      </div>
                      <div className="text-sm font-medium">{onSchedule} ({Math.round(onSchedule/total*100)}%)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        ) : (
          // Full view - show the original implementation
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Interface Monitoring</CardTitle>
                  <CardDescription>
                    Monitor all interface connections and their SLA status
                  </CardDescription>
                  <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="breached" className="text-red-500">Breached</TabsTrigger>
                      <TabsTrigger value="at-risk" className="text-amber-500">At Risk</TabsTrigger>
                      <TabsTrigger value="on-schedule" className="text-emerald-500">On Schedule</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="m-0">
                      <InterfaceList 
                        interfaces={filteredInterfaces} 
                        onSelectInterface={onSelectInterface} 
                      />
                    </TabsContent>
                    <TabsContent value="breached" className="m-0">
                      <InterfaceList 
                        interfaces={filteredInterfaces} 
                        onSelectInterface={onSelectInterface} 
                      />
                    </TabsContent>
                    <TabsContent value="at-risk" className="m-0">
                      <InterfaceList 
                        interfaces={filteredInterfaces} 
                        onSelectInterface={onSelectInterface} 
                      />
                    </TabsContent>
                    <TabsContent value="on-schedule" className="m-0">
                      <InterfaceList 
                        interfaces={filteredInterfaces} 
                        onSelectInterface={onSelectInterface} 
                      />
                    </TabsContent>
                  </Tabs>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="border shadow-sm h-full">
                <CardHeader>
                  <CardTitle>SLA Status Overview</CardTitle>
                  <CardDescription>
                    Summary of all interface SLA statuses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value, name) => [`${value} interfaces`, name]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-sm">SLA Breached</span>
                      </div>
                      <div className="text-sm font-medium">{breached} ({Math.round(breached/total*100)}%)</div>
                    </div>
                    <Progress value={breached/total*100} className="h-2 bg-gray-200" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        <span className="text-sm">SLA at Risk</span>
                      </div>
                      <div className="text-sm font-medium">{atRisk} ({Math.round(atRisk/total*100)}%)</div>
                    </div>
                    <Progress value={atRisk/total*100} className="h-2 bg-gray-200" />
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                        <span className="text-sm">SLA On Schedule</span>
                      </div>
                      <div className="text-sm font-medium">{onSchedule} ({Math.round(onSchedule/total*100)}%)</div>
                    </div>
                    <Progress value={onSchedule/total*100} className="h-2 bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

interface InterfaceListProps {
  interfaces: Interface[];
  onSelectInterface: (id: string) => void;
}

const InterfaceList = ({ interfaces, onSelectInterface }: InterfaceListProps) => {
  return (
    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
      {interfaces.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No interfaces found in this category
        </div>
      ) : (
        interfaces.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.01 }}
            className="bg-card rounded-lg shadow-sm p-4 cursor-pointer border border-border hover:bg-accent/50 transition-all"
            onClick={() => onSelectInterface(item.id)}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.type} • {item.application}
                </p>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">{item.nextRun}</span>
                <ChevronRight className="h-5 w-5 ml-2" />
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
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

export default InterfaceStatus;
