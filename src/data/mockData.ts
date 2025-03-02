
export interface Dataset {
  name: string;
  type: 'file' | 'database';
  schedule: string;
}

export interface Interface {
  id: string;
  name: string;
  type: string;
  application: string;
  status: 'breached' | 'at-risk' | 'on-schedule';
  nextRun: string;
  lastUpdate: string;
  schedule: string;
  datasets: Dataset[];
  dataStats: {
    size: string;
    records: string;
    avgProcessing: string;
    lastModified: string;
  };
  performanceHistory: number[];
}

export interface Application {
  id: string;
  name: string;
}

export interface MockDataType {
  applications: Application[];
  interfaces: Interface[];
  datasets: Dataset[];
}

export const mockData: MockDataType = {
  applications: [
    { id: "app1", name: "CRM System" },
    { id: "app2", name: "Inventory Management" },
    { id: "app3", name: "Finance Portal" },
    { id: "app4", name: "HR Dashboard" },
    { id: "app5", name: "Customer Portal" },
  ],
  
  interfaces: [
    {
      id: "if1",
      name: "Customer Data Sync",
      type: "API Integration",
      application: "CRM System",
      status: "breached",
      nextRun: "In 3 hours",
      lastUpdate: "2 days ago",
      schedule: "Daily at 9:00 AM",
      datasets: [
        { 
          name: "Customer Records",
          type: "database",
          schedule: "Daily at 9:00 AM"
        },
        { 
          name: "Customer Interactions",
          type: "file",
          schedule: "Daily at 9:30 AM"
        }
      ],
      dataStats: {
        size: "245 MB",
        records: "12,456",
        avgProcessing: "42 seconds",
        lastModified: "Yesterday"
      },
      performanceHistory: [60, 55, 48, 75, 90, 42, 58]
    },
    {
      id: "if2",
      name: "Order Processing Queue",
      type: "Message Queue",
      application: "Inventory Management",
      status: "at-risk",
      nextRun: "In 1 hour",
      lastUpdate: "5 hours ago",
      schedule: "Hourly",
      datasets: [
        { 
          name: "Order Transactions",
          type: "database",
          schedule: "Hourly"
        },
        { 
          name: "Inventory Updates",
          type: "database",
          schedule: "Every 2 hours"
        }
      ],
      dataStats: {
        size: "128 MB",
        records: "8,342",
        avgProcessing: "23 seconds",
        lastModified: "5 hours ago"
      },
      performanceHistory: [30, 24, 35, 28, 40, 22, 38]
    },
    {
      id: "if3",
      name: "Financial Reports",
      type: "File Transfer",
      application: "Finance Portal",
      status: "on-schedule",
      nextRun: "Tomorrow at 6:00 AM",
      lastUpdate: "Yesterday",
      schedule: "Weekly on Fridays at 6:00 AM",
      datasets: [
        { 
          name: "Weekly Revenue Report",
          type: "file",
          schedule: "Weekly on Fridays"
        },
        { 
          name: "Expense Summaries",
          type: "file",
          schedule: "Weekly on Fridays"
        }
      ],
      dataStats: {
        size: "56 MB",
        records: "2,105",
        avgProcessing: "18 seconds",
        lastModified: "Last Friday"
      },
      performanceHistory: [15, 18, 14, 16, 17, 15, 19]
    },
    {
      id: "if4",
      name: "Employee Data Sync",
      type: "API Integration",
      application: "HR Dashboard",
      status: "on-schedule",
      nextRun: "Tomorrow at 8:00 AM",
      lastUpdate: "Today at 8:00 AM",
      schedule: "Daily at 8:00 AM",
      datasets: [
        { 
          name: "Employee Records",
          type: "database",
          schedule: "Daily at 8:00 AM"
        },
        { 
          name: "Attendance Data",
          type: "file",
          schedule: "Daily at 8:30 AM"
        }
      ],
      dataStats: {
        size: "78 MB",
        records: "942",
        avgProcessing: "14 seconds",
        lastModified: "Today"
      },
      performanceHistory: [12, 14, 13, 15, 12, 11, 14]
    },
    {
      id: "if5",
      name: "Customer Support Tickets",
      type: "Message Queue",
      application: "Customer Portal",
      status: "on-schedule",
      nextRun: "In 30 minutes",
      lastUpdate: "1 hour ago",
      schedule: "Every 30 minutes",
      datasets: [
        { 
          name: "Support Tickets",
          type: "database",
          schedule: "Every 30 minutes"
        },
        { 
          name: "Customer Communication",
          type: "file",
          schedule: "Hourly"
        }
      ],
      dataStats: {
        size: "32 MB",
        records: "453",
        avgProcessing: "8 seconds",
        lastModified: "1 hour ago"
      },
      performanceHistory: [10, 7, 9, 8, 11, 7, 8]
    },
    {
      id: "if6",
      name: "Product Catalog Update",
      type: "File Transfer",
      application: "Inventory Management",
      status: "breached",
      nextRun: "Overdue by 2 days",
      lastUpdate: "3 days ago",
      schedule: "Daily at 10:00 PM",
      datasets: [
        { 
          name: "Product Catalog",
          type: "file",
          schedule: "Daily at 10:00 PM"
        },
        { 
          name: "Product Images",
          type: "file",
          schedule: "Daily at 11:00 PM"
        }
      ],
      dataStats: {
        size: "1.2 GB",
        records: "24,567",
        avgProcessing: "95 seconds",
        lastModified: "3 days ago"
      },
      performanceHistory: [85, 92, 88, 95, 105, 110, 98]
    }
  ],
  
  datasets: [
    { 
      name: "Customer Records",
      type: "database",
      schedule: "Daily at 9:00 AM"
    },
    { 
      name: "Customer Interactions",
      type: "file",
      schedule: "Daily at 9:30 AM"
    },
    { 
      name: "Order Transactions",
      type: "database",
      schedule: "Hourly"
    },
    { 
      name: "Inventory Updates",
      type: "database",
      schedule: "Every 2 hours"
    },
    { 
      name: "Weekly Revenue Report",
      type: "file",
      schedule: "Weekly on Fridays"
    },
    { 
      name: "Expense Summaries",
      type: "file",
      schedule: "Weekly on Fridays"
    },
    { 
      name: "Employee Records",
      type: "database",
      schedule: "Daily at 8:00 AM"
    },
    { 
      name: "Attendance Data",
      type: "file",
      schedule: "Daily at 8:30 AM"
    },
    { 
      name: "Support Tickets",
      type: "database",
      schedule: "Every 30 minutes"
    },
    { 
      name: "Customer Communication",
      type: "file",
      schedule: "Hourly"
    },
    { 
      name: "Product Catalog",
      type: "file",
      schedule: "Daily at 10:00 PM"
    },
    { 
      name: "Product Images",
      type: "file",
      schedule: "Daily at 11:00 PM"
    }
  ]
};
