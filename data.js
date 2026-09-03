const projects = [
  {
    id: "P001",
    name: "Delhi–Mumbai Expressway",
    state: "Rajasthan",
    parcels: 8420,
    progress: 76,
    risk: "On Track"
  },
  {
    id: "P002",
    name: "NH-48 Expansion",
    state: "Haryana",
    parcels: 5130,
    progress: 61,
    risk: "At Risk"
  },
  {
    id: "P003",
    name: "Dedicated Freight Corridor",
    state: "Uttar Pradesh",
    parcels: 11208,
    progress: 88,
    risk: "On Track"
  },
  {
    id: "P004",
    name: "Regional Airport Development",
    state: "Madhya Pradesh",
    parcels: 2870,
    progress: 43,
    risk: "Delayed"
  }
];

const cases = [
  {
    reference: "BHS-RJ-2026-10482",
    owner: "Demo Citizen",
    state: "Rajasthan",
    project: "Delhi–Mumbai Expressway",
    stage: "Objection Review",
    nextStage: "Compensation Assessment",
    ownership: "Verified",
    compensation: "Assessment Pending",
    rr: "Eligible",
    updated: "03 September 2026"
  },
  {
    reference: "BHS-HR-2026-20431",
    owner: "Demo Citizen",
    state: "Haryana",
    project: "NH-48 Expansion",
    stage: "Document Verification",
    nextStage: "Objection Hearing",
    ownership: "Under Verification",
    compensation: "Not Started",
    rr: "Pending",
    updated: "03 September 2026"
  }
];

const grievances = [];

const appointments = [];

const analytics = {
  causes: [
    {
      name: "Document / Record Verification",
      percentage: 32
    },
    {
      name: "Compensation Assessment",
      percentage: 24
    },
    {
      name: "Land Ownership Disputes",
      percentage: 18
    },
    {
      name: "R&R Approvals",
      percentage: 14
    },
    {
      name: "Administrative / Field Delays",
      percentage: 12
    }
  ],

  predictiveRisk: {
    project: "NH-48 Expansion — Package 3",
    risk: 78,
    level: "High",
    affectedParcels: 14,
    compensationCases: 3,
    rrFamilies: 8
  }
};

module.exports = {
  projects,
  cases,
  grievances,
  appointments,
  analytics
};
