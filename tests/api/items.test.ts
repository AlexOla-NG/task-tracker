import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createItem, getItems, getItemById, updateItemById, deleteItemById } from '../../lib/controllers/items';

let mongod: MongoMemoryServer | null = null;

// Increase Jest test timeout in case binary download for in-memory server takes a while
jest.setTimeout(30000);

beforeAll(async () => {
  // Prefer a memory server, but fallback to MONGODB_URI if starting fails (common on Apple Silicon)
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.MONGODB_URI = uri;
    await mongoose.connect(uri);
  } catch (err) {
    console.warn('MongoMemoryServer failed to start, falling back to MONGODB_URI if provided. Error:', err);
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/task-tracker-test';
    await mongoose.connect(uri);
  }
});

afterAll(async () => {
  // close mongoose connection
  try {
    await mongoose.disconnect();
  } catch (e) {
    // ignore errors during disconnect
  }
  if (mongod) {
    try {
      await mongod.stop();
    } catch (e) {
      // ignore stop errors
    }
  }
});

describe('Items controller', () => {
  beforeEach(async () => {
    // clean db
    await mongoose.connection.db.dropDatabase();
  });
  test('POST create item and GET returns it', async () => {
    const created = await createItem({ title: 'Test Item', description: 'Desc' } as any);

    expect(created._id).toBeDefined();
    expect(created.title).toBe('Test Item');

    const items = await getItems();
    expect(items.length).toBe(1);
  });

  test('PUT update item updates it', async () => {
    const created = await createItem({ title: 'To Update', description: 'old' } as any);
    const updated = await updateItemById(created._id.toString(), { title: 'Updated' } as any);
    expect(updated!.title).toBe('Updated');
  });

  test('DELETE removes item and second delete returns null / 404', async () => {
    const created = await createItem({ title: 'To Delete' } as any);
    const removed = await deleteItemById(created._id.toString());
    expect(removed).not.toBeNull();
    const second = await deleteItemById(created._id.toString());
    expect(second).toBeNull();
  });

  test('invalid ObjectId throws', async () => {
    await expect(getItemById('not-an-id')).rejects.toThrow(/Invalid ObjectId/);
  });
});
