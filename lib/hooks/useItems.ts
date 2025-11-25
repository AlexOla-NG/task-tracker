 'use client';

import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import type { IItem } from '../models/Item';

async function fetchItems(): Promise<IItem[]> {
  const resp = await fetch('/api/items');
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || 'Failed to fetch items');
  return data;
}

async function createItemApi(payload: Partial<IItem>) {
  const resp = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || 'Failed');
  return data as IItem;
}

async function updateItemApi(id: string, payload: Partial<IItem>) {
  const resp = await fetch(`/api/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || 'Failed to update');
  return data as IItem;
}

async function deleteItemApi(id: string) {
  const resp = await fetch(`/api/items/${id}`, { method: 'DELETE' });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || 'Failed to delete');
  return data;
}

export function useItems(options?: Omit<UseQueryOptions<IItem[], Error>, 'queryKey' | 'queryFn'>) {
  return useQuery({ queryKey: ['items'], queryFn: fetchItems, ...options });
}

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation<IItem, Error, Partial<IItem>>({
    mutationFn: createItemApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }),
  });
}

export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation<IItem, Error, { id: string; payload: Partial<IItem> }>({
    mutationFn: ({ id, payload }) => updateItemApi(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }),
  });
}

export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation<{ success: boolean }, Error, string>({
    mutationFn: deleteItemApi,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['items'] }),
  });
}
