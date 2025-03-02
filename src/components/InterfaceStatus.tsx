
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, CheckCircle, Clock, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockData, Interface, MockDataType } from "@/data/mockData";

interface InterfaceStatusProps {
  data: MockDataType;
  onSelectInterface: (id: string) => void;
}

const InterfaceStatus = ({ data, onSelectInterface }: InterfaceStatusProps) => {
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
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Interface Status</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-none shadow-lg h-full">
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
          <Card className="border-none shadow-lg h-full">
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
                <Progress value={breached/total*100} className="h-2 bg-gray-200" indicatorClassName="bg-red-500" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span className="text-sm">SLA at Risk</span>
                  </div>
                  <div className="text-sm font-medium">{atRisk} ({Math.round(atRisk/total*100)}%)</div>
                </div>
                <Progress value={atRisk/total*100} className="h-2 bg-gray-200" indicatorClassName="bg-orange-500" />
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-sm">SLA On Schedule</span>
                  </div>
                  <div className="text-sm font-medium">{onSchedule} ({Math.round(onSchedule/total*100)}%)</div>
                </div>
                <Progress value={onSchedule/total*100} className="h-2 bg-gray-200" indicatorClassName="bg-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 cursor-pointer border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
            onClick={() => onSelectInterface(item.id)}
          >
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.type} • {item.application}
                </p>
              </div>
              <div className="flex items-center text-gray-400">
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
