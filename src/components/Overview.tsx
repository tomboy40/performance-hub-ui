
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
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-blue-500" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-3xl font-bold">
                {applications.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="h-4 w-4 text-indigo-500" />
                Interfaces
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-3xl font-bold">
                {interfaces.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Database className="h-4 w-4 text-violet-500" />
                Datasets
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="text-3xl font-bold">
                {datasets.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
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
