
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid, Activity, Database } from "lucide-react";
import { MockDataType } from "@/data/mockData";

interface OverviewProps {
  data: MockDataType;
}

const Overview = ({ data }: OverviewProps) => {
  const { applications, interfaces, datasets } = data;
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 opacity-50 rounded-lg" />
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-blue-500" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pb-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {applications.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Total monitored applications
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 opacity-50 rounded-lg" />
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Activity className="h-4 w-4 text-indigo-500" />
                Interfaces
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pb-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {interfaces.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Active system interfaces
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 opacity-50 rounded-lg" />
            <CardHeader className="relative pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <Database className="h-4 w-4 text-violet-500" />
                Datasets
              </CardTitle>
            </CardHeader>
            <CardContent className="relative pb-4">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {datasets.length}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Managed data collections
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
