
import { useState } from "react";
import { AlertCircle, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface SyncErrorsCardProps {
  errors: string[];
}

export const SyncErrorsCard = ({ errors }: SyncErrorsCardProps) => {
  const [showErrors, setShowErrors] = useState(false);

  if (errors.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Card className="border-destructive/20 transition-all hover:shadow-md">
        <CardHeader 
          className="pb-2 cursor-pointer"
          onClick={() => setShowErrors(!showErrors)}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center text-destructive">
              <AlertCircle className="h-4 w-4 mr-2" />
              <CardTitle className="text-destructive">
                {errors.length} {errors.length === 1 ? 'error' : 'errors'} occurred during sync
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
              {errors.map((error, index) => (
                <div key={index} className="p-3 bg-destructive/10 rounded text-sm">
                  {error}
                </div>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};
