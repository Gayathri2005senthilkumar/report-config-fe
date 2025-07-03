let columnData = [
  {
    id: "1",
    label: "Username",
    value: "user_name",
    type: "string",
    enable: true,
  },
  {
    id: "2",
    label: "Email",
    value: "email",
    type: "string",
    enable: false,
  },
];

export function getColumns() {
  return columnData;
}

export function addColumn(newItem) {
  columnData.push(newItem);
}

export function updateColumn(updatedItem) {
  const index = columnData.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    columnData[index] = updatedItem;
  }
}

export default columnData;
