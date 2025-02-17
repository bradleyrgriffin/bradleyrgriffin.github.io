// __tests__/github.test.ts
import { fetchRepositories } from './githubApi';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ name: 'repo1' }, { name: 'repo2' }]),
  })
) as jest.Mock;

describe('fetchRepositories', () => {
  test('fetches repositories for a given username', async () => {
    const username = 'testuser';
    const repos = await fetchRepositories(username);

    // Check if the fetch function was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.github.com/users/${username}/repos`
    );

    // Check if the returned data matches the expected value
    expect(repos).toEqual([{ name: 'repo1' }, { name: 'repo2' }]);
  });

  test('handles fetch errors', async () => {
    // Mock fetch to reject the promise
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;

    const username = 'testuser';

    await expect(fetchRepositories(username)).rejects.toThrow(
      'Failed to fetch'
    );
  });
});
