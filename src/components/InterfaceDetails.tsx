
import { motion } from "framer-motion";
import { ChevronLeft, Database, File, Clock, CalendarClock, RefreshCw, AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Interface } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InterfaceDetailsProps {
  interfaceData: Interface;
  onBack: () => void;
}

const InterfaceDetails = ({ interfaceData, onBack }: InterfaceDetailsProps) => {
  const performanceData = [
    { name: 'Mon', duration: interfaceData.performanceHistory[0] },
    { name: 'Tue', duration: interfaceData.performanceHistory[1] },
    { name: 'Wed', duration: interfaceData.performanceHistory[2] },
    { name: 'Thu', duration: interfaceData.performanceHistory[3] },
    { name: 'Fri', duration: interfaceData.performanceHistory[4] },
    { name: 'Sat', duration: interfaceData.performanceHistory[5] },
    { name: 'Sun', duration: interfaceData.performanceHistory[6] },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 p-0 h-8 w-8"
          onClick={onBack}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Interface Details
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{interfaceData.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {interfaceData.type} • {interfaceData.application}
                  </CardDescription>
                </div>
                <StatusIndicator status={interfaceData.status} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Next Run</p>
                    <p className="font-medium">{interfaceData.nextRun}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarClock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Schedule</p>
                    <p className="font-medium">{interfaceData.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">{interfaceData.lastUpdate}</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />
              
              <h3 className="text-lg font-medium mb-4">Performance History</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Duration (seconds)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip
                      formatter={(value) => [`${value} seconds`, 'Duration']}
                    />
                    <Bar 
                      dataKey="duration" 
                      fill={
                        interfaceData.status === "breached" ? "#ef4444" : 
                        interfaceData.status === "at-risk" ? "#f97316" : "#10b981"
                      } 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-none shadow-lg h-full">
            <CardHeader>
              <CardTitle>Associated Datasets</CardTitle>
              <CardDescription>
                Data collections used by this interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interfaceData.datasets.map((dataset, index) => (
                  <div 
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-start gap-3">
                      {dataset.type === 'file' ? (
                        <File className="h-5 w-5 text-blue-500 mt-0.5" />
                      ) : (
                        <Database className="h-5 w-5 text-indigo-500 mt-0.5" />
                      )}
                      <div>
                        <div className="font-medium">{dataset.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {dataset.type === 'file' ? 'File Transfer' : 'Database Records'}
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <CalendarClock className="h-3.5 w-3.5" />
                          <span>{dataset.schedule}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Dataset Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Size</div>
                    <div className="font-medium">{interfaceData.dataStats.size}</div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Record Count</div>
                    <div className="font-medium">{interfaceData.dataStats.records}</div>
                  </div>
                  <div className="bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg Processing</div>
                    <div className="font-medium">{interfaceData.dataStats.avgProcessing}</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last Modified</div>
                    <div className="font-medium">{interfaceData.dataStats.lastModified}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatusIndicator = ({ status }: { status: string }) => {
  switch (status) {
    case "breached":
      return (
        <div className="flex items-center gap-2 text-red-500">
          <Badge variant="destructive" className="flex items-center gap-1 px-2">
            <AlertCircle className="h-3.5 w-3.5" />
            SLA Breached
          </Badge>
        </div>
      );
    case "at-risk":
      return (
        <div className="flex items-center gap-2 text-amber-500">
          <Badge variant="outline" className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800 flex items-center gap-1 px-2">
            <AlertTriangle className="h-3.5 w-3.5" />
            SLA at Risk
          </Badge>
        </div>
      );
    case "on-schedule":
      return (
        <div className="flex items-center gap-2 text-emerald-500">
          <Badge variant="outline" className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 flex items-center gap-1 px-2">
            <CheckCircle className="h-3.5 w-3.5" />
            On Schedule
          </Badge>
        </div>
      );
    default:
      return null;
  }
};

export default InterfaceDetails;
