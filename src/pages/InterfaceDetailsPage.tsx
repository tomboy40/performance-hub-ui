
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import InterfaceDetails from "@/components/InterfaceDetails";
import { mockData } from "@/data/mockData";
import { Interface } from "@/data/mockData";
import { toast } from "@/components/ui/use-toast";

const InterfaceDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [interfaceData, setInterfaceData] = useState<Interface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    try {
      // Find the interface by ID
      const foundInterface = mockData.interfaces.find(item => item.id === id);
      
      if (foundInterface) {
        setInterfaceData(foundInterface);
      } else {
        toast({
          title: "Interface not found",
          description: `No interface with ID ${id} was found.`,
          variant: "destructive"
        });
        navigate("/interfaces");
      }
    } catch (error) {
      console.error("Error loading interface data:", error);
      toast({
        title: "Error loading interface",
        description: "Could not load interface details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleBack = () => {
    navigate("/interfaces");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <DashboardLayout>
          <div className="container mx-auto px-4 md:px-6 py-6">
            {loading ? (
              <div className="h-[500px] flex items-center justify-center">
                <div className="text-muted-foreground">Loading interface details...</div>
              </div>
            ) : interfaceData ? (
              <InterfaceDetails interfaceData={interfaceData} onBack={handleBack} />
            ) : (
              <div className="h-[500px] flex items-center justify-center">
                <div className="text-muted-foreground">Interface not found</div>
              </div>
            )}
          </div>
        </DashboardLayout>
      </div>
    </SidebarProvider>
  );
};

export default InterfaceDetailsPage;
