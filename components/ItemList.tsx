 'use client';

import { useItems } from '../lib/hooks/useItems';
import type { IItem } from '../lib/models/Item';



export default function ItemList() {
  const { data: items = [], isLoading, isError, error } = useItems();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className="text-red-600">{(error as Error).message}</div>;

  return (
    <div className="mt-4">
      {items.length === 0 ? (
        <div>No items yet</div>
      ) : (
        <ul className="space-y-2">
          {items.map((item: IItem) => (
            <li key={item._id} className="p-2 border rounded">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
              <div className="text-xs mt-1">Status: {item.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
