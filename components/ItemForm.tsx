 'use client';

import { FormEvent, useState } from 'react';
import type { ItemStatus } from '../lib/models/Item';
import { useCreateItem } from '../lib/hooks/useItems';

const defaultTask = {
  title: '',
  description: '',
  status: 'todo' as ItemStatus,
};

export default function ItemForm() {
  const [task, setTask] = useState(defaultTask);
  const mutation = useCreateItem();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...task }, {
      onSuccess: () => {
        setTask(defaultTask);
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="mb-2">
        <label className="block text-sm font-medium">Title</label>
        <input
          className="border px-2 py-1 w-full"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
          minLength={3}
          maxLength={100}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          className="border p-2 w-full"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          maxLength={500}
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Status</label>
        <select
          value={task.status}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="border p-1"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={mutation.status === 'pending'}
          className="bg-blue-600 text-white p-2 rounded"
        >
          {mutation.status === 'pending' ? 'Adding…' : 'Add Item'}
        </button>
        {mutation.error && <div className="text-red-600">{mutation.error.message}</div>}
      </div>
    </form>
  );
}
