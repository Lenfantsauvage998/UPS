import { fetchAllNodes, createNode } from '../../src/services/nodeService.js';
import mongoose from 'mongoose';
import { connectDB } from '../../src/database/mongoose.js';

beforeAll(async () => { await connectDB(); });
afterAll(async () => { await mongoose.disconnect(); });

describe('nodeService', () => {
  it('crea y recupera un nodo', async () => {
    const n = await createNode({ name:'X', latitude:0, longitude:0 });
    const all = await fetchAllNodes();
    expect(all.some(x => x._id.toString() === n._id.toString())).toBe(true);
  });
});
