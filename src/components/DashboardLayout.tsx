
import { ReactNode } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent,
  SidebarGroupLabel, 
  SidebarMenu,
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Activity, 
  Database, 
  Settings, 
  BarChart3, 
  Bell, 
  Users,
  LogOut,
  RefreshCw
} from "lucide-react";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="fixed top-0 right-0 p-4 z-10">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </>
  );
};

const AppSidebar = () => {
  const location = useLocation();
  
  return (
    <Sidebar>
      <SidebarContent>
        <div className="py-6 px-4">
          <h2 className="text-xl font-semibold tracking-tight text-sidebar-foreground">
            Performance Hub
          </h2>
          <p className="text-sm text-sidebar-foreground/60">
            Monitoring & Analytics
          </p>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className={location.pathname === "/" ? "bg-sidebar-accent" : ""} asChild>
                  <a href="/">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className={location.pathname.includes("/interfaces") ? "bg-sidebar-accent" : ""} asChild>
                  <a href="/interfaces">
                    <Activity className="w-5 h-5" />
                    <span>Interfaces</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className={location.pathname === "/dlas-sync" ? "bg-sidebar-accent" : ""} asChild>
                  <a href="/dlas-sync">
                    <RefreshCw className="w-5 h-5" />
                    <span>DLAS Sync</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Database className="w-5 h-5" />
                    <span>Databases</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <BarChart3 className="w-5 h-5" />
                    <span>Analytics</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Users className="w-5 h-5" />
                    <span>Team</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <LogOut className="w-5 h-5" />
                    <span>Log out</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardLayout;
