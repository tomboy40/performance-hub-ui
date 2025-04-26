
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import StatusIndicator from "@/components/StatusIndicator";
import { mockData } from "@/data/mockData";

const CustomDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [expandedApps, setExpandedApps] = useState<string[]>([]);

  const applications = mockData.applications;
  const interfaces = mockData.interfaces;

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAppSelection = (appName: string) => {
    setSelectedApps(prev => 
      prev.includes(appName) 
        ? prev.filter(a => a !== appName)
        : [...prev, appName]
    );
  };

  const toggleAppExpansion = (appName: string) => {
    setExpandedApps(prev =>
      prev.includes(appName)
        ? prev.filter(a => a !== appName)
        : [...prev, appName]
    );
  };

  const getAppStatus = (appName: string) => {
    const appInterfaces = interfaces.filter(i => i.application === appName);
    if (appInterfaces.some(i => i.status === "breached")) return "breached";
    if (appInterfaces.some(i => i.status === "at-risk")) return "at-risk";
    return "on-schedule";
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardLayout>
          <div className="container mx-auto px-4 md:px-6 py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Custom Dashboard</h1>
              <Button variant="outline" asChild>
                <a href="/">Back to Main Dashboard</a>
              </Button>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Application Selection Panel */}
              <Card className="col-span-12 md:col-span-4">
                <CardHeader>
                  <CardTitle>Select Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <ScrollArea className="h-[400px] mt-4">
                    <div className="space-y-3">
                      {filteredApps.map(app => (
                        <div key={app.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={app.name}
                            checked={selectedApps.includes(app.name)}
                            onCheckedChange={() => toggleAppSelection(app.name)}
                          />
                          <label
                            htmlFor={app.name}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {app.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Selected Applications Dashboard */}
              <div className="col-span-12 md:col-span-8 space-y-6">
                {selectedApps.length === 0 ? (
                  <Card>
                    <CardContent className="flex items-center justify-center h-32">
                      <p className="text-muted-foreground">
                        Select applications to monitor from the left panel
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  selectedApps.map(appName => {
                    const appInterfaces = interfaces.filter(i => i.application === appName);
                    const isExpanded = expandedApps.includes(appName);
                    const status = getAppStatus(appName);

                    return (
                      <Card key={appName} className="transition-all">
                        <CardHeader 
                          className="cursor-pointer hover:bg-accent/50"
                          onClick={() => toggleAppExpansion(appName)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <StatusIndicator status={status} size="md" />
                              <CardTitle>{appName}</CardTitle>
                            </div>
                            <Button variant="ghost" size="sm">
                              {isExpanded ? "Collapse" : "Expand"}
                            </Button>
                          </div>
                        </CardHeader>
                        {isExpanded && (
                          <CardContent>
                            <div className="space-y-3">
                              {appInterfaces.map(interface_ => (
                                <div
                                  key={interface_.id}
                                  className="flex items-center justify-between p-3 rounded-lg border bg-card"
                                >
                                  <div className="flex items-center gap-3">
                                    <StatusIndicator status={interface_.status} size="sm" />
                                    <span className="font-medium">{interface_.name}</span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    Next Run: {interface_.nextRun}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </DashboardLayout>
      </div>
    </SidebarProvider>
  );
};

export default CustomDashboard;
