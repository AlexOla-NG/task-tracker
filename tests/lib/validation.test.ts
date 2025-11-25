import { itemCreateSchema, itemUpdateSchema } from '../../lib/validation/itemSchema';

describe('Item validation', () => {
  test('accepts valid payload', () => {
    const payload = { title: 'Buy groceries', description: 'Milk eggs bread', status: 'todo' };
    const result = itemCreateSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  test('rejects too short title', () => {
    const payload = { title: 'ok', description: 'short' };
    const result = itemCreateSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  test('rejects invalid status', () => {
    const payload = { title: 'Hello world', status: 'invalid' } as any;
    const result = itemCreateSchema.safeParse(payload);
    expect(result.success).toBe(false);
  });

  test('update schema allows partials', () => {
    const payload = { title: 'Updated title' };
    const result = itemUpdateSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });
});
