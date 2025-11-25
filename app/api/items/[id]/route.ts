import { NextResponse } from 'next/server';
import { getItemById, updateItemById, deleteItemById } from '../../../../lib/controllers/items';
import { itemUpdateSchema } from '../../../../lib/validation/itemSchema';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const item = await getItemById(id);
    if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    return NextResponse.json(item);
  } catch (err: any) {
    if (err.message === 'Invalid ObjectId') return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    console.error('GET /api/items/:id error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const parsed = itemUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }
    const updated = await updateItemById(id, parsed.data as any);
    if (!updated) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    if (err.message === 'Invalid ObjectId') return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    console.error('PUT /api/items/:id error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const removed = await deleteItemById(id);
    if (!removed) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    if (err.message === 'Invalid ObjectId') return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    console.error('DELETE /api/items/:id error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
