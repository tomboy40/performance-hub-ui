
import { mockData } from "./mockData";

export type StatusType = "breached" | "at-risk" | "on-schedule";

export interface ApplicationItem {
  id: string;
  name: string;
  status: StatusType;
  metrics: {
    breached: number;
    atRisk: number;
    onSchedule: number;
  };
}

export interface TeamItem {
  id: string;
  name: string;
  status: StatusType;
  applications: ApplicationItem[];
  metrics: {
    breached: number;
    atRisk: number;
    onSchedule: number;
  };
}

export interface DepartmentItem {
  id: string;
  name: string;
  status: StatusType;
  teams: TeamItem[];
  metrics: {
    breached: number;
    atRisk: number;
    onSchedule: number;
  };
}

// Generate organization data based on existing mock data
const generateOrganizationData = (): DepartmentItem[] => {
  // Departments
  const departments: DepartmentItem[] = [
    {
      id: "dept1",
      name: "Information Technology",
      status: "on-schedule",
      teams: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    },
    {
      id: "dept2",
      name: "Finance",
      status: "on-schedule",
      teams: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    },
    {
      id: "dept3",
      name: "Operations",
      status: "on-schedule",
      teams: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    }
  ];
  
  // Teams for IT
  const itTeams: TeamItem[] = [
    {
      id: "team1",
      name: "Development",
      status: "on-schedule",
      applications: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    },
    {
      id: "team2",
      name: "Infrastructure",
      status: "on-schedule",
      applications: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    }
  ];
  
  // Teams for Finance
  const financeTeams: TeamItem[] = [
    {
      id: "team3",
      name: "Accounting",
      status: "on-schedule",
      applications: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    }
  ];
  
  // Teams for Operations
  const opsTeams: TeamItem[] = [
    {
      id: "team4",
      name: "Logistics",
      status: "on-schedule",
      applications: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    },
    {
      id: "team5",
      name: "Supply Chain",
      status: "on-schedule",
      applications: [],
      metrics: { breached: 0, atRisk: 0, onSchedule: 0 }
    }
  ];

  // Assign applications to teams based on existing mockData
  let appIndex = 0;
  for (const app of mockData.applications) {
    const associatedInterface = mockData.interfaces.find(i => i.application === app.name);
    const status = associatedInterface?.status || "on-schedule";
    
    // Create application item
    const appItem: ApplicationItem = {
      id: app.id,
      name: app.name,
      status: status,
      metrics: {
        breached: associatedInterface ? (status === "breached" ? 1 : 0) : 0,
        atRisk: associatedInterface ? (status === "at-risk" ? 1 : 0) : 0,
        onSchedule: associatedInterface ? (status === "on-schedule" ? 1 : 0) : 0
      }
    };
    
    // Distribute applications among teams
    if (appIndex % 5 === 0) {
      itTeams[0].applications.push(appItem);
      updateMetrics(itTeams[0], appItem);
    } else if (appIndex % 5 === 1) {
      itTeams[1].applications.push(appItem);
      updateMetrics(itTeams[1], appItem);
    } else if (appIndex % 5 === 2) {
      financeTeams[0].applications.push(appItem);
      updateMetrics(financeTeams[0], appItem);
    } else if (appIndex % 5 === 3) {
      opsTeams[0].applications.push(appItem);
      updateMetrics(opsTeams[0], appItem);
    } else {
      opsTeams[1].applications.push(appItem);
      updateMetrics(opsTeams[1], appItem);
    }
    
    appIndex++;
  }
  
  // Add teams to departments
  departments[0].teams = itTeams;
  departments[1].teams = financeTeams;
  departments[2].teams = opsTeams;
  
  // Update department metrics
  for (const dept of departments) {
    for (const team of dept.teams) {
      dept.metrics.breached += team.metrics.breached;
      dept.metrics.atRisk += team.metrics.atRisk;
      dept.metrics.onSchedule += team.metrics.onSchedule;
    }
    
    // Set department status based on metrics
    if (dept.metrics.breached > 0) {
      dept.status = "breached";
    } else if (dept.metrics.atRisk > 0) {
      dept.status = "at-risk";
    } else {
      dept.status = "on-schedule";
    }
    
    // Set team status based on metrics
    for (const team of dept.teams) {
      if (team.metrics.breached > 0) {
        team.status = "breached";
      } else if (team.metrics.atRisk > 0) {
        team.status = "at-risk";
      } else {
        team.status = "on-schedule";
      }
    }
  }
  
  return departments;
};

// Helper function to update team metrics
const updateMetrics = (team: TeamItem, app: ApplicationItem) => {
  team.metrics.breached += app.metrics.breached;
  team.metrics.atRisk += app.metrics.atRisk;
  team.metrics.onSchedule += app.metrics.onSchedule;
};

export const organizationData = generateOrganizationData();
