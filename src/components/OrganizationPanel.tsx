
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OrganizationTree from "./OrganizationTree";
import { organizationData } from "@/data/organizationData";
import { Button } from "@/components/ui/button";
import { FolderTree, List } from "lucide-react";

const OrganizationPanel = () => {
  const [viewType, setViewType] = useState<"tree" | "list">("tree");
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Organization Structure</CardTitle>
            <CardDescription>
              Explore by department, team, and application
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <Button
              variant={viewType === "tree" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("tree")}
              className="h-8 w-8 p-0"
            >
              <FolderTree className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <OrganizationTree data={organizationData} />
      </CardContent>
    </Card>
  );
};

export default OrganizationPanel;
