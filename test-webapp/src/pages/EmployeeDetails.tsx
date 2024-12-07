import { UserCircleIcon } from '@heroicons/react/20/solid';
import { useMemo, useState } from 'react';
import { Link, useMatch } from 'react-router-dom';

import { VacationForm } from '@/components/VacationForm';
import { classNames, formatDate } from '@/helpers';
import { useQueryEmployeeDetails } from '@/hooks/useQueryEmployeeDetails';
import { Vacation } from '@/types/vacation.type';

interface SortedVacations {
  upcoming: Vacation[];
  past: Vacation[];
  ongoing: Vacation | null;
}

export function EmployeeDetails() {
  const currendId = useMatch('/:employeeId')?.params.employeeId;

  const employee = useQueryEmployeeDetails(Number(currendId));

  const [currentTab, setCurrentTab] = useState<'upcoming' | 'past'>('upcoming');

  const employeFullName = useMemo(() => {
    if (!employee.data) return '';

    return `${employee.data.firstName} ${employee.data.lastName}`;
  }, [employee.data]);

  const vacations = useMemo(() => {
    const vacations: SortedVacations = { upcoming: [], past: [], ongoing: null };

    if (!employee.data?.vacations) return vacations;

    for (const vacation of employee.data.vacations) {
      const startDate = new Date(vacation.startDate);
      const endDate = new Date(vacation.endDate);
      const now = new Date();

      // Current vacation is also considered upcoming so it's displayed in the table
      if (endDate < now) {
        vacations.past.push(vacation);
      } else {
        vacations.upcoming.push(vacation);
      }

      if (startDate <= now && endDate >= now) {
        vacations.ongoing = vacation;
      }
    }

    return vacations;
  }, [employee.data]);

  return (
    <>
      <Link
        to="/"
        type="button"
        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Back
      </Link>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <div className="flex items-center">
              <div className="shrink-0">
                <UserCircleIcon className="size-12 flex-none rounded-full text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-base font-semibold text-gray-900">{employeFullName}</h3>
              </div>
            </div>
          </div>
          <div className="ml-4 mt-4 flex shrink-0">
            {vacations.ongoing ? (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-red-900/20 p-1">
                  <div className="size-1.5 rounded-full bg-red-500" />
                </div>
                <p className="text-sm text-gray-500">On Vacation until {formatDate(vacations.ongoing.endDate)}</p>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-sm text-gray-500">Available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">
                      Starting Date
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Ending Date
                    </th>
                    <th scope="col" className=" px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Comment
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {employee.data && <VacationForm employeeId={employee.data.id} />}

                  <tr className="mt-2 border-b border-gray-200">
                    <td colSpan={4}>
                      <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        <button
                          aria-current={currentTab === 'upcoming' ? 'page' : undefined}
                          type="button"
                          onClick={() => setCurrentTab('upcoming')}
                          className={classNames(
                            currentTab === 'upcoming'
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                          )}
                        >
                          Upcoming Vacations
                        </button>
                        <button
                          aria-current={currentTab === 'past' ? 'page' : undefined}
                          type="button"
                          onClick={() => setCurrentTab('past')}
                          className={classNames(
                            currentTab === 'past'
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium',
                          )}
                        >
                          Past Vacations
                        </button>
                      </nav>
                    </td>
                  </tr>
                  {vacations[currentTab].map((vacation) => (
                    <tr key={vacation.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 lg:pl-8">
                        {formatDate(vacation.startDate)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(vacation.endDate)}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vacation.comment}</td>
                    </tr>
                  ))}

                  {!vacations[currentTab].length && (
                    <tr>
                      <td colSpan={4} className="px-3 py-4 text-center text-sm text-gray-500">
                        No vacations found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
