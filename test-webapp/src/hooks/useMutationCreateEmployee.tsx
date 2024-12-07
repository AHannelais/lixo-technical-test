import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Employee } from '@/types/employee.type';

import { getQueryKey as getEmployeesQueryKey } from './useQueryEmployees';

export function useMutationCreateEmploye() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEmployee: Omit<Employee, 'id'>): Promise<Employee> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      // Refetch the employees query after creating an employee
      // Only the 'unavailableOnly' false query is invalidated because the new employee is available by default
      queryClient.invalidateQueries({
        queryKey: getEmployeesQueryKey({ unavailableOnly: false }),
      });
    },
  });
}
