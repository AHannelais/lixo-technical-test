import { useState } from 'react';

import { useMutationCreateEmploye } from '@/hooks/useMutationCreateEmployee';

import { Modal } from './Modal';

export function EmployeeForm() {
  const createEmployee = useMutationCreateEmploye();
  const [isFormOpen, setFormOpen] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function onClose() {
    setFormOpen(false);
  }

  function onOpen() {
    setFormOpen(true);
  }

  function simpleValidation() {
    return !!firstName && !!lastName;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!simpleValidation()) return;
    e.preventDefault();

    createEmployee.mutate(
      {
        firstName,
        lastName,
      },
      {
        onSuccess: () => {
          setFormOpen(false);
          setFirstName('');
          setLastName('');
        },
      },
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        // eslint-disable-next-line max-len
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Member
      </button>

      <Modal isOpen={isFormOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Register new member</h2>
              <p className="mt-1 text-sm/6 text-gray-600"> Fill in the information below to register a new member</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                      type="text"
                      autoComplete="given-name"
                      // eslint-disable-next-line max-len
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      type="text"
                      autoComplete="family-name"
                      // eslint-disable-next-line max-len
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" onClick={() => setFormOpen(false)} className="text-sm/6 font-semibold text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              disabled={createEmployee.isPending || !simpleValidation()}
              // eslint-disable-next-line max-len
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
