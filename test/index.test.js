import { createMocks } from 'node-mocks-http';
import handleFilter from '../pages/api/filters';
import handleJobs from '../pages/api/jobs';

describe('/api/jobs', () => {
  test('responds 200 to Jobs', async () => {
    expect.assertions(1)
    const data = {
      q: '',
      sorts: []
    }
    const { req, res } = createMocks({
      method: 'GET',
      body: JSON.stringify(data)
    });
    await handleJobs(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});

describe('/api/filters', () => {
  test('responds 200 to Filter', async () => {
    expect.assertions(1)
    const { req, res } = createMocks({
      method: 'GET'
    });
    await handleFilter(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
