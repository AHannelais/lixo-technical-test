import { Field, Label, Switch } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { EmployeeForm } from '@/components/EmployeeForm';
import { useQueryEmployees } from '@/hooks/useQueryEmployees';

export function EmployeesList() {
  const [unavailableOnly, setUnavailableOnly] = useState(false);

  const employees = useQueryEmployees({
    unavailableOnly,
  });

  return (
    <>
      <div className="flex justify-between">
        <Field className="flex items-center">
          <Switch
            checked={unavailableOnly}
            onChange={setUnavailableOnly}
            // eslint-disable-next-line max-len
            className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[checked]:bg-indigo-600"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-5"
            />
          </Switch>
          <Label as="span" className="ml-3 text-sm">
            <span className="font-medium text-gray-900">Unavailable Only</span>
          </Label>
        </Field>
        <EmployeeForm />
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {employees.data?.map((employee) => (
          <li key={employee.id} className="relative flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <UserCircleIcon className="size-12 flex-none rounded-full text-gray-400" />

              <div className="flex min-w-0  flex-auto">
                <p className="my-auto text-sm/6 font-semibold text-gray-900">{`${employee.firstName} ${employee.lastName}`}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                {employee.isAvailable ? (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs/5 text-gray-500">Available</p>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-red-900/20 p-1">
                      <div className="size-1.5 rounded-full bg-red-500" />
                    </div>
                    <p className="text-xs/5 text-gray-500">On Vacation</p>
                  </div>
                )}
              </div>
              <Link to={`/${employee.id}`}>
                <ChevronRightIcon aria-hidden="true" className="size-5  flex-none text-gray-400" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
