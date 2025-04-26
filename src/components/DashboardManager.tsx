
import { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export interface Dashboard {
  id: string;
  name: string;
  selectedApps: string[];
}

interface DashboardManagerProps {
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
  onCreateDashboard: (name: string) => void;
  onSelectDashboard: (dashboard: Dashboard) => void;
  onDeleteDashboard: (dashboardId: string) => void;
  onRenameDashboard: (dashboardId: string, newName: string) => void;
}

export function DashboardManager({
  dashboards,
  currentDashboard,
  onCreateDashboard,
  onSelectDashboard,
  onDeleteDashboard,
  onRenameDashboard,
}: DashboardManagerProps) {
  const [newDashboardName, setNewDashboardName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreateDashboard = () => {
    if (!newDashboardName.trim()) {
      toast({
        title: "Error",
        description: "Dashboard name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    onCreateDashboard(newDashboardName.trim());
    setNewDashboardName("");
  };

  const startEditing = (dashboard: Dashboard) => {
    setEditingId(dashboard.id);
    setEditName(dashboard.name);
  };

  const handleRename = (dashboardId: string) => {
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Dashboard name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    onRenameDashboard(dashboardId, editName.trim());
    setEditingId(null);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="New dashboard name"
            value={newDashboardName}
            onChange={(e) => setNewDashboardName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreateDashboard()}
          />
          <Button onClick={handleCreateDashboard} className="gap-2">
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>

        <div className="space-y-2">
          {dashboards.map((dashboard) => (
            <div
              key={dashboard.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                currentDashboard?.id === dashboard.id
                  ? "bg-accent"
                  : "hover:bg-accent/50"
              }`}
            >
              {editingId === dashboard.id ? (
                <div className="flex gap-2 flex-1">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRename(dashboard.id)}
                  />
                  <Button onClick={() => handleRename(dashboard.id)} size="sm">
                    Save
                  </Button>
                  <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onSelectDashboard(dashboard)}
                    className="flex-1 text-left px-2 py-1 hover:text-primary transition-colors"
                  >
                    {dashboard.name}
                  </button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(dashboard)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteDashboard(dashboard.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
