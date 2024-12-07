import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Employee } from '@/types/employee.type';
import { Vacation } from '@/types/vacation.type';

import { getQueryKey as getEmployeeQueryKey } from './useQueryEmployeeDetails';

export function useMutationCreateVacation(employeeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newVacation: Partial<Vacation>): Promise<Employee> => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/vacations/${employeeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVacation),
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      // Refetch the selected employee query after creating a vacation
      queryClient.invalidateQueries({
        queryKey: getEmployeeQueryKey(employeeId),
      });
    },
  });
}
