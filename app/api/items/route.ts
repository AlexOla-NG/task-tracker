import { NextResponse } from 'next/server';
import { getItems, createItem } from '../../../lib/controllers/items';
import { itemCreateSchema } from '../../../lib/validation/itemSchema';

export async function GET() {
  try {
    const items = await getItems();
    
    return NextResponse.json(items);
  } catch (err) {
    console.error('GET /api/items error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = itemCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const created = await createItem(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error('POST /api/items error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
