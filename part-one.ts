/**
 * Returns the index of the first available table in the given array
 */
type findAvailableTable = (tables: boolean[]) => number;

// Sync function
function findAvailableTable(tables: boolean[]): number {
  return tables.findIndex((table) => !table);
}

// Async function
async function findAvailableTableAsync(tables: boolean[]): Promise<number> {
  return new Promise((resolve) => {
    resolve(findAvailableTable(tables));
  });
}
