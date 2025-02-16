// src/utils/github.ts
export const fetchRepositories = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const data = await response.json();
  return data;
};
