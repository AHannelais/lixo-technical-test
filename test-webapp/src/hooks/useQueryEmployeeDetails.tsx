import { useQuery } from '@tanstack/react-query';

import { Employee } from '@/types/employee.type';

const QUERY_ID = 'employee';
export const getQueryKey = (employeeId: number) => [QUERY_ID, employeeId];

export function useQueryEmployeeDetails(employeeId: number) {
  return useQuery({
    queryKey: getQueryKey(employeeId),
    queryFn: async (): Promise<Employee> => {
      const data = await fetch(`${import.meta.env.VITE_API_URL}/employees/${employeeId}`).then((res) => res.json());
      return data;
    },
  });
}
