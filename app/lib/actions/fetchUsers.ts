'use server';
export async function fetchUsers() {
  const response = await fetch(`http://localhost:3001/api/users`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}
