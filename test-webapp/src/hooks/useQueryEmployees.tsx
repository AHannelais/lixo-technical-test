import { useQuery } from '@tanstack/react-query';

import { Employee } from '@/types/employee.type';

interface Filter {
  unavailableOnly: boolean;
}

const QUERY_ID = 'employees';
export const getQueryKey = (filter: Filter) => [QUERY_ID, filter];

export function useQueryEmployees({ unavailableOnly }: Filter) {
  return useQuery({
    queryKey: getQueryKey({ unavailableOnly }),
    queryFn: async (): Promise<Employee[]> => {
      const url = new URL(import.meta.env.VITE_API_URL + '/employees');

      if (unavailableOnly) {
        url.searchParams.append('unavailableOnly', 'true');
      }

      const data = await fetch(url).then((res) => res.json());

      return data;
    },
  });
}
