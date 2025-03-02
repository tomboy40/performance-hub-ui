
import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import Overview from "@/components/Overview";
import InterfaceStatus from "@/components/InterfaceStatus";
import InterfaceDetails from "@/components/InterfaceDetails";
import { mockData } from "@/data/mockData";

const Index = () => {
  const [selectedInterface, setSelectedInterface] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(mockData);

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
      <div className="flex min-h-screen w-full bg-background">
        <DashboardLayout>
          <div className="container px-4 py-6 mx-auto transition-all duration-300 ease-in-out">
            <h1 className="text-3xl font-semibold tracking-tight mb-8">
              System Health Dashboard
            </h1>
            
            <div className={`transition-all duration-500 ease-in-out transform ${showDetails ? 'opacity-0 -translate-x-10 h-0 overflow-hidden' : 'opacity-100 translate-x-0'}`}>
              <Overview data={data} />
              <InterfaceStatus 
                data={data} 
                onSelectInterface={openDetails} 
              />
            </div>
            
            <div className={`transition-all duration-500 ease-in-out transform ${!showDetails ? 'opacity-0 translate-x-10 h-0 overflow-hidden' : 'opacity-100 translate-x-0'}`}>
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
