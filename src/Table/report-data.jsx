let reportData = [
  {
    id: 1,
    name: "Hub Traffic",
    enabled: true,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-10",
  },
  {
    id: 2,
    name: "User Report",
    enabled: false,
    createdAt: "2024-06-05",
    updatedAt: "2024-06-09",
  },
  {
    id: 3,
    name: "Revenue Report",
    enabled: true,
    createdAt: "2024-06-07",
    updatedAt: "2024-06-08",
  },
];

export function getReports() {
  return reportData;
}

export function addReport(newReport) {
  reportData.push(newReport);
}

export default reportData;
