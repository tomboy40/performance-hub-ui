
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import Overview from "@/components/Overview";
import InterfaceStatus from "@/components/InterfaceStatus";
import InterfaceDetails from "@/components/InterfaceDetails";
import { mockData } from "@/data/mockData";

const Index = () => {
  const [selectedInterface, setSelectedInterface] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [data] = useState(mockData);

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
              <InterfaceStatus 
                data={data} 
                onSelectInterface={openDetails} 
                summaryView={true}
              />
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

export default Index;
