import { useState } from 'react';

import { useMutationCreateVacation } from '@/hooks/useMutationCreateVacation';

interface Props {
  employeeId: number;
}

export function VacationForm({ employeeId }: Props) {
  const createVacation = useMutationCreateVacation(employeeId);

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [comment, setComment] = useState<string>();

  function simpleValidation() {
    if (!startDate || !endDate) {
      return false;
    }

    if (new Date(startDate) > new Date(endDate)) {
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    if (!simpleValidation()) return;
    e.preventDefault();

    createVacation.mutate(
      {
        startDate,
        endDate,
        comment,
      },
      {
        onSuccess: () => {
          setEndDate('');
          setStartDate('');
          setComment('');
        },
      },
    );
  }

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 lg:pl-8">
        <input type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <input type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <textarea
          id="comment"
          name="comment"
          rows={2}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          placeholder="Add your comment..."
          // eslint-disable-next-line max-len
          className="block w-80 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          defaultValue={''}
        />
      </td>
      <td>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={createVacation.isPending || !simpleValidation()}
          // eslint-disable-next-line max-len
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500    "
        >
          Add Vacation
        </button>
      </td>
    </tr>
  );
}
